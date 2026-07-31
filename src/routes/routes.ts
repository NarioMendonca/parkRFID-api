import type { FastifyInstance } from "fastify";
import { sessionsRoutes } from "./sessions/sessions-routes.js";

export async function routes(app: FastifyInstance) {
	//sessions routes
	app.register(sessionsRoutes, {
		prefix: "/sessions",
	});
}
