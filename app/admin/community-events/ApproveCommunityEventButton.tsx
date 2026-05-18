"use client";

import { useRouter } from "next/navigation";

export default function ApproveCommunityEventButton({
  eventId,
}: {
  eventId: string;
}) {

  const router = useRouter();

  async function handleApprove() {

    try {

      const res = await fetch(
        `/api/community-events/${eventId}/approve`,
        {
          method: "PATCH",
        }
      );

      if (res.ok) {

        router.refresh();

      }

    } catch (error) {

      console.log(error);

    }

  }

  return (

    <button
      onClick={handleApprove}
      className="px-6 py-3 rounded-2xl bg-green-500 hover:bg-green-600 transition font-semibold"
    >
      Approve Event
    </button>

  );

}