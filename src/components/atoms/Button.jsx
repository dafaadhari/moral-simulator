export const Button = ({ children, onClick, disabled, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="mt-6 w-full bg-slate-900 hover:bg-slate-950 text-white font-bold py-4 rounded-xl transition transform active:scale-95 shadow-md flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? "Membuka Gerbang Logika..." : children}
    </button>
  );
};