import Link from "next/link";

import { currentUser } from "@clerk/nextjs/server";

import { connectDB } from "@/lib/mongodb";

import CommunityEvent from "@/models/CommunityEvent";
import User from "@/models/User";

import CommunityEventStatusActions
from "@/components/communityEvents/CommunityEventStatusActions";





export default async function CommunityEventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  await connectDB();

  const { id } = await params;

  const event = await CommunityEvent.findById(id)
    .populate("createdBy", "name")
    .populate("attendees", "_id");

       if (
    !event ||
    event.status !== "approved"
         ) {

    return (

      <main className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

        <div className="text-center">

          <h1 className="text-4xl font-bold">
            Event Not Found
          </h1>

          <p className="mt-4 text-slate-400">
            This community event does not exist.
          </p>

        </div>

      </main>

    );

  }

  const isCompleted =
  event.eventStatus === "completed";

const isCancelled =
  event.eventStatus === "cancelled";

  const clerkUser = await currentUser();

  let mongoUser = null;

  if (clerkUser) {

    mongoUser = await User.findOne({
      clerkId: clerkUser.id,
    });

  }

  const isOwner =
    mongoUser &&
    event.createdBy &&
    event.createdBy._id.toString() ===
      mongoUser._id.toString();

  const isRegistered =
    mongoUser &&
    event.attendees.some(
      (attendee: any) =>
        attendee._id.toString() ===
        mongoUser._id.toString()
    );

  return (

    <main className="min-h-screen bg-[#020617] text-white">

      {/* HERO */}
      <section className="relative h-[70vh] overflow-hidden">

        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex items-end">

          <div className="max-w-7xl mx-auto px-6 pb-16 w-full">

            <div className="max-w-4xl">

              <div
                className={`px-4 py-2 rounded-full text-sm border w-fit
                  ${
                    event.eventStatus === "upcoming"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : event.eventStatus === "completed"
                      ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                      : "bg-red-500/20 text-red-300 border-red-500/30"
                  }
                `}
              >
                {event.eventStatus}
              </div>

              <h1 className="mt-6 text-6xl font-black leading-tight">

                {event.title}

              </h1>

              

              <div className="mt-8 flex flex-wrap gap-6 text-slate-300 text-lg">

                <span>
                  📍 {event.location}
                </span>

                <span>
                  📅 {
                    new Date(
                      event.date
                    ).toLocaleDateString()
                  }
                </span>

                <span>
                  ⏰ {event.startTime} - {event.endTime}
                </span>
                 
                 <span>
                  {event.mode === "online" ? "💻 Online Event" : "🏫 Offline Event"}
                 </span>

                 <span>
                  Registration Deadline: {
                    new Date(
                      event.registrationDeadline
                    ).toLocaleDateString()
                  }
                 </span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT */}
          <div className="lg:col-span-2">

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">

              <h2 className="text-3xl font-bold">
                About This Event
              </h2>

              <p className="mt-6 text-slate-400 leading-8 text-lg">

                {event.description}

              </p>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            {/* ORGANIZER */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

              <h3 className="text-2xl font-bold">
                Organizer
              </h3>

              <p className="mt-4 text-slate-400">
                {event.createdBy?.name}
              </p>

            </div>

            {/* ACTIONS */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
  

  <div className="mt-6 flex flex-col gap-4">

    {/* 1. COMPLETED */}
    {isCompleted ? (
      <p className="text-green-400 font-semibold">
        The event is officially completed.
      </p>

    ) : isCancelled ? (
      /* 2. CANCELLED */
      <p className="text-red-400 font-semibold">
        The event is cancelled by the organiser.
      </p>

    ) : isOwner ? (
      /* 3. OWNER CONTROLS */
      <CommunityEventStatusActions eventId={event._id} />

    ) : isRegistered ? (
      /* 4. USER REGISTERED */
      <button
        disabled
        className="w-full rounded-2xl bg-green-500/20 border border-green-500/30 text-green-300 px-6 py-4 font-semibold"
      >
        Already Registered
      </button>

    ) : (
      /* 5. USER NOT REGISTERED */
      <form action={`/api/community-events/${event._id}/rsvp`} method="POST">
        <button className="w-full rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition px-6 py-4 font-semibold">
          RSVP Event
        </button>
      </form>
    )}

  </div>
</div>

           


          </div>

        </div>

      </section>

    </main>

  );

}