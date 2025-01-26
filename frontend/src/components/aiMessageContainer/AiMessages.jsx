import {useRef,useEffect} from 'react'
import Message from './AiMessage'

import useListenMessages from '../../hooks/useListenMessages';
import useConversation from '../../zustand/useConversation';
import useOpenAiChat from '../../hooks/useOpenAiChat';

const Messages = () => {
  const {loading} = useOpenAiChat();
  const {selectedAiConversation} = useConversation();
  useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [selectedAiConversation.history]);
  return (
    <>
      {!loading &&
        selectedAiConversation?.history?.length > 0 &&
        selectedAiConversation.history.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
 
      {!loading && (!selectedAiConversation || selectedAiConversation?.history?.length === 0) && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </>
  );
  
}

export default Messages