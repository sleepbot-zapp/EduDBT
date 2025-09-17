import { Hono } from "hono";
import { cors } from "hono/cors";
import { errorHandler } from "@/middleware/error-handler";
import { env } from "@/env"
import sendToDb from "@/routes/user-routes/send-user-to-db";
import user from "@/routes/user-routes/get-user-from-db";
import updateUser from "@/routes/user-routes/update-user";

const app = new Hono();

app.onError(errorHandler);

app.use("*", cors());

app.get("/", async (c) => c.text("Hono Gateway up 🚀"));
app.route("/send-to-db", sendToDb);
app.route('/get-user', user)
app.route("/update-user", updateUser)

export default {
  port: env.PORT,
  fetch: app.fetch,
};
