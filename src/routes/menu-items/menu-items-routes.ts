import type { FastifyInstance } from "fastify";
import { fetchMenuItemsRoute } from "./fetch-menu-items.route.js";

export async function menuItemsRoutes(app: FastifyInstance) {
	app.register(fetchMenuItemsRoute);
}
