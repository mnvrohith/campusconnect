"use client";

import { useEffect } from "react";

import { useUser } from "@clerk/nextjs";

export default function SyncUser() {

  const { isSignedIn } = useUser();

  useEffect(() => {

    async function syncUser() {

      try {

        await fetch("/api/users/sync", {
          method: "POST",
        });

      } catch (error) {
        console.log(error);
      }

    }

    if (isSignedIn) {
      syncUser();
    }

  }, [isSignedIn]);

  return null;
}