"use client";

import { useRouter } from "next/navigation";

export default function ApproveClubButton(
  {
    clubId,
  }: {
    clubId: string
  }
) {

  const router = useRouter();

  async function approveClub() {

    const response = await fetch(
      `/api/clubs/${clubId}/approve`,
      {
        method: "PATCH",
      }
    );

    const data = await response.json();

    if (data.success) {

      alert("Club approved");

      router.refresh();

    } else {

      alert(data.message);

    }

  }

  return (
    <button
      onClick={approveClub}
      className="px-8 py-4 rounded-2xl bg-green-500 hover:bg-green-600 transition font-semibold"
    >
      Approve Club
    </button>
  );

}