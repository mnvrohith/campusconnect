import Link from "next/link";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-[#020617] text-white overflow-hidden">

      {/* HERO */}
      <section className="relative border-b border-slate-800 overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-purple-500/10" />

        <div className="relative max-w-7xl mx-auto px-6 py-32">

          <div className="max-w-4xl">

            <span className="px-5 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
              Digital Campus Community Platform
            </span>

            <h1 className="mt-10 text-6xl md:text-8xl font-black leading-tight">

              Campus
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Connect
              </span>

            </h1>

            <p className="mt-10 text-xl md:text-2xl text-slate-400 leading-9 max-w-3xl">

              Discover campus events, explore student clubs,
              organize community activities, and build
              meaningful campus engagement —
              all in one modern platform.

            </p>

            {/* Buttons */}
            <div className="mt-14 flex flex-wrap gap-5">

              <Link
                href="/events"
                className="px-8 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition text-lg font-semibold"
              >
                Explore Events
              </Link>

              <Link
                href="/clubs"
                className="px-8 py-4 rounded-2xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition text-lg font-semibold"
              >
                Discover Clubs
              </Link>

            </div>

            {/* STATS */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">

              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

                <h2 className="text-5xl font-black text-indigo-400">
                  50+
                </h2>

                <p className="mt-3 text-slate-400">
                  Campus Events
                </p>

              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

                <h2 className="text-5xl font-black text-cyan-400">
                  20+
                </h2>

                <p className="mt-3 text-slate-400">
                  Student Clubs
                </p>

              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

                <h2 className="text-5xl font-black text-purple-400">
                  500+
                </h2>

                <p className="mt-3 text-slate-400">
                  Students
                </p>

              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

                <h2 className="text-5xl font-black text-green-400">
                  24/7
                </h2>

                <p className="mt-3 text-slate-400">
                  Community Access
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ABOUT */}
      <section className="max-w-7xl mx-auto px-6 py-28">

        <div className="max-w-4xl">

          <span className="text-indigo-400 font-semibold uppercase tracking-widest">
            About Platform
          </span>

          <h2 className="mt-6 text-5xl md:text-6xl font-black">
            What is CampusConnect?
          </h2>

          <p className="mt-10 text-xl text-slate-400 leading-9">

            CampusConnect is a centralized student platform
            designed to digitally connect the entire campus ecosystem.

            Students can explore official college clubs,
            discover upcoming events, organize community meetups,
            and manage campus activities from one place.

          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">

              <h3 className="text-2xl font-bold">
                Event Discovery
              </h3>

              <p className="mt-4 text-slate-400 leading-7">
                Explore workshops, hackathons,
                fests, competitions, sports events,
                and community gatherings.
              </p>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">

              <h3 className="text-2xl font-bold">
                Club Ecosystem
              </h3>

              <p className="mt-4 text-slate-400 leading-7">
                Discover official campus clubs,
                their activities, branding,
                and communities.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}
      <section className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-28">

          <div className="max-w-3xl">

            <span className="text-cyan-400 font-semibold uppercase tracking-widest">
              Core Features
            </span>

            <h2 className="mt-6 text-5xl font-black">
              Everything Inside CampusConnect
            </h2>

          </div>

          {/* FEATURE CARDS */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* EVENTS */}
            <div className="rounded-[32px] border border-slate-800 bg-slate-900/70 p-10 hover:border-indigo-500/40 transition">

              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-3xl">
                🎉
              </div>

              <h3 className="mt-8 text-4xl font-black">
                Events Page
              </h3>

              <p className="mt-6 text-slate-400 leading-8">

                Discover official campus events including
                hackathons, workshops, cultural programs,
                sports tournaments, seminars, and tech fests.

              </p>

              <ul className="mt-8 space-y-4 text-slate-300">

                <li>✓ Event registration system</li>
                <li>✓ Club-organized events</li>
                <li>✓ Event posters & details</li>
                <li>✓ Community events section</li>
                <li>✓ Event categories</li>

              </ul>

            </div>

            {/* CLUBS */}
            <div className="rounded-[32px] border border-slate-800 bg-slate-900/70 p-10 hover:border-cyan-500/40 transition">

              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-3xl">
                🚀
              </div>

              <h3 className="mt-8 text-4xl font-black">
                Clubs Page
              </h3>

              <p className="mt-6 text-slate-400 leading-8">

                Explore official student clubs across
                technology, design, photography,
                entrepreneurship, culture, sports,
                coding, and innovation.

              </p>

              <ul className="mt-8 space-y-4 text-slate-300">

                <li>✓ Club showcase system</li>
                <li>✓ Club approval workflow</li>
                <li>✓ Club categories</li>
                <li>✓ Website & social links</li>
                <li>✓ Organizer management</li>

              </ul>

            </div>

            {/* DASHBOARD */}
            <div className="rounded-[32px] border border-slate-800 bg-slate-900/70 p-10 hover:border-purple-500/40 transition">

              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center text-3xl">
                📊
              </div>

              <h3 className="mt-8 text-4xl font-black">
                Dashboard
              </h3>

              <p className="mt-6 text-slate-400 leading-8">

                A personal organizer dashboard for students,
                club admins, and event hosts to manage
                registrations and activities efficiently.

              </p>

              <ul className="mt-8 space-y-4 text-slate-300">

                <li>✓ Create & manage events</li>
                <li>✓ Community event creation</li>
                <li>✓ Attendee tracking</li>
                <li>✓ Registered event history</li>
                <li>✓ Created clubs overview</li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* COMMUNITY EVENTS */}
      <section className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-28">

          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <div>

              <span className="text-green-400 font-semibold uppercase tracking-widest">
                Student Community
              </span>

              <h2 className="mt-6 text-5xl md:text-6xl font-black">
                Community Events
              </h2>

              <p className="mt-8 text-xl text-slate-400 leading-9">

                CampusConnect also supports student-driven
                community events beyond official clubs.

                Students can organize study jams,
                discussions, gaming sessions,
                networking meetups, open mics,
                and collaborative activities.

              </p>

            </div>

            <div className="rounded-[40px] border border-slate-800 bg-slate-900/70 p-12">

              <h3 className="text-3xl font-black">
                Why It Matters
              </h3>

              <div className="mt-10 space-y-6 text-slate-300 text-lg">

                <div>✓ Encourages student engagement</div>
                <div>✓ Builds campus communities</div>
                <div>✓ Open collaboration opportunities</div>
                <div>✓ Admin approval for quality control</div>
                <div>✓ Safe & moderated ecosystem</div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ADMIN SECTION */}
      <section className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-28">

          <div className="max-w-4xl">

            <span className="text-red-400 font-semibold uppercase tracking-widest">
              Moderation & Security
            </span>

            <h2 className="mt-6 text-5xl md:text-6xl font-black">
              Admin Controlled Platform
            </h2>

            <p className="mt-10 text-xl text-slate-400 leading-9">

              CampusConnect includes a dedicated admin system
              to maintain authenticity, moderation,
              and quality across the platform.

            </p>

          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-10">

              <h3 className="text-3xl font-bold">
                Club Approval
              </h3>

              <p className="mt-5 text-slate-400 leading-8">
                Newly created clubs require admin approval
                before appearing publicly on the platform.
              </p>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-10">

              <h3 className="text-3xl font-bold">
                Community Event Approval
              </h3>

              <p className="mt-5 text-slate-400 leading-8">
                Community events are reviewed by admins
                to prevent spam and maintain event quality.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="border-t border-slate-800">

        <div className="max-w-5xl mx-auto px-6 py-32 text-center">

          <h2 className="text-5xl md:text-7xl font-black leading-tight">

            Ready to Experience
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Digital Campus Life?
            </span>

          </h2>

          <p className="mt-10 text-xl text-slate-400 leading-9 max-w-3xl mx-auto">

            Explore events, discover communities,
            connect with students, and make your
            campus experience more engaging with CampusConnect.

          </p>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-6">

            <Link
              href="/events"
              className="px-8 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition text-lg font-semibold"
            >
              Explore Events
            </Link>

            <Link
              href="/clubs"
              className="px-8 py-4 rounded-2xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 transition text-lg font-semibold"
            >
              Explore Clubs
            </Link>

          </div>

        </div>

      </section>

    </main>

  );

}