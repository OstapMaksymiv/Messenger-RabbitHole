import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messageContainer/MessageContainer'
import SideChange from '../../components/SideChange/SideChange'
import './homeStyles.scss'

const Home = () => {

  return (
    <div className='flex  home-block  rounded-2xl overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0' style={{backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
        <SideChange/>
        <Sidebar/>
       <MessageContainer/>
    </div>
  )
}

export default Home