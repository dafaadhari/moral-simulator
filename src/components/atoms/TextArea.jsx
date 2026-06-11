export const TextArea = ({ value, onChange, placeholder, label }) => {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-[0.15em] text-center">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        rows="4"
        className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-900 focus:outline-none transition-all text-base text-slate-800 placeholder:text-slate-400"
        placeholder={placeholder}
      />
    </div>
  );
};