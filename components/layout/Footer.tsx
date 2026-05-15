export default function Footer() {

  return (
    <footer className="border-t border-slate-800 bg-[#020617] text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>

            <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              CampusConnect
            </h2>

            <p className="mt-6 text-slate-400 leading-7">
              Connecting students, clubs, and campus events
              into one modern university ecosystem.
            </p>

          </div>

          {/* Navigation */}
          <div>

            <h3 className="text-lg font-semibold">
              Navigation
            </h3>

            <div className="mt-6 flex flex-col gap-4 text-slate-400">

              <a
                href="/"
                className="hover:text-indigo-400 transition"
              >
                Home
              </a>

              <a
                href="/events"
                className="hover:text-indigo-400 transition"
              >
                Events
              </a>

              <a
                href="/clubs"
                className="hover:text-indigo-400 transition"
              >
                Clubs
              </a>

              <a
                href="/dashboard"
                className="hover:text-indigo-400 transition"
              >
                Dashboard
              </a>

            </div>

          </div>

          {/* Features */}
          <div>

            <h3 className="text-lg font-semibold">
              Features
            </h3>

            <div className="mt-6 flex flex-col gap-4 text-slate-400">

              <p>
                Event Management
              </p>

              <p>
                Club Ecosystem
              </p>

              <p>
                RSVP Registration
              </p>

              <p>
                Organizer Dashboard
              </p>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-lg font-semibold">
              Connect
            </h3>

            <div className="mt-6 flex flex-col gap-4 text-slate-400">

              <a
                href="mailto:campusconnect@gmail.com"
                className="hover:text-indigo-400 transition"
              >
                campusconnect@gmail.com
              </a>

              

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-slate-500 text-sm">
            © 2026 CampusConnect. All rights reserved.
          </p>

          <p className="text-slate-500 text-sm">
            Built with Next.js • MongoDB • Tailwind • Clerk
          </p>

        </div>

      </div>

    </footer>
  );

}