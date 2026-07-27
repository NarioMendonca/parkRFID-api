import { fastify } from "fastify";
import { sayHello } from "@/funcao.js";

const app = fastify();

app.get("/", () => {
	return sayHello();
});

const PORT = 3333;
app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
	console.log(`Server running on http://localhost:${PORT}`);
});
