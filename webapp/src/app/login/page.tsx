"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignUp) {
      console.log("Sign Up ->", { name, email, password })
    } else {
      console.log("Sign In ->", { email, password })
    }
  }

  return (
    <main className="flex h-screen bg-gray-900 text-gray-100">
      {/* Left Section: Auth Form */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-gray-800 shadow-xl rounded-2xl p-8 max-w-md w-full">
          {/* Toggle Tabs */}
          <div className="relative flex mb-6 border-b border-gray-700">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 text-center font-medium transition-colors relative z-10 ${
                !isSignUp ? "text-blue-400" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 text-center font-medium transition-colors relative z-10 ${
                isSignUp ? "text-blue-400" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Sign Up
            </button>

            {/* Animated Highlight */}
            <motion.div
              className="absolute bottom-0 left-0 w-1/2 h-[2px] bg-blue-500"
              initial={false}
              animate={{ x: isSignUp ? "100%" : "0%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          {/* Animated Heading */}
          <div className="h-10 mb-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={isSignUp ? "signup-heading" : "signin-heading"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-center"
              >
                {isSignUp ? "Create Account" : "Welcome Back"}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Google Sign In */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full bg-white text-gray-800 font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
          >
            {/* Google Logo */}
            <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
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
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-700"></div>
            <span className="px-3 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-700"></div>
          </div>

          {/* Animated Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4 relative">
            <AnimatePresence mode="wait">
              {isSignUp ? (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-2 px-4 rounded-lg"
                  >
                    Sign Up
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="signin"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-2 px-4 rounded-lg"
                  >
                    Sign In
                  </button>
                  <div className="flex justify-end">
                    <Link href="/" className="text-xs text-blue-500 underline">
                      Forgot Password?
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>

      {/* Right Section: Logo / Illustration */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gray-950">
        {/* Replace with your logo/illustration */}
        <h1 className="text-4xl font-extrabold text-blue-500">Your Logo</h1>
      </div>
    </main>
  )
}
