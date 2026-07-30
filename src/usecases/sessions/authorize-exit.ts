import { NotFoundError } from "@/errors/NotFoundError.js";
import { PrismaSessionsRepository } from "@/repositories/prisma-sessions-repository.js";

type AuthorizeExitInput = {
	braceletId: string;
};

type AuthorizeExitOutput = {
	allowed: boolean;
};

export class AuthorizeExitUseCase {
	private prismaSessionsRepository = new PrismaSessionsRepository();

	async handle({
		braceletId,
	}: AuthorizeExitInput): Promise<AuthorizeExitOutput> {
		const sessionToAuthorize =
			await this.prismaSessionsRepository.findActiveSessionByBraceletId(
				braceletId,
			);
		if (!sessionToAuthorize) {
			throw new NotFoundError("Session to authorize not found");
		}

		if (sessionToAuthorize.status === "CLOSED") {
			return {
				allowed: true,
			};
		}

		if (sessionToAuthorize.total.equals("0")) {
			await this.prismaSessionsRepository.closeSession(braceletId);
			return {
				allowed: true,
			};
		}

		return {
			allowed: false,
		};
	}
}
