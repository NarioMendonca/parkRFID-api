import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { CreateSessionUseCase } from "@/usecases/sessions/create-session.js";
import { createSessionSchema } from "../schemas/create-session.schema.js";

const createSessionUseCase = new CreateSessionUseCase();

export async function createSessionRoute(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.post(
			"/checkin",
			{ schema: createSessionSchema },
			async (request, reply) => {
				const { braceletId, sessionGroupId, sessionType } = request.body;
				const createdSession = await createSessionUseCase.handle({
					braceletId,
					sessionGroupId,
					sessionType,
				});

				const session = {
					...createdSession,
					total: createdSession.total.toString(),
				};

				reply.status(200).send({ session, message: "Succesfully created" });
				return;
			},
		);
}
