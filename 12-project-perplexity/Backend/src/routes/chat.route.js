import { Router } from "express";
 import { sendMessage } from "../controllers/chat.controller.js";
 import { authAcessUser } from "../middlewares/auth.middleware.js";
const chatRouter=Router()


chatRouter.post("/message",authAcessUser,sendMessage)

export default chatRouter
