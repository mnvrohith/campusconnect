"use client";

import { useRouter } from "next/navigation";

export default function RejectCommunityEventButton({
  eventId,
}: {
  eventId: string;
}) {

  const router = useRouter();

  async function handleReject() {

    try {

      const res = await fetch(
        `/api/community-events/${eventId}/reject`,
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
      onClick={handleReject}
      className="px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 transition font-semibold"
    >
      Reject Event
    </button>

  );

}