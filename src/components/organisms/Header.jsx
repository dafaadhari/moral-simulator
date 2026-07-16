export const Header = () => {
  return (
    <header className="mb-14">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 pb-6 border-b border-navy-900/15">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-navy-900 tracking-tight">
          Moral Reasoning Simulator
        </h1>
        <p className="text-sm text-navy-900/50">
          Lihat caramu mengambil keputusan — apa adanya
        </p>
      </div>
    </header>
  );
};
