import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './pages/auth.page.js'
import messageRouter from './pages/message.page.js'
import userRouter from './pages/user.page.js'
import conversationRouter from './pages/conversation.page.js'
import ImageKit from 'imagekit';
import AiChatRouter from './pages/aiChat.page.js'
import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';

dotenv.config();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
  });
app.get("/api/upload",(req,res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})
app.use(express.json())
app.use(cookieParser());
app.use("/api/auth",authRouter)
app.use("/api/messages",messageRouter)
app.use("/api/users",userRouter)
app.use("/api/conversation",conversationRouter)
app.use("/api/ai-chats",AiChatRouter)
const port = process.env.PORT || 3400;

server.listen(port, () => {
    connectToMongoDB();
    console.log("Server was started1");
})