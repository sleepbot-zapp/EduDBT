import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const honoRes = await fetch("http://localhost:3100/send-to-db", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: session.user?.name,
        email: session.user?.email,
        image: session.user?.image,
      }),
    });

    const data = await honoRes.json();

    return new Response(JSON.stringify({ success: true, honoResponse: data }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to send user data" }), { status: 500 });
  }
}
