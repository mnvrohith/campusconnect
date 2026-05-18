"use client";

type Props = {
  eventId: string;
};

export default function CommunityEventStatusActions({
  eventId,
}: Props) {

  const handleComplete = async () => {

    const res = await fetch(
      `/api/community-events/${eventId}/complete`,
      {
        method: "PATCH",
      }
    );

    const data = await res.json();

    if (data.success) {

      window.location.reload();

    } else {

      alert(data.message);

    }

  };

  const handleCancel = async () => {

    const res = await fetch(
      `/api/community-events/${eventId}/cancel`,
      {
        method: "PATCH",
      }
    );

    const data = await res.json();

    if (data.success) {

      window.location.reload();

    } else {

      alert(data.message);

    }

  };

  return (

    <div className="flex flex-wrap gap-4">
       
      <button
        onClick={handleComplete}
        className="px-6 py-3 rounded-2xl bg-green-500 hover:bg-green-600 transition font-semibold"
      >
        Mark Completed
      </button>

      <button
        onClick={handleCancel}
        className="px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 transition font-semibold"
      >
        Cancel Event
      </button>

    </div>

  );

}