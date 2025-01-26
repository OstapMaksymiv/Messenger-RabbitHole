import aiConversation from "../models/aiconversation.model.js";

export const createAiChat = async (req, res) => {
    const userId = req.user._id;
  
    try {
     
      let aiChat = await aiConversation.findOne({ userId });
  
      if (!aiChat) {
     
        aiChat = new aiConversation({
          userId: userId,
          history: [], 
        });
  
        await aiChat.save();
      }
  
    
      res.status(200).json(aiChat);
    } catch (err) {
      console.error("Error in createAiChat:", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
export const getAiMessages = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const chat = await aiConversation.findOne({ userId });
  
      if (!chat) {
        return res.status(404).json({ message: "AI chat not found" });
      }
  
      res.status(200).json(chat);
    } catch (err) {
      console.error("Error getting AI messages:", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  export const sendAiMessage = async (req, res) => {
    const userId = req.user._id; 
    const { question, answer, img } = req.body;
    

      const userMessage = (question || img)
      ? { role: "user", parts: [{ text: question }], ...(img && { img }) }
      : null;
    
    const modelMessage = answer
      ? { role: "model", parts: [{ text: answer }] }
      : null;
    
    const newItems = [userMessage, modelMessage].filter((item) => item !== null);
    
    try {
      if (newItems.length === 0) {
        return res.status(400).json({ message: "No valid messages to save" });
      }
  
      const updatedAiConversation = await aiConversation.findOneAndUpdate(
        { userId },
        {
          $push: {
            history: {
              $each: newItems,
            },
          },
        },
        { new: true } // Повертаємо оновлений документ
      );
  
      res.status(200).send(updatedAiConversation);
    } catch (err) {
      console.error("Error in sendAiMessage:", err.message);
      res.status(500).send("Error adding conversation!");
    }
  };
  
  
