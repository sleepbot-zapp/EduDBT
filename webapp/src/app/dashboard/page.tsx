'use client'

import { useEffect, useState } from 'react'
import { getSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import { fetchUser, sendUserToDB, updateUser, User } from '@/services/user-service'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<User>>({})

  useEffect(() => {
    const initializeUser = async () => {
      const session = await getSession()
      if (!session?.user?.email) return

      try {
        await sendUserToDB()
        const data = await fetchUser(session.user.email)
        setUser(data)
        setFormData(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    initializeUser()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    if (!user?.email) return
    try {
      const updated = await updateUser({ ...formData, email: user.email })
      setUser(updated)
      setFormData(updated)
      setEditing(false)
    } catch (err) {
      console.error("Update error:", err)
      alert("Failed to update profile")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white bg-gray-900">
        Loading...
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-white bg-gray-900">
        User not found
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-950 flex flex-col justify-between">
        <div>
          <div className="p-6 text-center border-b border-gray-700">
            {user.image && (
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            )}
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-4">
              <li className="hover:bg-gray-800 rounded px-3 py-2 cursor-pointer">Dashboard</li>
              <li className="hover:bg-gray-800 rounded px-3 py-2 cursor-pointer">Profile</li>
              <li className="hover:bg-gray-800 rounded px-3 py-2 cursor-pointer">Settings</li>
            </ul>
          </nav>
        </div>

        {/* Logout */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto bg-gray-900">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}</h1>

        <div className="bg-gray-800 shadow rounded-lg p-6 max-w-md">
          <h3 className="text-lg font-semibold mb-4">Profile Information</h3>

          {editing ? (
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="state"
                value={formData.state || ''}
                onChange={handleChange}
                placeholder="State"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="college"
                value={formData.college || ''}
                onChange={handleChange}
                placeholder="College"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-3 mt-3">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(false)
                    setFormData(user)
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {user.name}</p>
              <p><span className="font-medium">Phone:</span> {user.phone || 'N/A'}</p>
              <p><span className="font-medium">State:</span> {user.state || 'N/A'}</p>
              <p><span className="font-medium">College:</span> {user.college || 'N/A'}</p>
              <button
                onClick={() => setEditing(true)}
                className="mt-3 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
        <div className="bg-gray-800 shadow rounded-lg p-6 max-w-md mt-6">
          <h3 className="text-lg font-semibold mb-4">Financial Information</h3>

          {editing ? (
            <div className="space-y-3">
              <input
                type="text"
                name="aadhaar"
                value={formData.aadhaar || ""}
                onChange={handleChange}
                placeholder="Aadhaar Number"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="bankAccount"
                value={formData.bankAccount || ""}
                onChange={handleChange}
                placeholder="Bank Account Number"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-3 mt-3">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditing(false)
                    setFormData(user)
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p><span className="font-medium">Aadhaar:</span> {user.aadhaar || 'N/A'}</p>
              <p><span className="font-medium">Bank Account:</span> {user.bankAccount || 'N/A'}</p>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}
