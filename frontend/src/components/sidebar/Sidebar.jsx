import React, { useState,useEffect,useRef } from "react";

import gsap from "gsap";
import Flip from "gsap/Flip";
import { FiSearch } from "react-icons/fi";
import './sidebar.css'
import toast from "react-hot-toast";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import { getRandomEmoji } from "../../utils/emoji";
import Conversation from "./Conversation";
import useOpenAiChat from "../../hooks/useOpenAiChat";
import { useAuthContext } from "../../context/AuthContext";

gsap.registerPlugin(Flip);
const Sidebar = () => {
	const [search, setSearch] = useState("");
	const {authUser} = useAuthContext();

	const {selectedConversation, setSelectedConversation,selectedAiConversation,setSelectedAiConversation } = useConversation();
	const { conversations, setFilteredConversations,filteredConversations,loading,savedChats } = useGetConversations();
	const [emojiMap, setEmojiMap] = useState({});
	const itemsRef = useRef([]);
	const {aiConversation, OpenAiChat} = useOpenAiChat();

	useEffect(() => {
		
		const newEmojiMap = {};
		conversations.forEach((conv) => {
		  if (!emojiMap[conv._id]) {
			newEmojiMap[conv._id] = getRandomEmoji();
		  }
		});
		setEmojiMap((prev) => ({ ...prev, ...newEmojiMap }));
	  }, [conversations]);
	const handleChangeSearchedPerson = (e) => {
	  const query = e.target.value.trim().toLowerCase();
	  setSearch(query);
  
	  if (!query) {
		setFilteredConversations(savedChats); 
	
		return;
	  }
  
	  const newConversations = conversations.filter((conv) =>
		conv.username.toLowerCase().includes(query)
	  );
  
	  setFilteredConversations(newConversations); 
  
	  if (newConversations.length === 0) {
		toast.error("No such user found!");
	  }
	};

	const handleOpenAiChat = async () => {
		const data = await OpenAiChat(); 
		setSelectedAiConversation(data); 
		setSelectedConversation(null);
	}
	const sidebar = useRef();
	
	useEffect(() => {
		const handleResize = () => {
			 if(window.innerWidth < 540){
				if((selectedConversation && !selectedAiConversation) || (selectedAiConversation && !selectedConversation) ){
					sidebar.current.style.width='0px'
				
	
	
				}
				else{
				
					sidebar.current.style.width='300px'
					
				
				}
			}
			else if(window.innerWidth < 1010){
				if((selectedConversation && !selectedAiConversation) || (selectedAiConversation && !selectedConversation) ){
					sidebar.current.style.width='0px'
					


				}
				else{
					
					sidebar.current.style.width='400px'
			
				
				}
				
			}
			else{
				if((selectedConversation && !selectedAiConversation) || (selectedAiConversation && !selectedConversation) ){
					sidebar.current.style.width='auto'
					


				}
				else{
					
					sidebar.current.style.width='auto'
			
				
				}
				
			}
		};
		handleResize()
		
		window.addEventListener('resize', handleResize);
	
	
		return () => {
		  window.removeEventListener('resize', handleResize);
		};
	  }, [selectedConversation,selectedAiConversation]);
  return (
		
		<div  ref={sidebar} className='border-r-2  border-l-2 items-center overflow-hidden  flex flex-col sidebar' style={{borderColor:'#2C2831'}}>
			
			<div className={`flex gap-2 items-center px-3 w-full  pt-3  pb-1`} style={{
				borderBottom:'solid 2px rgba(44, 40, 49, 0.5)',
				paddingBottom:'0.69rem'
			}} >
			
				<div className={`avatar`}>
					<div className='w-12 rounded-full'>
						<img
							src={authUser.profilePic || '/noavatar.jpg'}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex  items-start flex-col'>
						<p className='font-bold text-gray-200'>{authUser.fullName.length > 12 ? `${authUser.fullName.slice(0,12)}...` : authUser.fullName}</p>
						<span className='opacity-50 text-xs'>{authUser.profilePic.match(/boy|girl/)[0] === 'boy' ? 'Male' : 'Female' }</span>
					</div>
				</div>
			</div>
		
			<div className="flex my-1 items-center gap-2 relative " style={{width:'90%'}}>
				<input
					type="text"
					className="search"
					placeholder="Search people…"
	
					value={search}
					onChange={handleChangeSearchedPerson}
				/>
				<FiSearch  style={{position:'absolute', opacity:'0.5',top:'27%', width:'20px',height:'20px'}} />
			</div>
	
			<div  style={{width:'100%',height:'3px',backgroundColor:'rgba(44, 40, 49, 0.5)'}}></div>

			<div className=' py-2 w-full	 flex flex-col  overflow-y-auto overflow-x-hidden'>



			<div className={`flex gap-2 items-center hover:bg-[rgb(34,36,86)] rounded px-4 ${selectedAiConversation && "bg-[rgb(34,36,86)]"}  py-1 cursor-pointer `} onClick={handleOpenAiChat} >
				<div className={`avatar `}>
					<div className='w-12 rounded-full'>
						<img
							src="https://avatar.iran.liara.run/public/boy?username=aiChat"
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>Ai chat</p>
						<span className='text-xl'>🤖</span>
					</div>
				</div>
			</div>
			<div className='divider my-0  h-1 py-1'></div>




				{filteredConversations.map((conv,idx) => (
	
						<Conversation  key={conv._id} conv={conv} emoji={emojiMap[conv._id]} lastIdx={idx === filteredConversations.length - 1} />
					
				))}
				{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
			</div>
			
			
		</div>
  )
}

export default Sidebar