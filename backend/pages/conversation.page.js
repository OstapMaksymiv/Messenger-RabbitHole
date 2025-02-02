import express from 'express'
import {getConversations } from '../controllers/conversation.controller.js'
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();
router.get("/",getConversations)
export default router