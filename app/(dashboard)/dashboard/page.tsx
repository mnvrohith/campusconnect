import Link from "next/link";

import { currentUser } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Event from "@/models/Event";
import Club from "@/models/Club";

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

  const createdClubs = await Club.find({
    createdBy: user._id,
  }).sort({ createdAt: -1 });

  return (

    <main className="min-h-screen bg-[#020617] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800">

        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10" />

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            <div>

              <p className="text-indigo-400 font-semibold tracking-wide uppercase">
                CampusConnect Dashboard
              </p>

              <h1 className="mt-4 text-5xl md:text-6xl font-black leading-tight">
                Welcome back,
                <br />
                {user.name}
              </h1>

              <p className="mt-6 text-slate-400 text-lg max-w-2xl">
                Manage your campus events, registrations, and attendees from one place.
              </p>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-5 w-full lg:w-auto">

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
                  Created Events
                </p>

                <h2 className="mt-4 text-5xl font-black text-cyan-400">
                  {createdEvents.length}
                </h2>

              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-8 min-w-[220px]">

                <p className="text-slate-400 text-sm">
                  Created Clubs
                </p>

                <h2 className="mt-4 text-5xl font-black text-green-400">
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
              Track registrations for events created by you.
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

                <Link
                  href="/create-event"
                  className="inline-block mt-8 px-6 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
                >
                  Create Event
                </Link>

              </div>

            ) : (

              <div className="mt-10 space-y-10">

                {
                  createdEvents.map((event: any) => (

                    <div
                      key={event._id}
                      className="rounded-[32px] border border-slate-800 bg-slate-900 overflow-hidden"
                    >

                      {/* TOP */}
                      <div className="relative h-72 overflow-hidden">

                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                        <div className="absolute bottom-8 left-8 right-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

                          <div>

                            <span className="px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm">
                              {event.category}
                            </span>

                            <h3 className="mt-5 text-4xl font-black">
                              {event.title}
                            </h3>

                            <div className="mt-4 flex flex-wrap gap-6 text-slate-300">

                              <span>
                                📍 {event.location}
                              </span>

                              <span>
                                📅 {new Date(event.date).toLocaleDateString()}
                              </span>

                            </div>

                          </div>

                          <div className="rounded-3xl bg-black/50 backdrop-blur-xl border border-white/10 px-8 py-6">

                            <p className="text-slate-400 text-sm">
                              Total Registrations
                            </p>

                            <h2 className="mt-2 text-5xl font-black text-indigo-400">
                              {event.attendees.length}
                            </h2>

                          </div>

                        </div>

                      </div>

                      {/* ATTENDEES */}
                      <div className="p-8">

                        <div className="flex items-center justify-between">

                          <div>

                            <h4 className="text-3xl font-bold">
                              Registered Students
                            </h4>

                            <p className="mt-2 text-slate-400">
                              Students who RSVP’d for this event.
                            </p>

                          </div>

                        </div>

                        {
                          event.attendees.length === 0 ? (

                            <div className="mt-8 rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-500">
                              No registrations yet.
                            </div>

                          ) : (

                            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">

                              <table className="w-full">

                                <thead className="bg-slate-950">

                                  <tr className="text-left text-slate-400">

                                    <th className="px-6 py-5 font-medium">
                                      Student Name
                                    </th>

                                    <th className="px-6 py-5 font-medium">
                                      Email Address
                                    </th>

                                  </tr>

                                </thead>

                                <tbody>

                                  {
                                    event.attendees.map((user: any) => (

                                      <tr
                                        key={user._id}
                                        className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                                      >

                                        <td className="px-6 py-5 font-medium">
                                          {user.name}
                                        </td>

                                        <td className="px-6 py-5 text-slate-400">
                                          {user.email}
                                        </td>

                                      </tr>

                                    ))
                                  }

                                </tbody>

                              </table>

                            </div>

                          )
                        }

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