import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import ScalarApiReference from "@scalar/fastify-api-reference";
import { fastify } from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
	origin: process.env.CLIENTS_URL?.split(",") ?? "http://localhost:8080",
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "RFID Manager Park API",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(ScalarApiReference, {
	routePrefix: "/docs",
});

app.get("/", async () => {
	return "Server running!";
});

const PORT = 3333;
app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
	console.log(`Server running on http://localhost:${PORT}`);
	console.log(`Docs in http://localhost:${PORT}/docs`);
});
