import type { FastifyInstance } from "fastify";
import { createMenuItemRoute } from "./create-menu-item.route.js";
import { fetchMenuItemsRoute } from "./fetch-menu-items.route.js";

export async function menuItemsRoutes(app: FastifyInstance) {
	app.register(fetchMenuItemsRoute);
	app.register(createMenuItemRoute);
}
