export default function HomePage() {
  return (
    <main className="min-h-screen">

      <section className="max-w-7xl mx-auto px-6 py-32 text-center">

        <h1 className="text-6xl md:text-7xl font-bold leading-tight">
          Discover Amazing
          <span className="text-indigo-400"> Campus Events</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-slate-400 text-lg">
          CampusConnect helps students discover, register,
          and manage college events from one centralized platform.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">

          <button className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition font-medium">
            Explore Events
          </button>

          <button className="px-6 py-3 rounded-xl border border-slate-700 hover:border-slate-500 transition font-medium">
            Create Club
          </button>

        </div>

      </section>

    </main>
  );
}