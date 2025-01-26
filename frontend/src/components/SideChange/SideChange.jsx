import React, { useState } from 'react'
import './sideChange.css'
import { PiChatsCircle } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";
import LogoutButton from '../sidebar/LogoutButton';
import { LuSunMedium } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { IoIosSnow } from "react-icons/io";
import { IoFlowerOutline } from "react-icons/io5";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import useConversation from '../../zustand/useConversation';
const SideChange = () => {
    const [isOpen, setIsOpen] = useState(false);
   
    const {backgroundType, setBackgroundType} = useConversation();
    const handleOpenSeasonBurger = () => {
        setIsOpen(!isOpen);
    }
const handleChangeSeason = (season) => {
    setBackgroundType(season)
    setTimeout(() => {
        setIsOpen(false);
    },1500)
}
return (
    <div className='main-block'>
        <a href="/">
            <img className='side-logo cursor-pointer' src="/rabbithole.png" alt="" />
        </a>
        <ul>
            <li>
                <button>
                    <PiChatsCircle style={{ width: '27px', height: '27px' }} />
                </button>
            </li>
            <li>
                <button>
                    <FiPhone style={{ width: '27px', height: '27px',opacity:'0.5' }} />
                </button>
            </li>
        </ul>

        <ul style={{ position: 'relative' }} class={isOpen ? 'open season-block' : 'season-block'}>
            <div
                className='seasons'
                style={{ transition: 'max-height 1s ease-in-out', overflow: 'hidden' }}
            >
                <li>
                    <button
                        onClick={() => handleChangeSeason('winter')}
                        className={backgroundType === 'winter' ? 'active' : ''}
                    >
                        <IoIosSnow className="season-icon" />
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleChangeSeason('spring')}
                        className={backgroundType === 'spring' ? 'active' : ''}
                    >
                        <IoFlowerOutline className="season-icon" />
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleChangeSeason('summer')}
                        className={backgroundType === 'summer' ? 'active' : ''}
                    >
                        <LuSunMedium className="season-icon" />
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleChangeSeason('autumn')}
                        className={backgroundType === 'autumn' ? 'active' : ''}
                    >
                        <FaCanadianMapleLeaf className="season-icon" />
                    </button>
                </li>
            </div>
            <li >
                <button onClick={handleOpenSeasonBurger}>
                    <img src="/season.png" style={{  filter:isOpen ? 'invert(100%)': 'invert(70%)', width: '32px', height: '32px',transition:'0.3s ease-in-out' }} alt="" />
                </button>
            </li>
            <li>
                <LogoutButton />
            </li>
        </ul>
    </div>
)
}

export default SideChange