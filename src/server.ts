import { fastify } from "fastify";

const app = fastify();

app.get("/", async () => {
	return "Server running!";
});

const PORT = 3333;
app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
	console.log(`Server running on http://localhost:${PORT}`);
});
