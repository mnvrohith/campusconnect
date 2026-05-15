async function getClubs() {

  const res = await fetch(
    "http://localhost:3000/api/clubs",
    {
      cache: "no-store",
    }
  );

  return res.json();

}

import Link from "next/link";

export default async function ClubsPage() {

  const data = await getClubs();

  const clubs = data.clubs || [];

  return (
    <main className="min-h-screen bg-[#020617] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800">

        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10" />

        <div className="relative max-w-7xl mx-auto px-6 py-24">

          <div className="max-w-3xl">

            <span className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
              Campus Communities
            </span>

            <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight">

              Discover
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Student Clubs
              </span>

            </h1>

            <p className="mt-8 text-xl text-slate-400 leading-8">
              Explore technical, cultural, sports, design,
              photography, coding, entrepreneurship,
              and innovation communities across campus.
            </p>

          </div>

        </div>

      </section>

      {/* CLUBS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        {
          clubs.length === 0 ? (

            <div className="text-center py-32">

              <h2 className="text-4xl font-bold">
                No Clubs Yet
              </h2>

              <p className="mt-4 text-slate-500">
                Clubs approved by admins will appear here.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

              {
               clubs.map((club: any) => (

  <Link
    href={`/clubs/${club._id}`}
    key={club._id}
    className="group rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/70 backdrop-blur-xl hover:border-indigo-500/40 hover:-translate-y-2 transition duration-300 block"
  >

    {/* Banner */}
    <div className="relative h-56 overflow-hidden">

      {
        club.logoUrl ? (

          <img
            src={club.logoUrl}
            alt={club.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />

        ) : (

          <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500" />

        )
      }

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {/* Category */}
      <div className="absolute top-5 left-5">

        <span className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-sm text-white">

          {club.category}

        </span>

      </div>

      {/* Floating Club Name */}
      <div className="absolute bottom-5 left-5 right-5">

        <h2 className="text-3xl font-black text-white drop-shadow-lg">

          {club.name}

        </h2>

      </div>

    </div>

    {/* Content */}
    <div className="p-8">

      <p className="text-slate-400 leading-7 line-clamp-4">

        {club.description}

      </p>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between">

        <div>

          <p className="text-xs text-slate-500">
            Created by
          </p>

          <p className="text-sm text-slate-300 font-medium">

            {club.createdBy?.name}

          </p>

        </div>

        <div className="flex items-center gap-3">

          {
            club.websiteUrl && (

              <a
                href={club.websiteUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-2 rounded-xl border border-slate-700 hover:border-indigo-500 hover:text-indigo-400 transition text-sm"
              >

                Website

              </a>

            )
          }

          <div className="px-4 py-2 rounded-xl bg-indigo-500 text-sm font-medium">

            Explore →

          </div>

        </div>

      </div>

    </div>

  </Link>

))
              
              }

            </div>

          )
        }

      </section>

    </main>
  );

}