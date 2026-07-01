import { Router } from "express";
 import { sendMessage,getChats,getMessages,deleteChats } from "../controllers/chat.controller.js";
 import { authAcessUser } from "../middlewares/auth.middleware.js";
const chatRouter=Router()


chatRouter.post("/message",authAcessUser,sendMessage)

chatRouter.get("/",authAcessUser,getChats)

chatRouter.get("/:chatId/messages",authAcessUser,getMessages)

chatRouter.delete("/deleteChat/:chatId",authAcessUser,deleteChats)

export default chatRouter
