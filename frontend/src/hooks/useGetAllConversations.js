import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import useConversation from "../zustand/useConversation";

const useGetAllConversations = () => {
	
	const [setLoading] = useState(false);

    const [allConversations, setAllConversations] = useState([]);
	const {messages} = useConversation();
	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/conversation`,{
					method:"GET",
					credentials: "include", 
					headers:{"Content-Type":"application/json"},
				});
				const data = await res.json();
                setAllConversations(data);
              
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, [messages]);
	return {
        allConversations,
        setAllConversations
		
	 };
};
export default useGetAllConversations;