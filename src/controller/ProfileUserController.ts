import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserController {
    async handle(request: Request, response: Response) {
        const profileUserService = new ProfileUserService();
        const profile = await profileUserService.execute(request.user_id);
        return response.json(profile);
    }
}

export { ProfileUserController };
