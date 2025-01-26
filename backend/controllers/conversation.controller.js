import Conversation from '../models/conversation.model.js';

export const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find(); 
        res.status(200).json(conversations); 
    } catch (error) {
      
        res.status(500).json({ message: "Internal server error" });
    }
};
