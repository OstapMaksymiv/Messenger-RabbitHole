import {useRef,useEffect} from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessages from '../../hooks/useListenMessages';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

const Messages = () => {
  const {loading,messages} = useGetMessages();
  const {selectedConversation} = useConversation();
  const {authUser} = useAuthContext();

  useListenMessages();
	const lastMessageRef = useRef();
 
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

  const filteredMessages = messages.filter((message) => {
    return (
      (message.senderId === selectedConversation._id &&
        message.receiverId === authUser._id) ||
      (message.senderId === authUser._id &&
        message.receiverId === selectedConversation._id)
    );
  });

  return (
    <div className='px-4 flex-1 overflow-x-hidden'>
      	{!loading &&
          filteredMessages.length > 0 &&
          filteredMessages.map((message) => (
            <div key={message._id} className={message.senderId === authUser._id ? '' : 'flex flex-col-reverse'} ref={lastMessageRef}>
              <Message message={message} />
            </div>
				))}
        {loading && [...Array(3)].map((_,idx) => <MessageSkeleton key={idx} />)}
        {!loading && filteredMessages.length === 0 && (
          <p className='text-center'>Send a message to start the conversation</p>
        )
        }
 
 
    </div>
  )
}

export default Messages