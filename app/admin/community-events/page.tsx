import Link from "next/link";

import { currentUser } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";
import CommunityEvent from "@/models/CommunityEvent";
import ApproveCommunityEventButton from "./ApproveCommunityEventButton";
import RejectCommunityEventButton from "./RejectCommunityEventButton";

export default async function AdminCommunityEventsPage() {

  await connectDB();

  const clerkUser = await currentUser();

  if (!clerkUser) {

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

        Unauthorized

      </main>
    );

  }

  const user = await User.findOne({
    clerkId: clerkUser.id,
  });

  if (!user || user.role !== "admin") {

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

        Admin Access Only

      </main>
    );

  }

  const pendingEvents =
    await CommunityEvent.find({
      status: "pending",
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

  return (

    <main className="min-h-screen bg-[#020617] text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-5xl font-black">
              Community Events
            </h1>

            <p className="mt-4 text-slate-400">
              Moderate community events.
            </p>

          </div>

          <Link
            href="/admin"
            className="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-700"
          >
            Back
          </Link>

        </div>

       <div className="mt-16">

  {
    pendingEvents.length === 0 ? (

      <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-16 text-center">

        <h2 className="text-3xl font-bold">
          No Pending Events
        </h2>

        <p className="mt-4 text-slate-400">
          Everything has been reviewed.
        </p>

      </div>

    ) : (

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {
          pendingEvents.map((event: any) => (

            <div
              key={event._id}
              className="overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900"
            >

              {/* IMAGE */}
              <div className="relative h-72 overflow-hidden">

                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6">

                  <span className="px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-sm">

                    Pending Approval

                  </span>

                </div>

              </div>

              {/* CONTENT */}
              <div className="p-8">

                <h2 className="text-4xl font-black">
                  {event.title}
                </h2>

                <p className="mt-5 text-slate-400 leading-7">
                  {event.description}
                </p>

                {/* INFO */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5">

                    <p className="text-sm text-slate-500">
                      Location
                    </p>

                    <h3 className="mt-2 font-semibold">
                      {event.location}
                    </h3>

                  </div>

                  <div className="rounded-2xl bg-slate-950 border border-slate-800 p-5">

                    <p className="text-sm text-slate-500">
                      Date
                    </p>

                    <h3 className="mt-2 font-semibold">

                      {
                        new Date(
                          event.date
                        ).toLocaleDateString()
                      }

                    </h3>

                  </div>

                </div>

                {/* CREATOR */}
                <div className="mt-8 rounded-2xl bg-slate-950 border border-slate-800 p-6">

                  <p className="text-sm text-slate-500">
                    Created By
                  </p>

                  <h3 className="mt-2 text-xl font-bold">
                    {event.createdBy?.name}
                  </h3>

                  <p className="mt-2 text-slate-400">
                    {event.createdBy?.email}
                  </p>

                </div>

                {/* ACTIONS */}
                 <div className="flex gap-4">

                           {/* APPROVE */}
                          <ApproveCommunityEventButton
                              eventId={event._id.toString()}
                                />

                              {/* REJECT */}
                               <RejectCommunityEventButton
                              eventId={event._id.toString()}
                                              />

</div>

              </div>

            </div>

          ))
        }

      </div>

    )
  }

</div>

      </div>

    </main>

  );

}
    