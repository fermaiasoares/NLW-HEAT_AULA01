import { Request, Response } from "express";
import { GetLastMessagesService } from "../services/GetLastMessagesService";

class GetLastMessagesController {
    async handle(request: Request, response: Response) {
        const getLastMessagesService = new GetLastMessagesService();
        const messages = await getLastMessagesService.execute();
        return response.json(messages);
    }
}

export { GetLastMessagesController }
