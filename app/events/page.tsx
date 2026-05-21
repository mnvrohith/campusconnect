import Link from "next/link";

async function getEvents() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events`,
    {
      cache: "no-store",
    }
  );

  return res.json();

}

async function getCommunityEvents() {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/community-events`,
    {
      cache: "no-store",
    }
  );

  return res.json();

}

export default async function EventsPage() {

  const data = await getEvents();

  const events = data.events || [];



  const communityData =
    await getCommunityEvents();

  const communityEvents =
    communityData.events || [];

  return (

    <main className="min-h-screen bg-[#020617] text-white px-6 py-14">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <section>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            <div>

              <span className="text-indigo-400 font-semibold uppercase tracking-wider">
                CampusConnect
              </span>

              <h1 className="mt-4 text-5xl md:text-7xl font-black leading-tight">
                Explore
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  Campus Events
                </span>
              </h1>

              <p className="mt-8 text-slate-400 text-lg leading-8 max-w-3xl">
                Discover hackathons, workshops, cultural fests,
                coding competitions, sports events, meetups,
                networking sessions, and student-led activities.
              </p>

            </div>

            <div className="flex flex-wrap gap-4">

              <Link
                href="/dashboard/create-event"
                className="px-6 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
              >
                + Create Club Event
              </Link>

              <Link
                href="/dashboard/create-community-event"
                className="px-6 py-4 rounded-2xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 transition font-semibold text-cyan-300"
              >
                + Create Community Event
              </Link>

            </div>

          </div>

        </section>

        {/* CLUB EVENTS */}
        <section className="mt-20">

          <div className="flex items-end justify-between gap-6 flex-wrap">

            <div>

              <span className="text-indigo-400 font-semibold uppercase tracking-wider">
                Official Organizations
              </span>

              <h2 className="mt-3 text-5xl font-black">
                Club Events
              </h2>

              <p className="mt-5 text-slate-400 text-lg max-w-2xl leading-8">
                Official events organized by approved campus clubs,
                technical societies, cultural communities,
                sports teams, and student organizations.
              </p>

            </div>

          </div>

          {
            events.length === 0 ? (

              <div className="mt-12 rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-16 text-center">

                <h3 className="text-3xl font-bold">
                  No Events Yet
                </h3>

                <p className="mt-4 text-slate-400">
                  club events will appear here.
                </p>

              </div>

            ) : (

              <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

                {
                  events.map((event: any) => (

                    <Link
                      key={event._id}
                      href={`/events/${event._id}`}
                      className="group rounded-[32px] overflow-hidden border border-slate-800 bg-slate-900/60 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-2"
                    >

                      {/* IMAGE */}
<div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

  {/* Glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 z-0" />

  {
    event.imageUrl ? (

      <img
        src={event.imageUrl}
        alt={event.title}
        className="relative z-10 w-full h-full object-contain p-3 group-hover:scale-[1.03] transition duration-500"
      />

    ) : (

      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 relative z-10">

        <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-3xl">
          🎉
        </div>

        <p className="mt-4 text-sm">
          No Poster Uploaded
        </p>

      </div>

    )
  }

  {/* Top Fade */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-20" />

  {/* Glass Category Badge */}
  <div className="absolute top-5 left-5 z-30">

    <span className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-indigo-200 text-sm font-medium shadow-lg shadow-indigo-500/10">
      {event.category || "General"}
    </span>
<div className="mt-3">

  {
    event.status === "upcoming" && (

      <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
        Upcoming
      </span>

    )
  }

  {
    event.status === "completed" && (

      <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-medium">
        Completed
      </span>

    )
  }

  {
    event.status === "cancelled" && (

      <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-medium">
        Cancelled
      </span>

    )
  }

</div>
  </div>

  {/* Bottom Glow */}
  <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-52 h-52 bg-indigo-500/20 blur-3xl rounded-full z-0" />

</div>

                      {/* CONTENT */}
                      <div className="p-8">

                        {/* CLUB */}
                        {
                          event.club && (

                            <div className="flex items-center gap-4">

                              {
                                event.club.logoUrl && (

                                  <img
                                    src={event.club.logoUrl}
                                    alt={event.club.name}
                                    className="w-12 h-12 rounded-full object-cover border border-slate-700"
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

                        {/* TITLE */}
                        <h2 className="mt-6 text-3xl font-black line-clamp-2">
                          {event.title}
                        </h2>

                        {/* DESCRIPTION */}
                        <p className="mt-5 text-slate-400 line-clamp-4 leading-7">
                          {event.description}
                        </p>

                        {/* FOOTER */}
                        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-sm">

                          <div className="text-slate-400">
                            📍 {event.location}
                          </div>

                          <div className="text-slate-400">
                            📅 {
                              new Date(
                                event.date
                              ).toLocaleDateString()
                            }
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

        {/* COMMUNITY EVENTS */}
        <section className="mt-28">

          <div className="flex items-end justify-between gap-6 flex-wrap">

            <div>

              <span className="text-cyan-400 font-semibold uppercase tracking-wider">
                Open Campus Events
              </span>

              <h2 className="mt-3 text-5xl font-black">
                Community Events
              </h2>

              <p className="mt-5 text-slate-400 text-lg max-w-2xl leading-8">
                Open events created by students for networking,
                study groups, gaming, discussions, creativity,
                collaboration, and campus engagement.
              </p>

            </div>

          </div>

          {
            communityEvents.length === 0 ? (

              <div className="mt-12 rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-16 text-center">

                <h3 className="text-3xl font-bold">
                  No Community Events Yet
                </h3>

                <p className="mt-4 text-slate-400">
                  Approved community events will appear here.
                </p>

              </div>

            ) : (

              <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

                {
                  communityEvents.map((event: any) => (

                    <Link
                      key={event._id}
                      href={`/community-events/${event._id}`}
                      className="group overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900 hover:border-cyan-500/40 transition duration-300"
                    >

                      {/* IMAGE */}
                      <div className="relative h-64 overflow-hidden">

                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        <div className="absolute top-5 left-5">

                          <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-medium">
                            Community Event
                          </span>

                        </div>

                      </div>

                      {/* CONTENT */}
                      <div className="p-8">

                        <h3 className="text-3xl font-black line-clamp-2">
                          {event.title}
                        </h3>

                        <p className="mt-5 text-slate-400 leading-7 line-clamp-4">
                          {event.description}
                        </p>

                        {/* INFO */}
                        <div className="mt-8 space-y-4 text-sm">

                          <div className="flex items-center justify-between">

                            <span className="text-slate-500">
                              Location
                            </span>

                            <span className="font-medium">
                              {event.location}
                            </span>

                          </div>

                          <div className="flex items-center justify-between">

                            <span className="text-slate-500">
                              Date
                            </span>

                            <span className="font-medium">

                              {
                                new Date(
                                  event.date
                                ).toLocaleDateString()
                              }

                            </span>

                          </div>

                          <div className="flex items-center justify-between">

                            <span className="text-slate-500">
                              Time
                            </span>

                            <span className="font-medium">
                              {event.startTime} - {event.endTime}
                            </span>

                          </div>

                        </div>

                        {/* CREATOR */}
                        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">

                          <div>

                            <p className="text-sm text-slate-500">
                              Hosted By
                            </p>

                            <h4 className="mt-1 font-semibold">
                              {event.createdBy?.name}
                            </h4>

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

      </div>

    </main>

  );

}