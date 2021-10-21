import { Router } from "express";

import { AuthenticateUserController } from "./controller/AuthenticateUserController";
import { CreateMessageController } from "./controller/CreateMessageController";
import { GetLastMessagesController } from "./controller/GetLastMessagesController";
import { ProfileUserController } from "./controller/ProfileUserController";

import { ensureAuthenticated } from './middleware/ensureAuthenticated';

const router = Router();

let authenticateUserController = new AuthenticateUserController();
let createMessageController = new CreateMessageController();
let getLastMessagesController = new GetLastMessagesController();
let profileUserController = new ProfileUserController();

router.get('/user/profile', profileUserController.handle);
router.post('/authenticate', authenticateUserController.handle);
router.post('/messages',ensureAuthenticated, createMessageController.handle);
router.get('/messages/latest', getLastMessagesController.handle);

export { router }
