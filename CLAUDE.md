# Moral Reasoning Simulator — Architecture Blueprint v2
# (No Authentication — Public Access)

> **Change from v1:** Authentication removed entirely. App is publicly accessible.
> Session continuity handled via anonymous `session_id` (UUID in localStorage).
> All database access is exclusively through Edge Functions — frontend never touches DB directly.

---

## 1. Final Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    BROWSER / CLIENT                     │
│                                                         │
│   React + Vite + TypeScript + Tailwind + React Router   │
│   TanStack Query · React Hook Form · Zod                │
│                                                         │
│   localStorage: { session_id: "uuid-v4" }              │
└───────────────────────┬─────────────────────────────────┘
                        │
                        │  POST /functions/v1/moral-analysis
                        │  Header: apikey: <SUPABASE_ANON_KEY>
                        │  Body: { session_id, input_story }
                        ▼
┌─────────────────────────────────────────────────────────┐
│                  SUPABASE EDGE FUNCTION                 │
│                  moral-analysis/index.ts                │
│                                                         │
│  1. Validate body (input_story, session_id)             │
│  2. Call Gemini API  ← GEMINI_API_KEY (secret)         │
│  3. Validate AI response schema                         │
│  4. Write to DB      ← SERVICE_ROLE_KEY (secret)       │
│  5. Return result to frontend                           │
└────────────┬──────────────────────┬────────────────────┘
             │                      │
             ▼                      ▼
  ┌──────────────────┐   ┌────────────────────┐
  │   GEMINI API     │   │ SUPABASE POSTGRES  │
  │  (Google AI)     │   │  moral_analyses    │
  └──────────────────┘   └────────────────────┘
```

**Security model — why this is correct for a public app:**

| Layer | Key Used | Can Access DB? |
|---|---|---|
| Frontend (browser) | `SUPABASE_ANON_KEY` | ❌ No — zero table grants |
| Edge Function | `SERVICE_ROLE_KEY` | ✅ Yes — full trusted access |
| Edge Function | `GEMINI_API_KEY` | ✅ Yes — AI calls only |

The browser only ever sends an HTTP request to the Edge Function endpoint.
It never issues a Supabase DB query. The Gemini key and service role key
never leave the server.

---

## 2. Anonymous Session Design

### How `session_id` is generated

```
User visits app for the first time
  → Check localStorage for 'mrs_session_id'
  → Not found: generate crypto.randomUUID()
  → Store in localStorage: { mrs_session_id: "550e8400-..." }
  → Use for all requests in this browser

User returns later (same browser)
  → localStorage has 'mrs_session_id'
  → Reuse same ID → history persists
```

### What the session ID gives users
- History of their analyses (current device/browser)
- No account required
- No password to forget
- Clears naturally if they clear browser storage

### What the session ID does NOT provide
- Cross-device sync
- Data recovery if localStorage is cleared
- Any privacy guarantee (it's not tied to identity)

This is intentional. The app is a **thinking tool**, not a data vault.

---

## 3. Database Schema

### 3.1 — `moral_analyses`

Only one table needed for Phase 1.

```sql
CREATE TABLE public.moral_analyses (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id   UUID        NOT NULL,
  input_story  TEXT        NOT NULL CHECK (char_length(input_story) BETWEEN 20 AND 2000),
  values       JSONB       NOT NULL DEFAULT '[]',
  perspectives JSONB       NOT NULL DEFAULT '[]',
  reflection   TEXT        NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**JSONB shape — `values`:**
```json
["honesty", "responsibility", "empathy"]
```

**JSONB shape — `perspectives`:**
```json
[
  {
    "choice": "Return the wallet",
    "consequence": "Preserves trust and integrity but leaves your financial need unresolved"
  },
  {
    "choice": "Keep the money",
    "consequence": "Addresses immediate need but may create lasting guilt and erode self-image"
  }
]
```

### 3.2 — Indexes

```sql
-- Fetch history by session (most common query)
CREATE INDEX idx_analyses_session_id
  ON public.moral_analyses(session_id);

-- Order history by newest first
CREATE INDEX idx_analyses_created_at
  ON public.moral_analyses(created_at DESC);
```

### 3.3 — `feedback` (Phase 2)

```sql
CREATE TABLE public.feedback (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id  UUID        NOT NULL REFERENCES public.moral_analyses(id) ON DELETE CASCADE,
  session_id   UUID        NOT NULL,
  rating       SMALLINT    NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment      TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (analysis_id, session_id)
);
```

### 3.4 — RLS Stance

**RLS is not used.** Rationale:

Without `auth.uid()`, user-based RLS cannot be enforced.
Instead, we enforce access at the Edge Function layer:

- The `ANON` role has **zero privileges** on any table (no SELECT, INSERT, UPDATE, DELETE)
- All table access goes through the Edge Function which uses `SERVICE_ROLE`
- An attacker with the anon key cannot query the DB at all

This is architecturally cleaner than RLS for a public tool.

```sql
-- Explicitly revoke all from anon on these tables
REVOKE ALL ON public.moral_analyses FROM anon;
REVOKE ALL ON public.moral_analyses FROM authenticated;
REVOKE ALL ON public.feedback FROM anon;
REVOKE ALL ON public.feedback FROM authenticated;
```

---

## 4. Edge Function Design

### Function: `moral-analysis`
**Path:** `supabase/functions/moral-analysis/index.ts`

### Execution flow

```
1. Receive POST request
2. Validate request body:
   - session_id: valid UUID format
   - input_story: string, 20–2000 chars
3. Sanitize input_story (strip control chars)
4. Build structured Gemini prompt
5. Call Gemini API with GEMINI_API_KEY
6. Parse response → expect valid JSON
7. Validate JSON against expected schema
8. INSERT into moral_analyses (via SERVICE_ROLE client)
9. Return { analysis_id, values, perspectives, reflection }
```

### Request / Response Contracts

```typescript
// POST /functions/v1/moral-analysis
// Headers: apikey: <SUPABASE_ANON_KEY>

// Request body
interface MoralAnalysisRequest {
  session_id:  string; // UUID v4
  input_story: string; // 20–2000 chars
}

// Response body
interface MoralAnalysisResponse {
  analysis_id:  string;
  input_story:  string;
  values:       string[];
  perspectives: Array<{
    choice:      string;
    consequence: string;
  }>;
  reflection:   string;
  created_at:   string;
}
```

### Gemini Prompt

```
SYSTEM:
You are a moral reasoning assistant. Your role is to help people
understand HOW they think — not to judge whether their actions are
right or wrong. Never issue a moral verdict. Never say one option
is always correct. Avoid prescriptive language ("you should", "you must").
Focus on: values involved, trade-offs, reflective insight.

USER:
A person is facing this situation:
"{input_story}"

Respond ONLY with a valid JSON object. No explanation outside the JSON.
No markdown. No backticks. Just the raw JSON.

{
  "values": [
    "3 to 5 values this situation involves — e.g. honesty, loyalty, survival"
  ],
  "perspectives": [
    {
      "choice": "One possible course of action",
      "consequence": "What following this path might mean or lead to"
    },
    {
      "choice": "Another possible course of action",
      "consequence": "What following this path might mean or lead to"
    }
  ],
  "reflection": "2–3 sentences that help the person think more deeply about
                 their own values and reasoning. Do not tell them what to do."
}
```

### Error Handling

| Scenario | HTTP Status | Behavior |
|---|---|---|
| Missing body fields | 400 | Return validation error, no Gemini call |
| Invalid session_id format | 400 | Return error, no Gemini call |
| input_story too short/long | 400 | Return error, no Gemini call |
| Gemini API failure | 502 | Return error, no DB write |
| Gemini response invalid JSON | 422 | Return error, log raw response |
| DB insert failure | 500 | Return error |
| All good | 200 | Return analysis |

### Rate Limiting Strategy (Phase 1)

Supabase Edge Functions enforce a concurrency limit per project.
For Phase 1, this is sufficient. Phase 2 options:

- IP-based rate limiting inside the Edge Function (track IPs in a `rate_limits` table)
- Upstash Redis for sliding window rate limiting
- Cloudflare WAF in front of Supabase (if traffic grows)

---

## 5. React Folder Structure

```
src/
│
├── app/
│   ├── routes/
│   │   └── index.tsx               # Route definitions
│   └── providers/
│       ├── QueryProvider.tsx        # TanStack Query client
│       └── SessionProvider.tsx      # Anonymous session_id context
│
├── components/
│   │
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.test.tsx
│   │   ├── Input/
│   │   ├── Textarea/
│   │   ├── Badge/
│   │   ├── Loader/
│   │   ├── Card/
│   │   └── ErrorMessage/
│   │
│   ├── molecules/
│   │   ├── MoralInputForm/
│   │   │   ├── MoralInputForm.tsx
│   │   │   └── MoralInputForm.test.tsx
│   │   ├── ValueBadgeList/
│   │   │   ├── ValueBadgeList.tsx
│   │   │   └── ValueBadgeList.test.tsx
│   │   ├── PerspectiveCard/
│   │   │   ├── PerspectiveCard.tsx
│   │   │   └── PerspectiveCard.test.tsx
│   │   └── CharacterCount/         # Shows 20/2000 char progress
│   │
│   └── organisms/
│       ├── MoralAnalyzer/
│       │   ├── MoralAnalyzer.tsx
│       │   └── MoralAnalyzer.test.tsx
│       ├── ResultPanel/
│       │   ├── ResultPanel.tsx
│       │   └── ResultPanel.test.tsx
│       ├── InsightSection/
│       └── HistoryList/            # Phase 2
│
├── templates/
│   └── MainLayout/
│       └── MainLayout.tsx          # Header + main content + footer
│
├── features/
│   │
│   ├── moral-analysis/
│   │   ├── api/
│   │   │   └── moralAnalysisApi.ts  # Calls Edge Function
│   │   ├── hooks/
│   │   │   ├── useMoralAnalysis.ts  # TanStack Query mutation
│   │   │   └── useAnalysisHistory.ts # Phase 2
│   │   ├── types.ts
│   │   └── schema.ts               # Zod validation
│   │
│   └── session/
│       └── hooks/
│           └── useSession.ts        # Get/create session_id from localStorage
│
├── pages/
│   ├── HomePage.tsx                 # Main analyzer page
│   ├── AnalysisDetailPage.tsx       # View saved analysis by ID
│   └── HistoryPage.tsx              # Phase 2
│
├── services/
│   ├── supabaseClient.ts            # Supabase JS client (anon key only)
│   └── apiClient.ts                 # Edge Function call utility
│
└── tests/
    ├── setup.ts                     # Vitest global setup
    ├── mocks/
    │   ├── handlers.ts              # MSW handlers for Edge Function
    │   └── analysisFixtures.ts      # Test data
    └── utils/
        └── renderWithProviders.tsx  # Wrap with QueryProvider + SessionProvider
```

### Key structural changes from v1 (auth removed)

| Removed | Replaced with |
|---|---|
| `app/providers/AuthProvider.tsx` | `app/providers/SessionProvider.tsx` |
| `app/routes/ProtectedRoute.tsx` | — (not needed) |
| `features/auth/` | `features/session/` |
| `pages/LoginPage.tsx` | — |
| `templates/AuthLayout/` | — |

---

## 6. API / Data Flow

### 6.1 — Session Initialization

```
App loads (any page)
  → SessionProvider mounts
  → Read localStorage.getItem('mrs_session_id')
  → Found: use existing UUID
  → Not found:
      → crypto.randomUUID()
      → localStorage.setItem('mrs_session_id', uuid)
  → session_id available via useSession() hook everywhere
```

### 6.2 — Moral Analysis Flow (Happy Path)

```
1. User types dilemma in MoralInputForm
   → React Hook Form manages field state
   → CharacterCount atom shows live count (e.g. "143 / 2000")
   → Zod schema validates: min 20 chars, max 2000 chars

2. User clicks "Analyze"
   → useMoralAnalysis() mutation fires
   → Gets session_id from useSession()
   → Calls moralAnalysisApi.ts

3. moralAnalysisApi.ts:
   → POST to /functions/v1/moral-analysis
   → Headers: apikey: <VITE_SUPABASE_ANON_KEY>
   → Body: { session_id, input_story }

4. Edge Function:
   → Validates body
   → Calls Gemini API (key never exposed)
   → Parses and validates JSON response
   → Inserts into moral_analyses (service role)
   → Returns { analysis_id, values, perspectives, reflection }

5. Frontend receives response:
   → TanStack Query caches result
   → React re-renders:
       ValueBadgeList   → renders values[]
       PerspectiveCard  → renders each perspective
       InsightSection   → renders reflection text
   → URL updates to /analysis/:analysis_id (shareable link)
```

### 6.3 — State Management

| State Type | Tool |
|---|---|
| Server data (analyses) | TanStack Query |
| Session ID | SessionProvider (React Context) |
| Form state | React Hook Form |
| URL / navigation | React Router |
| UI state (loading, modals) | Local useState |

---

## 7. Implementation Roadmap

### Sprint 0 — Project Foundation

| Task |
|---|
| `npm create vite@latest` with React + TypeScript template |
| Install Tailwind CSS v3 + PostCSS config |
| Install and configure ESLint + Prettier |
| Install Vitest + React Testing Library + jsdom |
| Install `@supabase/supabase-js`, TanStack Query, React Router |
| Install React Hook Form + Zod |
| Create `supabaseClient.ts` singleton |
| Configure `env.ts` with typed `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` |
| Set up `.env.local` (gitignored) |
| Create base folder structure |
| Initialize Supabase project via CLI (`supabase init`) |
| Write and push `001_initial_schema.sql` migration |

---

### Sprint 1 — Session + Edge Function

| Task |
|---|
| Implement `useSession` hook (read/write localStorage) |
| Implement `SessionProvider` (makes session_id available globally) |
| Write `supabase/functions/moral-analysis/index.ts` Edge Function |
| Implement input validation inside Edge Function |
| Implement Gemini API call with structured prompt |
| Implement JSON response validation in Edge Function |
| Implement DB insert via service role in Edge Function |
| Set `GEMINI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` in Supabase secrets |
| Deploy Edge Function via `supabase functions deploy` |
| Smoke-test Edge Function with curl (valid input, invalid input) |
| Confirm anon key has NO direct DB access (try raw query, should fail) |

---

### Sprint 2 — Core UI Components

| Task |
|---|
| Build `Button` atom (variants: primary, secondary, ghost; loading state) |
| Test: Button renders, click handler fires, disabled state works |
| Build `Textarea` atom (with error state support) |
| Build `Badge` atom (for value tags) |
| Build `Loader` atom (spinner + skeleton variants) |
| Build `ErrorMessage` atom |
| Build `CharacterCount` molecule (live progress for textarea) |
| Build `MoralInputForm` molecule (Textarea + CharacterCount + Button) |
| Test: MoralInputForm — empty validation, min/max length, submit fires |
| Build `ValueBadgeList` molecule (renders `string[]` as Badge atoms) |
| Test: ValueBadgeList — renders all values, empty state |
| Build `PerspectiveCard` molecule (choice + consequence layout) |
| Test: PerspectiveCard — renders choice and consequence text |

---

### Sprint 3 — Feature Wiring

| Task |
|---|
| Implement `moralAnalysisApi.ts` (POST to Edge Function) |
| Implement `useMoralAnalysis` hook (TanStack Query mutation) |
| Build `InsightSection` organism (reflection text display) |
| Build `ResultPanel` organism (composes ValueBadgeList + PerspectiveCard + InsightSection) |
| Test: ResultPanel — renders all three sections with mock data |
| Build `MoralAnalyzer` organism (form + loading + result panel) |
| Test: MoralAnalyzer — loading state, error state, success state |
| Handle loading state: skeleton / spinner while AI processes |
| Handle error state: user-friendly message if Edge Function fails |
| Wire `useMoralAnalysis` into `MoralAnalyzer` |

---

### Sprint 4 — Layout, Pages, Polish

| Task |
|---|
| Build `MainLayout` template (header with app title + footer) |
| Build `HomePage` (centered `MoralAnalyzer`, brand copy) |
| Build `AnalysisDetailPage` (read-only `ResultPanel` for `/analysis/:id`) |
| Implement route: `/` and `/analysis/:id` |
| Navigate to `/analysis/:id` after successful analysis |
| Empty state: "No analysis yet" design for fresh load |
| Responsive design pass: mobile-first Tailwind classes |
| Accessibility: aria labels, focus rings, keyboard navigation |
| Meta tags: og:title, og:description for sharing |
| Audit: confirm no secrets in Vite bundle (`VITE_` prefix only for public vars) |
| Full test sweep |

---

### Sprint 5 — Vercel Deployment

| Task |
|---|
| Create `vercel.json` with SPA redirect rule |
| Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel environment |
| Connect GitHub repo → Vercel auto-deploy on push to main |
| Set Supabase allowed origins to Vercel domain |
| Set Edge Function CORS to allow Vercel domain |
| Final QA on production URL |

---

### Phase 2 (Post-MVP)

| Feature | Notes |
|---|---|
| History page (`/history`) | List analyses by session_id, paginated |
| Delete analysis | Soft delete or hard delete via Edge Function |
| Feedback (rating + comment) | `feedback` table, new Edge Function |
| Share link | `/share/:id` public read view |
| IP rate limiting | Protect Edge Function from abuse |
| Copy to clipboard | Copy reflection / full analysis |

---

## Vercel Deployment Config

**`vercel.json`** (required for React Router client-side routing):

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Vercel Environment Variables** (set in Vercel dashboard, not in repo):

```
VITE_SUPABASE_URL       = https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY  = eyJ...
```

**Supabase Secrets** (set via Supabase CLI, never in repo):

```
GEMINI_API_KEY          = AIza...
SUPABASE_SERVICE_ROLE_KEY = eyJ... (auto-available in Edge Functions)
```

---

## Key Design Decisions — v2 Delta

| Decision | Rationale |
|---|---|
| No auth, public access | Zero friction. Aligns with "tool for everyone" positioning |
| Anonymous session_id in localStorage | Gives history continuity without account creation |
| Anon key has zero table permissions | Stronger than RLS for public apps — no data accessible via anon |
| All DB access through Edge Functions only | Single choke point for security; easy to add rate limiting later |
| No RLS | Replaced by Edge Function access control + zero anon permissions |
| Vercel for frontend | Free tier, excellent DX, auto-deploys from GitHub, great with Vite |

---

*v2 — Ready for review. Confirm to begin Sprint 0.*
