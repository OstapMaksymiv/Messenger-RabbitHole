import React, { useEffect,useRef } from 'react'
import Messages from './Messages'
import AiMessages from '../aiMessageContainer/AiMessages'
import AiMessageInput from '../aiMessageContainer/AiMessageInput'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti";
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

import { FaLongArrowAltLeft } from "react-icons/fa";
const MessageContainer = () => {
	const {selectedConversation,setSelectedConversation,selectedAiConversation,setSelectedAiConversation} = useConversation()
	
	const  messageContainer = useRef();
	
	useEffect(() =>{
		
		return () => setSelectedConversation(null);
	},[setSelectedConversation])

	const openSidebar = useRef();
	const handleLeaveConv = () => {
		setSelectedConversation(null)
		setSelectedAiConversation(null)
	}
	useEffect(() => {
		const handleResize = () => {
			if(window.innerWidth < 1010){
				if((selectedConversation && !selectedAiConversation) || (selectedAiConversation && !selectedConversation) ){
					messageContainer.current.style.display = 'flex'
				}
				else{
					messageContainer.current.style.display = 'none'
				}
			
			}
			else{
			
					messageContainer.current.style.display = 'flex'
				
		
			}
		};
		handleResize()

		window.addEventListener('resize', handleResize);
	
	
		return () => {
		  window.removeEventListener('resize', handleResize);
		};
	  }, [selectedConversation, selectedAiConversation]);
  return (
		<div ref={messageContainer} className='md:min-w-[450px] flex flex-col message-container' style={{transition:'0.5s ease-in-out'}}>
            {(!selectedConversation && !selectedAiConversation) ? <NoChatSelected/> : (selectedConversation && !selectedAiConversation) ? (
			<>
		
				<div className='px-4  pt-3   mb-2' style={{
						
						borderBottom:'solid 2px rgba(44, 40, 49, 0.5)',
						paddingBottom:'0.69rem'
					}}>
					<div className={`flex gap-2 items-center`} >
					<FaLongArrowAltLeft ref={openSidebar} className='w-6 h-6 text-white cursor-pointer' onClick={handleLeaveConv}  />
					<div style={{height:'34px',width:'2px',backgroundColor:'rgb(44, 40, 49)'}}></div>
							<div className={`avatar`}>
								<div className='w-12 rounded-full'>
									<img
										src={selectedConversation.profilePic || '/noavatar.jpg'}
										alt='user avatar'
									/>
								</div>
							</div>

							<div className='flex flex-col flex-1'>
								<div className='flex  items-start flex-col'>
									<p className='font-bold text-gray-200'>{selectedConversation.fullName}</p>
									<span className='opacity-50 text-xs'>{selectedConversation.gender.charAt(0).toUpperCase() + selectedConversation.gender.slice(1)}</span>
								</div>
							</div>
						</div>
				</div>

				<Messages />
				<MessageInput />
			</>
            ) : (
				<>
					<div className=' px-4  pt-3   mb-2' style={{
						
						borderBottom:'solid 2px rgba(44, 40, 49, 0.5)',
						paddingBottom:'0.69rem'
					}}>
						<div className={`flex gap-2 items-center`} >
						<FaLongArrowAltLeft ref={openSidebar} className='w-6 h-6 text-white cursor-pointer' onClick={handleLeaveConv}  />
						<div style={{height:'34px',width:'2px',backgroundColor:'rgb(44, 40, 49)'}}></div>
							<div className={`avatar`}>
								<div className='w-12 rounded-full'>
									<img
										src={'https://avatar.iran.liara.run/public/boy?username=aiChat' || '/noavatar.jpg'}
										alt='user avatar'
									/>
								</div>
							</div>

							<div className='flex flex-col flex-1'>
								<div className='flex  items-start flex-col'>
									<p className='font-bold text-gray-200'>RabbitHole AI</p>
									<span className='opacity-50 text-xs'>Total Messages: {selectedAiConversation.history.length}</span>
								</div>
							</div>
						</div>
						
					</div>
					<div className='px-4 flex-1 overflow-x-hidden '>
						<AiMessages/>
					</div>
						<AiMessageInput />
				</>
			)}
		</div>
  )
}

export default MessageContainer

const NoChatSelected = () => {
	const  {authUser} = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 {authUser.fullName.length > 12 ? `${authUser.fullName.slice(0,12)}...` : authUser.fullName}</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};