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
    <main className="min-h-screen px-6 py-16">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-bold">
              Campus Events
            </h1>

            <p className="mt-4 text-slate-400">
              Explore upcoming events happening on campus.
            </p>

          </div>

          <Link
            href="/dashboard/create-event"
            className="px-5 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition"
          >
            Create Event
          </Link>

        </div>

        {/* Event Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

          {events.map((event: any) => (

            <div
              key={event._id}
              className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden hover:border-indigo-500 transition"
            >

              {/* Image */}
              <div className="h-52 bg-slate-800">

                {event.imageUrl ? (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500">
                    No Image
                  </div>
                )}

              </div>

              {/* Content */}
              <div className="p-6">

                <div className="flex items-center justify-between">

                  <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
                    {event.category}
                  </span>

                  <span className="text-xs text-slate-500">
                    {new Date(event.date)
                      .toLocaleDateString()}
                  </span>

                </div>

                <h2 className="mt-4 text-2xl font-semibold">
                  {event.title}
                </h2>

                <p className="mt-3 text-slate-400 line-clamp-3">
                  {event.description}
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-300">
                      {event.location}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      By {event.createdBy?.name}
                    </p>

                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="text-indigo-400 hover:text-indigo-300 text-sm"
                  >
                    View Details →
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}