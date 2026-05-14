"use client";

import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useUser } from "@clerk/nextjs";

export default function EventDetailsPage() {

  const { id } = useParams();

  const router = useRouter();

  const { user } = useUser();

  const [event, setEvent] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchEvent() {

      try {

        const res = await fetch(
          `/api/events/${id}`
        );

        const data = await res.json();

        setEvent(data.event);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    }

    fetchEvent();

  }, [id]);

  async function handleDelete() {

    const confirmDelete = confirm(
      "Delete this event?"
    );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `/api/events/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {

        alert("Event deleted");

        router.push("/events");

      }

    } catch (error) {

      console.log(error);

    }

  }

  if (loading) {

    return (
      <main className="min-h-screen flex items-center justify-center">

        <p className="text-slate-400">
          Loading...
        </p>

      </main>
    );

  }

  if (!event) {

    return (
      <main className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold">
          Event Not Found
        </h1>

      </main>
    );

  }

  const isOwner =
    user?.id === event.createdBy?.clerkId;

  return (
    <main className="min-h-screen pb-20">

      {/* Hero */}
      <div className="h-[400px] bg-slate-900 overflow-hidden">

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
      <div className="max-w-5xl mx-auto px-6 mt-12">

        <div className="flex items-start justify-between gap-6">

          <div>

            <span className="px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300 text-sm">
              {event.category}
            </span>

            <h1 className="mt-6 text-5xl font-bold">
              {event.title}
            </h1>

          </div>

          {/* Owner Actions */}
          {isOwner && (

            <div className="flex gap-3">

              <button
  onClick={() =>
    router.push(`/events/${id}/edit`)
  }
  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
>
  Edit
</button>

              <button
                onClick={handleDelete}
                className="px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition"
              >
                Delete
              </button>

            </div>

          )}

        </div>

        {/* Meta */}
        <div className="mt-8 flex flex-wrap gap-8 text-slate-400">

          <div>
            📍 {event.location}
          </div>

          <div>
            📅 {
              new Date(event.date)
                .toLocaleDateString()
            }
          </div>

          <div>
            👤 {event.createdBy?.name}
          </div>

        </div>

        {/* Description */}
        <div className="mt-12">

          <h2 className="text-2xl font-semibold">
            About This Event
          </h2>

          <p className="mt-6 text-slate-300 leading-8 whitespace-pre-line">
            {event.description}
          </p>

        </div>

      </div>

    </main>
  );
}