import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extratTime';
import { IKImage } from 'imagekitio-react';
import './messageStyles.css'
const Message = ({message}) => {
	const  {authUser} = useAuthContext();
	const {selectedConversation} = useConversation();
	const fromMe = message.senderId === authUser._id;
	const chatClassName = fromMe ? 'chat-end' : 'chat-start'
	const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
	const bubbleBgColor = fromMe ? 'rgba(34, 36, 86, 0.5)' : "rgba(255, 255, 255, 0.1)";
	const formattedTime  = extractTime(message.createdAt)
	const shakeClass = message.shouldShake ? 'shake-booty' : '';
	const imgClass = fromMe ? '' : 'self-end order-1';
	const textColor = fromMe ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.7)';
  return (
	<>
			{message.img && ( 
		<IKImage urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT} className={`my-4 ${imgClass} message-img`} path={message.img}  height="250" width="300" transformation={[{height:250, width:300}]}  lqip={{active:true, quality:70}} />
	)}
		<div className={`chat  ms  ${chatClassName} `} >
				<div className='chat-image avatar'>
					<div className='w-10 rounded-full'>
						<img alt='Tailwind CSS chat bubble component'  src={profilePic || '/noavatar.jpg'} />
					</div>
				</div>
				{message.message && <div style={{color:textColor,backgroundColor:bubbleBgColor}} className={`chat-bubble ${shakeClass} pb-2`}>{message.message}</div>}
				<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	
	</>
  )
}

export default Message