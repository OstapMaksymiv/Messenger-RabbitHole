import React, { useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import useConversation from '../zustand/useConversation';
import './layoutStyles.css';

const SecondLayout = () => {
    const location = useLocation();
    const loader = useRef(null);
    const { backgroundType, setBackgroundType } = useConversation();
    const [bg, setBg] = useState('');
    const navigate = useNavigate();
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (backgroundType) {
            setTimeout(() => {
                setBg(backgroundType);
            },2000)
        } else if(!backgroundType) {
            const randomNumberSeason = Math.floor(Math.random() * 4)
            switch (randomNumberSeason) {
                case 0:
                    setBg('winter')
                    break;
                  case 1:
                    setBg('spring')
                    break;
                  case 2:
                    setBg('summer')
                    break;
                  case 3:
                    setBg('autumn')
                    break;
            }
        }
        else{
            setTimeout(() => {
                setBg('winter');
            },2000)
        }
    }, [backgroundType]);


    useEffect(() => {
        if(backgroundType === bg){
            return;
        }   
        else if (loader.current) {
            if(loader.current.style.transform === 'translateX(-150%)'){
  
                loader.current.style.transform = "translateX(0%)";
               
                setTimeout(() => {
                    loader.current.style.transform = "translateX(-150%)";
                },1900)
            }else{
                loader.current.style.transform = "translateX(-150%)";
            }
        }
    },[backgroundType])

    useEffect(() => {
        if (location.pathname === '/home') {
            if (authUser) {
                navigate('/home', { replace: true });
           
            } else {
                navigate('/login', { replace: true });
         
            }
        } else if (location.pathname === '/login') {
            if (authUser) {
                navigate('/home', { replace: true });
          
            }
        } else if (location.pathname === '/signup') {
            if (authUser) {
                navigate('/home', { replace: true });
               
            }
        }
    }, [location.pathname, authUser]);

    return (
        <>
            <div ref={loader} className="loader"></div>
            <div className='h-screen flex items-center justify-center video-background'>
                <video autoPlay={true} key={bg} loop={true} muted={true} playsInline={true}>
                    <source src={`/${bg}.mp4`} type="video/mp4" />
                </video>
                <Toaster />
                <div className='content'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default SecondLayout;
