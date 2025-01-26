import express from 'express'
import { createAiChat,sendAiMessage } from '../controllers/aiChat.controller.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();
router.get("/",protectRoute,createAiChat);

router.put("/",protectRoute,sendAiMessage);
export default router