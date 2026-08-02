import type { FastifyInstance } from "fastify";
import { menuItemsRoutes } from "./menu-items/menu-items-routes.js";
import { sessionsRoutes } from "./sessions/sessions-routes.js";

export async function routes(app: FastifyInstance) {
	//sessions routes
	app.register(sessionsRoutes, {
		prefix: "/sessions",
	});
	app.register(menuItemsRoutes, {
		prefix: "/menu",
	});
}
