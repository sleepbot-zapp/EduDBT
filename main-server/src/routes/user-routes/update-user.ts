import { Hono } from 'hono'

const updateUser = new Hono()

updateUser.put('/', async (c) => {
  const body = await c.req.json()
  console.log(body)

  const goRes = await fetch('http://localhost:3200/update-user', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const text = await goRes.text()
  try {
    const data = JSON.parse(text)
    return c.json(data, goRes.status)
  } catch {
    return c.json({ error: text }, goRes.status)
  }
})


export default updateUser;