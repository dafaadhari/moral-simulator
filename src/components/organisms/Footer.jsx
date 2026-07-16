export const Footer = () => {
  return (
    <footer className="mt-20 py-8 border-t border-navy-900/15">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-navy-900/50">
        <span className="font-display font-semibold text-navy-900/70">
          Moral Reasoning Simulator
        </span>
        <span>&copy; 2026 &middot; Dibuat untuk memahami cara berpikir, bukan menghakimi</span>
      </div>
    </footer>
  );
};
