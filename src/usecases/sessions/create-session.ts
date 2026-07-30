import { Decimal } from "decimal.js";
import { AlreadyExistsError } from "@/errors/AlreadyExistsError.js";
import { NotFoundError } from "@/errors/NotFoundError.js";
import { PrismaSessionsRepository } from "@/repositories/prisma-sessions-repository.js";

type CreateSessionInput = {
	sessionGroupId: string;
	braceletId: string;
	checkinDate: Date;
	sessionType: "NORMAL" | "KID";
};

export class CreateSessionUseCase {
	private prismaSessionsRepository = new PrismaSessionsRepository();

	async handle({
		braceletId,
		sessionGroupId,
		checkinDate,
		sessionType,
	}: CreateSessionInput) {
		const searchedSession =
			await this.prismaSessionsRepository.findActiveSessionByBraceletId(
				braceletId,
			);
		if (searchedSession) {
			throw new AlreadyExistsError(
				"Session active already exists in this bracelet",
			);
		}

		const searchedGroup =
			await this.prismaSessionsRepository.findSessionGroupById(sessionGroupId);
		if (!searchedGroup) {
			throw new NotFoundError(
				"Session Group to register bracelet session not found",
			);
		}

		const session = await this.prismaSessionsRepository.createSession({
			braceletId,
			checkinDate,
			checkoutDate: null,
			total: new Decimal("0"),
			sessionType,
			status: "OPEN",
			sessionsGroupId: sessionGroupId,
		});
		return session;
	}
}
