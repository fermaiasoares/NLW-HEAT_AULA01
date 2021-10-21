import prismaClient from "../prisma";

class GetLastMessagesService {
    async execute() {
        const limitMessages = parseInt(process.env.LIMIT_MESSAGES) || 3;

        const messages = await prismaClient.message.findMany({
            take: limitMessages,
            orderBy: {
                created_at: 'desc'
            },
            include: {
                user: true,
            }
        })

        return messages;
    }
}

export { GetLastMessagesService }
