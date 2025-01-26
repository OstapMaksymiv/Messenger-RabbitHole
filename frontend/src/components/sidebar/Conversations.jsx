import React from 'react'
import Conversation from './Conversation'

import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emoji';

const Conversations = ({filteredConversations}) => {
	const {loading} = useGetConversations();
	
  return (
<div className='py-2 flex flex-col overflow-auto'>
  
  {filteredConversations.map((conv, idx) => (
    <Conversation key={conv._id} conv={conv} emoji={getRandomEmoji()} lastIdx={idx === filteredConversations.length - 1} />
  ))}
  {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
</div>

  )
}

export default Conversations