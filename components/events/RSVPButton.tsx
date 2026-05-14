"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function RSVPButton(
  {
    eventId,
    isCreator,
    isRegistered,
  }: {
    eventId: string;
    isCreator: boolean;
    isRegistered: boolean;
  }
) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleRSVP() {

    try {

      setLoading(true);

      const res = await fetch(
        `/api/events/${eventId}/rsvp`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (data.success) {

        alert("Successfully registered!");

        router.refresh();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  }

  if (isCreator) {

    return (

      <button
        disabled
        className="mt-8 w-full rounded-2xl bg-slate-700 py-4 font-semibold text-lg cursor-not-allowed"
      >
        You Created This Event
      </button>

    );

  }

  if (isRegistered) {

  return (

    <button
      disabled
      className="mt-8 w-full rounded-2xl bg-emerald-600 py-4 font-semibold text-lg cursor-not-allowed"
    >
      Registered ✓
    </button>

  );

}

  return (

    <button
      onClick={handleRSVP}
      disabled={loading}
      className="mt-8 w-full rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition py-4 font-semibold text-lg disabled:opacity-50"
    >

      {
        loading
          ? "Registering..."
          : "RSVP Now"
      }

    </button>

  );

}