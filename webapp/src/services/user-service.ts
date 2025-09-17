export interface User {
  id: number
  name: string
  email: string
  image: string
  phone?: string
  state?: string
  college?: string
  aadhaar?: string
  bankAccount?: string
}

export async function sendUserToDB(): Promise<void> {
  const res = await fetch("/api/send-user", { method: "POST" })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.error || "Failed to send user to DB")
  }
}

export async function fetchUser(email: string): Promise<User> {
  const res = await fetch("http://localhost:3100/get-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
  if (!res.ok) throw new Error("Failed to fetch user")
  return res.json()
}

export async function updateUser(userData: Partial<User>): Promise<User> {
  const res = await fetch("http://localhost:3100/update-user", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.error || "Failed to update user")
  }
  return res.json()
}
