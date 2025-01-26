import React from 'react'
import { Outlet } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import './layoutStyles.css';
const FirstLayout = () => {

  return (
    <>
 
    <div  style={{

        ziIndex: 999,
        position: 'relative',
        minWidth: '100vw',
        minHeight: '100vh',
        overflow: 'hidden'
      }}>
            <Toaster/>
        <div className='content'>
            <Outlet/>
        </div>
      </div>
    </>
  )
}

export default FirstLayout