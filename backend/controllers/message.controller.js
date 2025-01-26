import Conversation from '../models/conversation.model.js'
import Message from '../models//message.model.js'
import { getReceiverSocketId, io } from "../socket/socket.js";
export const sendMessage = async (req,res) => {
    try {
        const {message,img} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
          });
          if (!conversation) {
            conversation = await Conversation.create({
              participants: [senderId, receiverId],
              messages: [],
            });
          }
        const newMessage = new Message({
           senderId,
           receiverId,
           message,
           img

        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        await Promise.all(
            [
                conversation.save(),
                newMessage.save()
            ]
        )
        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
		
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

      
        res.status(201).json(newMessage);
    } catch (error) {
       
        res.status(500).json({message:"Internal server error"})
    }
}
export const getMessages = async (req,res) => {
     try {
        const userToChatId = req.params.id;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages");
        if(!conversation) return res.status(200).json([])
        const messages = conversation.messages
        res.status(200).json(messages)

     } catch (error) {
       
        res.status(500).json({message:"Internal server error"})
     }
}