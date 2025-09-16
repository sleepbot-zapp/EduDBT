"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image"

export default function Home() {
  const { data: session } = useSession()

  if (session) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-900 text-gray-100">
        <div className="bg-gray-800 shadow-xl rounded-2xl p-8 text-center max-w-sm w-full">
          <Image
            src={session.user?.image || "/avatar.png"}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full mx-auto mb-4 border-2 border-gray-700"
          />
          <h2 className="text-xl font-semibold mb-2">
            Welcome, {session.user?.name}
          </h2>
          <p className="text-gray-400 mb-6">{session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white font-medium py-2 px-4 rounded-lg"
          >
            Sign out
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="flex h-screen items-center justify-center bg-gray-900 text-gray-100">
      <div className="bg-gray-800 shadow-xl rounded-2xl p-8 text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>
        <p className="text-gray-400 mb-6">Sign in to continue</p>
        <button
          onClick={() => signIn("google")}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.8 33.7 29.4 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.3 0 6.4 1.2 8.7 3.3l5.7-5.7C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.3-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.3 16.2 18.8 13 24 13c3.3 0 6.4 1.2 8.7 3.3l5.7-5.7C34.6 5.1 29.6 3 24 3c-7.7 0-14.4 4.4-17.7 10.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 45c5.3 0 10.2-2 13.9-5.4l-6.4-5.5c-2.1 1.6-4.8 2.5-7.5 2.5-5.4 0-9.9-3.3-11.6-8l-6.7 5.1C9.6 40.6 16.3 45 24 45z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1 2.9-3 5.2-5.6 6.7l.1.1 6.4 5.5c-.5.5 7.8-5.7 7.8-16.3 0-1.2-.1-2.3-.4-3.5z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </main>
  )
}