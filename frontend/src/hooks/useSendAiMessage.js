import { useState } from "react";
import useConversation from "../zustand/useConversation";



const useSendAiMessage = () => {
  const [loading, setLoading] = useState(false);
  const { setSelectedAiConversation } = useConversation();
 
  
  const sendMessage = async ({ question, answer, img }) => {
   
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai-chats`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
        credentials: "include",
        body: JSON.stringify({ question, answer, img }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to send message.");
      }
     
      setSelectedAiConversation(data);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendAiMessage;
