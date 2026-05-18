import { connectDB } from "@/lib/mongodb";

import Club from "@/models/Club";
import Event from "@/models/Event";

async function getClub(id: string) {

  await connectDB();

  const club = await Club.findById(id);

  const events = await Event.find({
    club: id,
  })
    .populate("club", "name logoUrl")
    .sort({ createdAt: -1 });

  return {
    club: JSON.parse(JSON.stringify(club)),
    events: JSON.parse(JSON.stringify(events)),
  };

}

export default async function ClubPage(
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {

  const { id } = await params;

  const data = await getClub(id);

  const club = data.club;

  const events = data.events;

  if (!club) {

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

        <h1 className="text-4xl font-bold">
          Club Not Found
        </h1>

      </main>
    );

  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800">

        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-24">

          <div className="flex flex-col lg:flex-row gap-10 lg:items-center">

            {/* Logo */}
            <div>

              {
                club.logoUrl ? (

                  <img
                    src={club.logoUrl}
                    alt={club.name}
                    className="w-40 h-40 rounded-3xl object-cover border border-slate-700 shadow-2xl"
                  />

                ) : (

                  <div className="w-40 h-40 rounded-3xl bg-slate-900 border border-slate-700 flex items-center justify-center text-5xl">

                    🎓

                  </div>

                )
              }

            </div>

            {/* Info */}
            <div className="flex-1">

              <span className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
                {club.category}
              </span>
                
               <span
                    className={`text-xs px-4 py-2 rounded-full border ${
                      club.status === "approved"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : club.status === "pending"
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}
                  >
                    {club.status}
                  </span>

              <h1 className="mt-6 text-6xl font-black tracking-tight">
                {club.name}
              </h1>

              <p className="mt-6 text-slate-400 text-lg leading-8 max-w-3xl">
                {club.description}
              </p>

              {/* Website */}
              {
                club.website && (

                  <a
                    href={club.website}
                    target="_blank"
                    className="inline-block mt-8 px-6 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition font-medium"
                  >

                    Visit Website

                  </a>

                )
              }

            </div>

          </div>

        </div>

      </section>

      {/* EVENTS */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="flex items-center justify-between flex-wrap gap-6">

          <div>

            <h2 className="text-4xl font-black">
              Club Events
            </h2>

            <p className="mt-4 text-slate-400">
              Events organized by {club.name}
            </p>

          </div>

          <div className="px-6 py-3 rounded-2xl border border-slate-800 bg-slate-900 text-lg">

            {events.length} Events

          </div>

        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {
            events.map((event: any) => (

              <a
                key={event._id}
                href={`/events/${event._id}`}
                className="group rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 hover:border-indigo-500/40 transition"
              >

                {/* Image */}
                <div className="h-56 overflow-hidden bg-slate-950">

                  {
                    event.imageUrl ? (

                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center text-slate-500">

                        No Image

                      </div>

                    )
                  }

                </div>

                {/* Content */}
                <div className="p-6">

                  <div className="flex items-center justify-between">

                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/20">

                      {event.category}

                    </span>

                    <span className="text-sm text-slate-500">

                      {
                        new Date(event.date)
                          .toLocaleDateString()
                      }

                    </span>

                  </div>

                  <h3 className="mt-5 text-2xl font-bold group-hover:text-indigo-400 transition">

                    {event.title}

                  </h3>

                  <p className="mt-4 text-slate-400 line-clamp-3 leading-7">

                    {event.description}

                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <p className="text-slate-500 text-sm">

                      📍 {event.location}

                    </p>

                    <span className="text-indigo-400 text-sm font-medium">

                      View →

                    </span>

                  </div>

                </div>

              </a>

            ))
          }

        </div>

      </section>

    </main>
  );

}