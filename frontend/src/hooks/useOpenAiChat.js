import { useState } from "react";



const useOpenAiChat = () => {
	const [loading, setLoading] = useState(false);
	const [aiConversation, setAiConversation] = useState([]);
  
	const OpenAiChat = async () => {
	  setLoading(true);
	  try {
		const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai-chats`, {
		  method: "GET",
		  credentials: "include", 
		  headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		if (data.error) {
		  throw new Error(data.error);
		}
		setAiConversation(data);
		return data; 
	  } catch (error) {
		toast.error(error.message);
		return []; 
	  } finally {
		setLoading(false);
	  }
	};
  
	return { aiConversation, OpenAiChat, loading };
  };
  
  export default useOpenAiChat;
  