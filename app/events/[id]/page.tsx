import RSVPButton from "@/components/events/RSVPButton";
import { auth } from "@clerk/nextjs/server";

import User from "@/models/User";

import {connectDB} from "@/lib/mongodb";


async function getEvent(id: string) {

  const res = await fetch(
    `http://localhost:3000/api/events/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();

}

export default async function EventDetailsPage(
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {

  const { id } = await params;

  const data = await getEvent(id);

  const event = data.event;

  const { userId } = await auth();

let isCreator = false;

let isRegistered = false;

if (userId) {

  await connectDB();

  const dbUser = await User.findOne({
    clerkId: userId,
  });

  if (dbUser) {

    isCreator =
      event.createdBy?._id?.toString() ===
      dbUser._id.toString();

    isRegistered =
    event.attendees?.some(
      (attendee: any) =>
        attendee.toString() ===
        dbUser._id.toString()
    );
  

  }

}

  if (!event) {

    return (
      <main className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

        <div className="text-center">

          <h1 className="text-5xl font-bold">
            Event Not Found
          </h1>

          <p className="mt-4 text-slate-400">
            This event may have been removed.
          </p>

        </div>

      </main>
    );

  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">

      {/* HERO SECTION */}
      <section className="relative h-[500px] overflow-hidden">

        {event.imageUrl ? (

          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />

        ) : (

          <div className="w-full h-full bg-slate-900" />

        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full">

          <div className="max-w-7xl mx-auto px-6 pb-14">

            {/* Category */}
            <span className="inline-block px-5 py-2 rounded-full bg-indigo-500/20 backdrop-blur-md text-indigo-300 text-sm border border-indigo-500/30">
              {event.category || "General"}
            </span>

            {/* Title */}
            <h1 className="mt-6 text-5xl md:text-7xl font-extrabold max-w-5xl leading-tight">
              {event.title}
            </h1>
{
  event.club && (

    <div className="mt-6 flex items-center gap-4">

      {
        event.club.logoUrl && (

          <img
            src={event.club.logoUrl}
            alt={event.club.name}
            className="w-14 h-14 rounded-full object-cover border border-slate-700"
          />

        )
      }

      <div>

        <p className="text-slate-500 text-sm">
          Organized by
        </p>

        <h3 className="text-xl font-semibold">
          {event.club.name}
        </h3>

      </div>

    </div>

  )
}
            {/* Meta */}
            <div className="mt-8 flex flex-wrap gap-6 text-slate-300 text-lg">

              <div className="flex items-center gap-2">
                📍 {event.location}
              </div>

              <div className="flex items-center gap-2">
                📅 {
                  new Date(event.date)
                    .toLocaleDateString()
                }
              </div>

              <div className="flex items-center gap-2">
                👤 {
                  event.createdBy?.name
                  || "Organizer"
                }
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* LEFT */}
          <div className="lg:col-span-2">

            {/* About */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-8">

              <h2 className="text-3xl font-bold">
                About This Event
              </h2>

              <p className="mt-8 text-slate-300 leading-9 whitespace-pre-line text-lg">
                {event.description}
              </p>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-8">

            {/* RSVP CARD */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-8 sticky top-28">

              <h3 className="text-2xl font-bold">
                Join This Event
              </h3>

              <p className="mt-4 text-slate-400 leading-7">
                Participate and connect with
                students across campus.
              </p>

             <RSVPButton
  eventId={event._id}
  isCreator={isCreator}
   isRegistered={isRegistered}
/>

              {/* Details */}
              <div className="mt-10 space-y-5 text-slate-300">

                <div className="flex justify-between border-b border-slate-800 pb-4">
                  <span>Date</span>

                  <span>
                    {
                      new Date(event.date)
                        .toLocaleDateString()
                    }
                  </span>
                </div>

                <div className="flex justify-between border-b border-slate-800 pb-4">
                  <span>Location</span>

                  <span>
                    {event.location}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Category</span>

                  <span>
                    {event.category}
                  </span>
                </div>

                <div className="flex justify-between border-t border-slate-800 pt-4">
  <span>Attendees</span>

  <span>
    {event.attendees?.length || 0}
  </span>
</div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}