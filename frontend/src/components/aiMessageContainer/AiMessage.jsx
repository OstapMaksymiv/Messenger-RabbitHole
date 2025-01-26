import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { extractTime } from '../../utils/extratTime';
import Markdown from 'react-markdown';
import { IKImage } from 'imagekitio-react';
const Message = ({message}) => {
	const  {authUser} = useAuthContext();

	const fromMe = message.role === 'user';
	const chatClassName = fromMe ? 'chat-end' : 'chat-start'
	const profilePic = fromMe ? authUser.profilePic : 'https://avatar.iran.liara.run/public/boy?username=aiChat';
	const bubbleBgColor = fromMe ? 'rgba(34, 36, 86, 0.5)' : "rgba(255, 255, 255, 0.1)";
	const formattedTime  = extractTime(message.createdAt)
	const textSide = fromMe ? 'text-start' : 'text-left';
	const shakeClass = message.shouldShake ? 'shake-booty' : '';
	const textColor = fromMe ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.7)';
	
  return (
	<>
	{message.img && ( 
		<IKImage urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT} className='my-4 message-img' path={message.img}  height="250" width="300" transformation={[{height:250, width:300}]} loading='lazy' lqip={{active:true, quality:100}} />
	)}
    <div className={`chat  ${chatClassName} ms  ${textSide}`} >
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component'  src={profilePic || '/noavatar.jpg'} />
				</div>
			</div>
			{message.parts[0].text && <div style={{color:textColor,backgroundColor:bubbleBgColor}} className={`chat-bubble  ${shakeClass} text-wrap pb-2`}><Markdown>{message.parts[0].text}</Markdown></div>}
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
	</div>
	
	</>
  )
}

export default Message