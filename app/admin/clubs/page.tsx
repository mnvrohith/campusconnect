import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import Club from "@/models/Club";

import ApproveClubButton from "./ApproveClubButton";

export default async function AdminClubsPage() {

  await connectDB();

  const clerkUser = await currentUser();

  if (!clerkUser) {

    redirect("/");

  }

  const user = await User.findOne({
    clerkId: clerkUser.id,
  });

  if (user.role !== "admin") {

    redirect("/");

  }

  const pendingClubs = await Club.find({
    status: "pending",
  })
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-16">

      <div className="max-w-6xl mx-auto">

        <div>

          <span className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
            Admin Panel
          </span>

          <h1 className="mt-8 text-5xl font-black">
            Club Approval Requests
          </h1>

          <p className="mt-5 text-slate-400 text-lg">
            Review and moderate club submissions.
          </p>

        </div>

        {/* Clubs */}
        <div className="mt-16 space-y-8">

          {
            pendingClubs.length === 0 ? (

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">

                <h2 className="text-3xl font-bold">
                  No Pending Requests
                </h2>

                <p className="mt-4 text-slate-500">
                  Everything is up to date.
                </p>

              </div>

            ) : (

              pendingClubs.map((club: any) => (

                <div
                  key={club._id}
                  className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden"
                >

                  {/* Banner */}
                  {
                    club.logoUrl && (

                      <img
                        src={club.logoUrl}
                        alt={club.name}
                        className="h-64 w-full object-cover"
                      />

                    )
                  }

                  <div className="p-8">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                      {/* Club Info */}
                      <div>

                        <div className="flex items-center gap-4 flex-wrap">

                          <h2 className="text-4xl font-black">
                            {club.name}
                          </h2>

                          <span className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
                            {club.category}
                          </span>

                        </div>

                        <p className="mt-6 text-slate-400 leading-8 max-w-3xl">
                          {club.description}
                        </p>

                        <div className="mt-6 space-y-2 text-slate-500">

                          <p>
                            Created by: {club.createdBy?.name}
                          </p>

                          <p>
                            Email: {club.createdBy?.email}
                          </p>

                        </div>

                      </div>

                      {/* Actions */}
                      <ApproveClubButton
                        clubId={club._id.toString()}
                      />

                    </div>

                  </div>

                </div>

              ))

            )
          }

        </div>

      </div>

    </main>
  );

}