import { Hono } from 'hono'

const user = new Hono()

user.post('/', async (c) => {
  const { email } = await c.req.json()
  if (!email) return c.json({ error: 'Email required' }, 400)

  const goRes = await fetch('http://localhost:3200/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  if (!goRes.ok) {
    const err = await goRes.json()
    return c.json(err, goRes.status)
  }

  const userData = await goRes.json()
  return c.json(userData)
})

export default user

