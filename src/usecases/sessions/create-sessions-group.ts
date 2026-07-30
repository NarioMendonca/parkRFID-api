import { InvalidResourceError } from "@/errors/InvalidResourceError.js";
import { PrismaSessionsRepository } from "@/repositories/prisma-sessions-repository.js";

type SessionGroupDTO = {
	responsibleCpf: string;
	responsiblePhoneNumber: string;
};

export class CreateSessionGroupUseCase {
	private sessionsRepository = new PrismaSessionsRepository();

	async handle({
		responsibleCpf,
		responsiblePhoneNumber,
	}: SessionGroupDTO): Promise<SessionGroupDTO> {
		if (responsibleCpf.length !== 11) {
			throw new InvalidResourceError("Invalid responsible cpf");
		}

		const sessionGroup = await this.sessionsRepository.createSessionGroup({
			responsibleCpf,
			responsiblePhoneNumber,
		});

		return sessionGroup;
	}
}
