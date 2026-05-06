import express from "express";
import {
     getAllContacts,
     getMessagesByUserId,
     sendMessage,
     getChatPartners } from "../contollers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";


const router = express.Router();

// the middleware execute in order, so first arcjetProtection will run and then protectRoute

router.use(arcjetProtection, protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

export default router;