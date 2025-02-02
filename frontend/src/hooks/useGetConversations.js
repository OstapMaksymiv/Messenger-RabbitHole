import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";

const useGetConversations = () => {
	
	const [loading, setLoading] = useState(false);
	const {authUser} = useAuthContext();
	const [conversations, setConversations] = useState([]);
	const [filteredConversations, setFilteredConversations] = useState([]);
	const [savedChats , setSavedChats] = useState([]);
	const {messages} = useConversation();
	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`,{
                    method:"GET",
                    credentials: "include", 
                    headers: {
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
                });
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
		
				
			
				const res2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/conversation`,{
					method:"GET",
					credentials: "include", 
					headers: {
						"Authorization": `Bearer ${localStorage.getItem("token")}`
					}
				});
				const newData = await res2.json();
				const convWithTalk = data.filter((user) =>
				newData.some(
				  (conv) =>
					conv.participants.includes(user._id) &&
					conv.participants.includes(authUser._id)
				)
			  );
	  
			  setSavedChats(convWithTalk); 
			  setFilteredConversations(convWithTalk);
			 
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, [messages]);
	return {
		savedChats,
		loading,
		conversations,
		setConversations,
		filteredConversations,
		setFilteredConversations,
		
	 };
};
export default useGetConversations;