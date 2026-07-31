import type { FastifyInstance } from "fastify";
import { createSessionRoute } from "./create-session.route.js";

export async function sessionsRoutes(app: FastifyInstance) {
	app.register(createSessionRoute);
}
