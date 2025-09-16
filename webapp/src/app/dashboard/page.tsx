"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/send-user", { method: "POST" })
        .then((res) => res.json())
        .then((data) => console.log("Synced with backend:", data))
        .catch((err) => console.error("Sync error:", err));
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Please sign in</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome, {session?.user?.name}</h1>
      <p>Email: {session?.user?.email}</p>
    </div>
  );
}
