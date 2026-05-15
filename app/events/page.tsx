import Link from "next/link";

async function getEvents() {

  const res = await fetch(
    "http://localhost:3000/api/events",
    {
      cache: "no-store",
    }
  );

  return res.json();

}

export default async function EventsPage() {

  const data = await getEvents();

  const events = data.events || [];

  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-14">

      {/* Header */}
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <h1 className="text-5xl font-bold">
              Explore Events
            </h1>

            <p className="mt-4 text-slate-400 text-lg">
              Discover workshops, hackathons,
              cultural fests, sports, and more.
            </p>

          </div>

          <Link
            href="/create-event"
            className="px-6 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition font-semibold w-fit"
          >
            + Create Event
          </Link>

        </div>

        {/* Events Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {events.map((event: any) => (

            <Link
              key={event._id}
              href={`/events/${event._id}`}
              className="group rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-2"
            >

              {/* Image */}
              <div className="h-56 overflow-hidden bg-slate-800">

                {event.imageUrl ? (

                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />

                ) : (

                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    No Image
                  </div>

                )}

              </div>

              {/* Content */}
              <div className="p-6">

                {/* Category */}
                <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm">
                  {event.category || "General"}
                </span>

                {/* Club */}
{
  event.club && (

    <div className="mt-4 flex items-center gap-3">

      {
        event.club.logoUrl && (

          <img
            src={event.club.logoUrl}
            alt={event.club.name}
            className="w-10 h-10 rounded-full object-cover border border-slate-700"
          />

        )
      }

      <div>

        <p className="text-xs text-slate-500">
          Organized by
        </p>

        <p className="text-sm font-medium text-slate-300">
          {event.club.name}
        </p>

      </div>

    </div>

  )
}

                {/* Title */}
                <h2 className="mt-5 text-2xl font-bold line-clamp-2">
                  {event.title}
                </h2>

                {/* Description */}
                <p className="mt-4 text-slate-400 line-clamp-3 leading-7">
                  {event.description}
                </p>

                {/* Footer */}
                <div className="mt-8 flex items-center justify-between text-sm text-slate-400">

                  <div>
                    📍 {event.location}
                  </div>

                  <div>
                    📅 {
                      new Date(event.date)
                        .toLocaleDateString()
                    }
                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

        {/* Empty State */}
        {events.length === 0 && (

          <div className="mt-24 text-center">

            <h2 className="text-3xl font-bold">
              No Events Yet
            </h2>

            <p className="mt-4 text-slate-400">
              Create your first campus event.
            </p>

          </div>

        )}

      </div>

    </main>
  );
}