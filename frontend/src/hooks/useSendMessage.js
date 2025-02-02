import { useState } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const {messages,setMessages, selectedConversation} = useConversation();
    const sendMessage = async (message,img) => {
        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/send/${selectedConversation._id}`,{
                method:"POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body:JSON.stringify({message,img})
            })
            const data = await res.json();
            if(data.error) throw new Error(data.error);
            setMessages([...messages, data]);
          
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {loading, sendMessage}

}

export default useSendMessage