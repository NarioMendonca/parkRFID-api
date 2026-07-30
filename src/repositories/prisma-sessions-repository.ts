import { prisma } from "@/lib/prisma.js";
import type { Prisma, Session } from "../../generated/prisma/client.js";

export class PrismaSessionsRepository {
	async findActiveSessionByBraceletId(braceletId: string) {
		const session = await prisma.session.findFirst({
			where: {
				braceletId,
				status: "OPEN",
			},
		});

		return session;
	}

	async findSessionByBraceletId(braceletId: string) {
		const session = await prisma.session.findFirst({
			where: {
				braceletId,
			},
		});

		return session;
	}

	async findSessionGroupById(id: string) {
		const sessionGroup = await prisma.sessionsGroup.findFirst({
			where: {
				id,
			},
		});

		return sessionGroup;
	}

	async createSessionGroup({
		responsibleCpf,
		responsiblePhoneNumber,
	}: Prisma.SessionsGroupCreateInput) {
		const sessionGroup = await prisma.sessionsGroup.create({
			data: {
				responsibleCpf,
				responsiblePhoneNumber,
			},
		});

		return sessionGroup;
	}

	async createSession({
		braceletId,
		checkinDate,
		sessionsGroupId,
		total,
		sessionType,
	}: Prisma.SessionUncheckedCreateInput) {
		const session = await prisma.session.create({
			data: {
				braceletId,
				checkinDate,
				total,
				sessionType,
				sessionsGroupId,
			},
		});

		return session;
	}

	async closeSession(braceletId: string) {
		console.log(braceletId);
		const session =
			await prisma.$queryRaw<Session>`UPDATE Session SET checkoutDate = DATETIME('now'), STATUS = 'CLOSE' WHERE braceletId = ${braceletId} AND status = 'OPEN' RETURNING *`;

		return session;
	}
}
