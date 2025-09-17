"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our App 🚀</h1>
      <p className="mb-4 text-lg text-gray-300">
        This is the landing page. Please log in to continue.
      </p>
      <button
        onClick={goToLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
      >
        Go to Login
      </button>
    </main>
  );
}
