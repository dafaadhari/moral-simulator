export const TextArea = ({ value, onChange, placeholder, label }) => {
  return (
    <div>
      <label className="block text-sm font-bold text-navy-900 mb-3">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        rows="4"
        className="w-full p-4 bg-vanilla-50 border border-navy-900/15 rounded-xl focus:bg-white focus:ring-4 focus:ring-navy-100 focus:border-navy-900 focus:outline-none transition-all text-base text-navy-900 placeholder:text-navy-900/35"
        placeholder={placeholder}
      />
    </div>
  );
};
