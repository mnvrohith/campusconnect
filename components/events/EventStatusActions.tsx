"use client";

import { useRouter } from "next/navigation";

export default function EventStatusActions({
  eventId,
}: {
  eventId: string;
}) {

  const router =
    useRouter();

  async function updateStatus(
    status:
      | "completed"
      | "cancelled"
  ) {

    const confirmAction =
      window.confirm(
        `Are you sure you want to mark this event as ${status}?`
      );

    if (!confirmAction)
      return;

    try {

      const res =
        await fetch(
          `/api/events/${eventId}/status`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              status,
            }),
          }
        );

      const data =
        await res.json();

      alert(data.message);

      if (data.success) {

        router.refresh();

      }

    } catch (error) {

      console.log(error);

      alert(
        "Something went wrong"
      );

    }

  }

  return (

    <div className="mt-8 space-y-4">

      <button
        onClick={() =>
          updateStatus(
            "completed"
          )
        }
        className="w-full rounded-2xl bg-green-500 hover:bg-green-600 transition py-4 font-semibold"
      >
        ✅ Mark Completed
      </button>

      <button
        onClick={() =>
          updateStatus(
            "cancelled"
          )
        }
        className="w-full rounded-2xl bg-red-500 hover:bg-red-600 transition py-4 font-semibold"
      >
        ❌ Cancel Event
      </button>

    </div>

  );

}