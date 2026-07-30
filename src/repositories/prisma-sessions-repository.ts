import { prisma } from "@/lib/prisma.js";
import type { Prisma } from "../../generated/prisma/client.js";

export class PrismaSessionsRepository {
	async findSessionByBraceletId(braceletId: string) {
		const session = await prisma.session.findFirst({
			where: {
				braceletId,
				status: "OPEN",
			},
		});

		return session;
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
		sessionGroup,
		total,
		sessionType,
	}: Prisma.SessionCreateInput) {
		const session = await prisma.session.create({
			data: {
				braceletId,
				checkinDate,
				total,
				sessionType,
				sessionGroup,
			},
		});

		return session;
	}
}
