import Link from "next/link";

import { currentUser } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Event from "@/models/Event";
import Club from "@/models/Club";
import CommunityEvent from "@/models/CommunityEvent";

export default async function DashboardPage() {

  await connectDB();

  const clerkUser = await currentUser();

  if (!clerkUser) {

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

        <div className="text-center">

          <h1 className="text-4xl font-bold">
            Please Login
          </h1>

          <p className="mt-4 text-slate-400">
            You need to login to access dashboard.
          </p>

        </div>

      </main>
    );

  }

  const user = await User.findOne({
    clerkId: clerkUser.id,
  });

  const registeredEvents = await Event.find({
    attendees: user._id,
  }).sort({ createdAt: -1 });

  const createdEvents = await Event.find({
    createdBy: user._id,
  })
    .populate("attendees", "name email")
    .sort({ createdAt: -1 });

  const createdCommunityEvents =
  await CommunityEvent.find({
    createdBy: user._id,
  }).sort({ createdAt: -1 });  

  const createdClubs = await Club.find({
    createdBy: user._id,
  }).sort({ createdAt: -1 });

  return (

    <main className="min-h-screen bg-[#020617] text-white">

      
    {/* HERO */}
<section className="relative overflow-hidden border-b border-slate-800">

  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10" />

  <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-14">

      {/* LEFT */}
      <div className="max-w-3xl">

        <p className="text-indigo-400 font-semibold tracking-[0.2em] uppercase text-sm">
          CampusConnect Dashboard
        </p>

        <h1 className="mt-5 text-5xl md:text-6xl font-black leading-tight">

          Welcome back,
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            {user.name}
          </span>

        </h1>

        <p className="mt-7 text-slate-400 text-lg leading-8">

          Manage registrations, organize official
          club events, and host community gatherings
          across campus.

        </p>

        {/* ACTION BUTTONS */}
        <div className="mt-10 flex flex-wrap gap-5">

          {/* COMMUNITY EVENT */}
          <Link
            href="/dashboard/create-community-event"
            className="rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition px-7 py-4 font-semibold shadow-lg shadow-indigo-500/20"
          >
            Create Community Event
          </Link>

          {/* OFFICIAL EVENT */}
          {
            createdClubs.length > 0 && (

              <Link
                href="/dashboard/create-event"
                className="rounded-2xl border border-slate-700 bg-slate-900 hover:border-indigo-500 transition px-7 py-4 font-semibold"
              >
                Create Official Event
              </Link>

            )
          }

          <Link
      href="/clubs/create"
      className="rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition px-6 py-3 font-semibold"
    >
      Create Club
    </Link>

        </div>

        {/* SMALL NOTE */}
        {
          createdClubs.length > 0 && (

            <div className="mt-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5">

              <p className="text-sm text-slate-300 leading-7">

                Official club events can only be
                created inside clubs you own or manage.

              </p>

            </div>

          )
        }

      </div>

      {/* RIGHT STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full xl:w-auto">

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-8 min-w-[220px]">

          <p className="text-slate-400 text-sm">
            Registered Events
          </p>

          <h2 className="mt-4 text-5xl font-black text-indigo-400">
            {registeredEvents.length}
          </h2>

        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-8 min-w-[220px]">

          <p className="text-slate-400 text-sm">
            Created Club Events
          </p>

          <h2 className="mt-4 text-5xl font-black text-cyan-400">
            {createdEvents.length}
          </h2>

        </div>

         <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-8 min-w-[220px]">

          <p className="text-slate-400 text-sm">
            Created Community Events
          </p>

          <h2 className="mt-4 text-5xl font-black text-blue-500">
            {createdCommunityEvents.length}
          </h2>

        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-8 min-w-[220px] ">

          <p className="text-slate-400 text-sm">
            Created Clubs
          </p>

          <h2 className="mt-4 text-5xl font-black text-indigo-500">
            {createdClubs.length}
          </h2>

        </div>

      </div>

    </div>

  </div>

</section>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* REGISTERED EVENTS */}
        <section>

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-4xl font-bold">
                Registered Events
              </h2>

              <p className="mt-3 text-slate-400">
                Events you joined through RSVP.
              </p>

            </div>

          </div>

          {
            registeredEvents.length === 0 ? (

              <div className="mt-10 rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-16 text-center">

                <h3 className="text-2xl font-bold">
                  No Registered Events
                </h3>

                <p className="mt-4 text-slate-400">
                  Start exploring campus events and register for them.
                </p>

                <Link
                  href="/events"
                  className="inline-block mt-8 px-6 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
                >
                  Explore Events
                </Link>

              </div>

            ) : (

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                {
                  registeredEvents.map((event: any) => (

                    <Link
                      key={event._id}
                      href={`/events/${event._id}`}
                      className="group rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 hover:border-indigo-500/40 transition duration-300 hover:-translate-y-1"
                    >

                      <div className="relative h-60 overflow-hidden">

                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        <div className="absolute bottom-5 left-5">

                          <span className="px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium">
                            {event.category}
                          </span>

                        </div>

                      </div>

                      <div className="p-7">

                        <h3 className="text-2xl font-bold line-clamp-1">
                          {event.title}
                        </h3>

                        <p className="mt-4 text-slate-400 line-clamp-3 leading-7">
                          {event.description}
                        </p>

                        <div className="mt-6 flex items-center justify-between text-sm text-slate-500">

                          <span>
                            📍 {event.location}
                          </span>

                          <span>
                            📅 {new Date(event.date).toLocaleDateString()}
                          </span>

                        </div>

                      </div>

                    </Link>

                  ))
                }

              </div>

            )
          }

        </section>

        {/* CREATED EVENTS */}
        <section className="mt-28">

          <div>

            <h2 className="text-4xl font-bold">
              Organizer Dashboard
            </h2>

            <p className="mt-3 text-slate-400">
              Track registrations for Club events created by you.
            </p>

          </div>

          {
            createdEvents.length === 0 ? (

              <div className="mt-10 rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-16 text-center">

                <h3 className="text-2xl font-bold">
                  No Events Created Yet
                </h3>

                <p className="mt-4 text-slate-400">
                  Create your first campus event.
                </p>
 <div className="mt-10 flex flex-wrap gap-5">

          {/* COMMUNITY EVENT */}
          <Link
            href="/dashboard/create-community-event"
            className="rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition px-7 py-4 font-semibold shadow-lg shadow-indigo-500/20"
          >
            Create Community Event
          </Link>

          {/* OFFICIAL EVENT */}
          {
            createdClubs.length > 0 && (

              <Link
                href="/dashboard/create-event"
                className="rounded-2xl border border-slate-700 bg-slate-900 hover:border-indigo-500 transition px-7 py-4 font-semibold"
              >
                Create Official Event
              </Link>

            )
          }

        </div>

              </div>

            ) : (

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

  {
    createdEvents.map((event: any) => (

      <div
        key={event._id}
        className="
        group
        overflow-hidden
        rounded-[32px]
        border border-slate-800
        bg-slate-900/70
        hover:border-indigo-500/40
        transition-all duration-300
        hover:-translate-y-2
        relative
      "
      >

        {/* GLOW */}
        <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/5 transition duration-500" />

        {/* IMAGE */}
        <div className="relative aspect-[4/5] bg-slate-950 overflow-hidden">

          {
            event.imageUrl ? (

              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-contain p-3 group-hover:scale-105 transition duration-500"
              />

            ) : (

              <div className="w-full h-full flex items-center justify-center text-slate-500">
                No Poster
              </div>

            )
          }

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* STATUS */}
          <div className="absolute top-5 left-5">

            <span
              className={`px-4 py-2 rounded-full text-xs border backdrop-blur-md
              ${
                event.status === "upcoming"
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  : event.status === "completed"
                  ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                  : "bg-red-500/20 text-red-300 border-red-500/30"
              }`}
            >
              {event.status}
            </span>

          </div>

          {/* CATEGORY */}
          <div className="absolute bottom-5 left-5">

            <span className="px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium">
              {event.category}
            </span>

          </div>

        </div>

        {/* CONTENT */}
        <div className="p-7">

          <h3 className="text-2xl font-bold line-clamp-2">
            {event.title}
          </h3>

          <p className="mt-4 text-slate-400 line-clamp-3 leading-7">
            {event.description}
          </p>

          {/* META */}
          <div className="mt-6 space-y-3 text-sm">

            <div className="flex items-center justify-between text-slate-400">

              <span>📍 Location</span>

              <span className="text-white">
                {event.location}
              </span>

            </div>

            <div className="flex items-center justify-between text-slate-400">

              <span>📅 Date</span>

              <span className="text-white">
                {new Date(event.date).toLocaleDateString()}
              </span>

            </div>

            <div className="flex items-center justify-between text-slate-400">

              <span>👥 Registrations</span>

              <span className="text-indigo-400 font-semibold">
                {event.attendees.length}
              </span>

            </div>

          </div>

          {/* ATTENDEES */}
          <div className="mt-8">

            <h4 className="text-lg font-semibold">
              Registered Students
            </h4>

            {
              event.attendees.length === 0 ? (

                <div className="mt-4 rounded-2xl border border-dashed border-slate-700 p-6 text-center text-slate-500 text-sm">
                  No registrations yet.
                </div>

              ) : (

                <div className="mt-4 space-y-3 max-h-48 overflow-y-auto pr-2">

                  {
                    event.attendees.map((user: any) => (

                      <div
                        key={user._id}
                        className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
                      >

                        <p className="font-medium">
                          {user.name}
                        </p>

                        <p className="text-sm text-slate-400 mt-1">
                          {user.email}
                        </p>

                      </div>

                    ))
                  }

                </div>

              )
            }

          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex gap-3">

            {
              event.status === "upcoming" && (

                <>
                  <button className="flex-1 rounded-xl bg-emerald-500 py-3 font-medium hover:bg-emerald-600 transition">
                    Mark Completed
                  </button>

                  <button className="flex-1 rounded-xl bg-red-500/90 py-3 font-medium hover:bg-red-600 transition">
                    Cancel
                  </button>
                </>

              )
            }

          </div>

        </div>

      </div>

    ))
  }

</div>

            )
          }

        </section>


{/* COMMUNITY EVENTS CREATED */}
<section className="mt-28">

  <div>

    <h2 className="text-4xl font-bold">
      Community Events Created
    </h2>

    <p className="mt-3 text-slate-400">
      Open events organized by you.
    </p>

  </div>

  {
    createdCommunityEvents.length === 0 ? (

      <div className="mt-10 rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-16 text-center">

        <h3 className="text-2xl font-bold">
          No Community Events Yet
        </h3>

        <p className="mt-4 text-slate-400">
          Create open campus events for students.
        </p>

        <Link
          href="/dashboard/create-community-event"
          className="inline-block mt-8 px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-600 transition font-semibold"
        >
          Create Community Event
        </Link>

      </div>

    ) : (

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {
          createdCommunityEvents.map((event: any) => (

            <div
              key={event._id}
              className="group rounded-[32px] overflow-hidden border border-slate-800 bg-slate-900 hover:border-cyan-500/40 transition duration-300"
            >

              {/* IMAGE */}
              <div className="relative aspect-[4/5] bg-slate-950 overflow-hidden">

                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-contain p-3 group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute top-5 left-5">

                  <span className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm">
                    Community Event
                  </span>

                </div>

              </div>

              {/* CONTENT */}
              <div className="p-7">

                <h3 className="text-2xl font-bold">
                  {event.title}
                </h3>

                <p className="mt-4 text-slate-400 line-clamp-3">
                  {event.description}
                </p>

                <div className="mt-6 flex items-center justify-between text-sm text-slate-500">

                  <span>
                    📍 {event.location}
                  </span>

                  <span>
                    📅 {
                      new Date(event.date)
                        .toLocaleDateString()
                    }
                  </span>

                </div>

                <div className="mt-4 text-sm text-cyan-400">

                  {event.startTime} - {event.endTime}

                </div>

                <div className="mt-6">

                  <span
                    className={`px-4 py-2 rounded-full text-sm ${
                      event.status === "approved"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {event.status}
                  </span>

                </div>

              </div>

            </div>

          ))
        }

      </div>

    )
  }

</section>




        {/* CREATED CLUBS */}
<section className="mt-28">

  <div className="flex items-center justify-between">

    <div>

      <h2 className="text-4xl font-bold">
        Your Clubs
      </h2>

      <p className="mt-3 text-slate-400">
        Clubs created and managed by you.
      </p>

    </div>

   

  </div>

  {
    createdClubs.length === 0 ? (

      <div className="mt-10 rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-16 text-center">

        <h3 className="text-2xl font-bold">
          No Clubs Created Yet
        </h3>

        <p className="mt-4 text-slate-400">
          Start your own campus club and build a community.
        </p>

         <Link
      href="/clubs/create"
      className="rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition px-6 py-3 font-semibold"
    >
      Create Club
    </Link>

      </div>

    ) : (

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {
          createdClubs.map((club: any) => (

            <div
              key={club._id}
              className="group rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 hover:border-indigo-500/40 transition duration-300 hover:-translate-y-1"
            >

              {/* IMAGE */}
              <div className="relative h-60 overflow-hidden">

                {
                  club.logoUrl ? (

                    <img
                      src={club.logoUrl}
                      alt={club.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                  ) : (

                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-cyan-500" />

                  )
                }

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5">

                  <span className="px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium">
                    {club.category}
                  </span>

                </div>

              </div>

              {/* CONTENT */}
              <div className="p-7">

                <div className="flex items-center justify-between gap-4">

                  <h3 className="text-2xl font-bold line-clamp-1">
                    {club.name}
                  </h3>

                  <span
                    className={`text-xs px-3 py-1 rounded-full border ${
                      club.status === "approved"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : club.status === "pending"
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}
                  >
                    {club.status}
                  </span>

                </div>

                <p className="mt-4 text-slate-400 line-clamp-3 leading-7">
                  {club.description}
                </p>

                {/* FOOTER */}
                <div className="mt-7 flex items-center justify-between">

                  <p className="text-sm text-slate-500">
                    {new Date(club.createdAt).toLocaleDateString()}
                  </p>

                  {
                    club.websiteUrl && (

                      <a
                        href={club.websiteUrl}
                        target="_blank"
                        className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-indigo-500 transition"
                      >
                        Visit
                      </a>

                    )
                  }

                </div>

              </div>

            </div>

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