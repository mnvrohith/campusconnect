import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-[#020617] text-white min-h-screen overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative">

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-500/20 blur-[140px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-24">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm">
            🚀 Student Community Platform
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight max-w-5xl">
            Discover Amazing{" "}
            <span className="text-indigo-400">
              Campus Events
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 text-lg md:text-xl text-slate-300 max-w-3xl leading-9">
            CampusConnect helps students discover, manage,
            and participate in college events, hackathons,
            workshops, clubs, and campus activities —
            all in one centralized platform.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              href="/events"
              className="px-8 py-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition font-semibold shadow-lg shadow-indigo-500/20"
            >
              Explore Events
            </Link>

            <Link
              href="/clubs"
              className="px-8 py-4 rounded-xl border border-slate-700 hover:border-indigo-400 hover:bg-slate-900 transition font-semibold"
            >
              Create Club
            </Link>

          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-8">
              <h2 className="text-5xl font-bold text-indigo-400">
                100+
              </h2>
              <p className="mt-3 text-slate-400">
                Campus Events
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-8">
              <h2 className="text-5xl font-bold text-indigo-400">
                25+
              </h2>
              <p className="mt-3 text-slate-400">
                Active Clubs
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-8">
              <h2 className="text-5xl font-bold text-indigo-400">
                1000+
              </h2>
              <p className="mt-3 text-slate-400">
                Students Connected
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="text-center">

          <h2 className="text-4xl md:text-5xl font-bold">
            Why CampusConnect?
          </h2>

          <p className="mt-6 text-slate-400 text-lg max-w-3xl mx-auto">
            Built for students to simplify event discovery,
            club engagement, and campus networking.
          </p>

        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 hover:border-indigo-500/40 transition">

            <div className="text-5xl">
              🎉
            </div>

            <h3 className="mt-6 text-3xl font-bold">
              Discover Events
            </h3>

            <p className="mt-4 text-slate-400 leading-8">
              Explore hackathons, workshops, cultural fests,
              competitions, and student activities.
            </p>

          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 hover:border-indigo-500/40 transition">

            <div className="text-5xl">
              👥
            </div>

            <h3 className="mt-6 text-3xl font-bold">
              Join Clubs
            </h3>

            <p className="mt-4 text-slate-400 leading-8">
              Connect with communities, collaborate with
              students, and grow your network.
            </p>

          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 hover:border-indigo-500/40 transition">

            <div className="text-5xl">
              ⚡
            </div>

            <h3 className="mt-6 text-3xl font-bold">
              Manage Easily
            </h3>

            <p className="mt-4 text-slate-400 leading-8">
              Create and manage events with authentication,
              editing, and secure access.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}