export const Button = ({ children, onClick, disabled, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="mt-6 w-full bg-navy-900 hover:bg-navy-800 text-vanilla-50 font-bold py-4 rounded-xl transition transform active:scale-[0.98] shadow-md flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isLoading ? "Memproses..." : children}
    </button>
  );
};
