import Link from "next/link";

import { currentUser } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Club from "@/models/Club";
import CommunityEvent from "@/models/CommunityEvent";

export default async function AdminDashboardPage() {

  await connectDB();

  const clerkUser = await currentUser();

  if (!clerkUser) {

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

        <h1 className="text-3xl font-bold">
          Unauthorized
        </h1>

      </main>
    );

  }

  const user = await User.findOne({
    clerkId: clerkUser.id,
  });

  if (!user || user.role !== "admin") {

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

        <h1 className="text-3xl font-bold">
          Admin Access Only
        </h1>

      </main>
    );

  }

  /* STATS */
  const totalUsers =
    await User.countDocuments();

  const totalClubs =
    await Club.countDocuments();

  const pendingClubs =
    await Club.countDocuments({
      status: "pending",
    });

  const pendingCommunityEvents =
    await CommunityEvent.countDocuments({
      status: "pending",
    });

  /* RECENT PENDING CLUBS */
  const recentPendingClubs =
    await Club.find({
      status: "pending",
    })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .limit(5);

  /* RECENT PENDING EVENTS */
  const recentPendingEvents =
    await CommunityEvent.find({
      status: "pending",
    })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .limit(5);

  return (

    <main className="min-h-screen bg-[#020617] text-white">

      {/* HERO */}
      <section className="border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            <div>

              <p className="uppercase tracking-[0.2em] text-sm text-indigo-400 font-semibold">
                CampusConnect Admin
              </p>

              <h1 className="mt-5 text-5xl md:text-6xl font-black leading-tight">

                Admin Dashboard

              </h1>

              <p className="mt-6 text-slate-400 text-lg max-w-2xl">

                Manage clubs, community events,
                approvals, and platform moderation.

              </p>

            </div>

            {/* QUICK ACTIONS */}
            <div className="flex flex-wrap gap-4">

              <Link
                href="/admin/clubs"
                className="rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition px-6 py-4 font-semibold"
              >
                Manage Clubs
              </Link>

              <Link
                href="/admin/community-events"
                className="rounded-2xl border border-slate-700 bg-slate-900 hover:border-indigo-500 transition px-6 py-4 font-semibold"
              >
                Manage Community Events
              </Link>

            </div>

          </div>

        </div>

      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* STATS */}
        <section>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

              <p className="text-slate-400">
                Total Users
              </p>

              <h2 className="mt-4 text-5xl font-black text-indigo-400">
                {totalUsers}
              </h2>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

              <p className="text-slate-400">
                Total Clubs
              </p>

              <h2 className="mt-4 text-5xl font-black text-cyan-400">
                {totalClubs}
              </h2>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

              <p className="text-slate-400">
                Pending Clubs
              </p>

              <h2 className="mt-4 text-5xl font-black text-yellow-400">
                {pendingClubs}
              </h2>

            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

              <p className="text-slate-400">
                Pending Community Events
              </p>

              <h2 className="mt-4 text-5xl font-black text-pink-400">
                {pendingCommunityEvents}
              </h2>

            </div>

          </div>

        </section>

        {/* RECENT PENDING CLUBS */}
        <section className="mt-24">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-4xl font-bold">
                Pending Clubs
              </h2>

              <p className="mt-3 text-slate-400">
                Recently submitted clubs awaiting approval.
              </p>

            </div>

            <Link
              href="/admin/clubs"
              className="text-indigo-400 hover:text-indigo-300"
            >
              View All →
            </Link>

          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {
              recentPendingClubs.map((club: any) => (

                <div
                  key={club._id}
                  className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden"
                >

                  {
                    club.logoUrl ? (

                      <img
                        src={club.logoUrl}
                        alt={club.name}
                        className="h-52 w-full object-cover"
                      />

                    ) : (

                      <div className="h-52 w-full bg-gradient-to-br from-indigo-500 to-cyan-500" />

                    )
                  }

                  <div className="p-7">

                    <h3 className="text-2xl font-bold">
                      {club.name}
                    </h3>

                    <p className="mt-3 text-slate-400 line-clamp-3">
                      {club.description}
                    </p>

                    <p className="mt-6 text-sm text-slate-500">
                      By {club.createdBy?.name}
                    </p>

                  </div>

                </div>

              ))
            }

          </div>

        </section>

        {/* RECENT PENDING EVENTS */}
        <section className="mt-24">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-4xl font-bold">
                Pending Community Events
              </h2>

              <p className="mt-3 text-slate-400">
                Community events awaiting admin approval.
              </p>

            </div>

            <Link
              href="/admin/community-events"
              className="text-indigo-400 hover:text-indigo-300"
            >
              View All →
            </Link>

          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {
              recentPendingEvents.map((event: any) => (

                <div
                  key={event._id}
                  className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden"
                >

                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-7">

                    <h3 className="text-2xl font-bold">
                      {event.title}
                    </h3>

                    <p className="mt-3 text-slate-400 line-clamp-3">
                      {event.description}
                    </p>

                    <p className="mt-6 text-sm text-slate-500">
                      By {event.createdBy?.name}
                    </p>

                  </div>

                </div>

              ))
            }

          </div>

        </section>

      </div>

    </main>

  );

}