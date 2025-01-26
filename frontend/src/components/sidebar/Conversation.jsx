import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';

const Conversation = ({conv,emoji,lastIdx}) => {
	const {selectedConversation,setSelectedConversation,selectedAiConversation,setSelectedAiConversation} = useConversation();
	const isSelected = selectedConversation?._id === conv._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conv._id);
	const handleClick = () => {
		setSelectedConversation(conv)
		setSelectedAiConversation(null);
	}
	return (
		<>
			<div className={`flex gap-2 items-center px-3 hover:bg-sky-500 rounded  py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`} onClick={handleClick}>
				<div className={`avatar ${isOnline ? "online" : ''}`}>
					<div className='w-12 rounded-full'>
						<img
							src={conv.profilePic || '/noavatar.jpg'}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conv.fullName.length > 12 ? `${conv.fullName.slice(0,12)}...` : conv.fullName}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>
			{!lastIdx && <div className='divider my-0 py-1 h-1'  />}
			
		</>
	);
};

export default Conversation