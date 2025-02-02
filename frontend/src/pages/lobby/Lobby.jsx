import React, { useEffect, useRef, useState } from "react";
import "./lobbyStyles.scss";
import Login from "../login/Login";
import SignUp from "../signup/SignUp";
import { useAuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Lobby = () => {
  const {authUser} = useAuthContext()
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const loaderRef = useRef(null);
  const navRef = useRef(null);
  const [route, setRoute] = useState("a");
  
 

  const circles = Array.from({ length: 100 }, (_, i) => (
    <div key={i} className="circle-container">
      <div className="circle"></div>
    </div>
  ));

  const loader = useRef(null);
  const handleClick = (e) => {
    e.preventDefault(); 
    loader.current.style.transform = "translateX(0%)";
    setTimeout(() => {
      window.location.href = '/home';
    }, 1500); 

  }
  useEffect(() => {
    if (loader.current) {
      loader.current.style.transform = "translateX(-150%)";
     
  }
  },[])
  return (
    <>
    
    <div ref={loader} className="loader"></div>
    <div id="page" ref={pageRef} data-route={route}>
      <div className="videos-block">
        <section>
        <div class="overlay"></div>
          <video autoPlay={true}  loop={true} muted={true} playsInline={true}>
              <source src={`/winter.mp4`} type="video/mp4" />
          </video>
        </section>
        <section>
        <div class="overlay"></div>
          <video autoPlay={true}  loop={true} muted={true} playsInline={true}>
              <source src={`/spring.mp4`} type="video/mp4" />
          </video>
        </section>
        <section>
        <div class="overlay"></div>
          <video autoPlay={true}  loop={true} muted={true} playsInline={true}>
              <source src={`/summer.mp4`} type="video/mp4" />
          </video>
        </section>
        <section>
        <div class="overlay"></div>
          <video autoPlay={true}  loop={true} muted={true} playsInline={true}>
              <source src={`/autumn.mp4`} type="video/mp4" />
          </video>
        </section>
      </div>
      <div className="navigation" ref={navRef}>
        <div style={{display:'flex', alignItems:'center',gap:'20px'}}>
        <img
          src="/rabbithole.png"
          alt="Rabbit Hole Logo"
          className={`nav-logo`}
        />
        <span className="logo-text">RabbitHole</span>
        </div>
        <div>
          <Link to={'/'}>Contacts</Link>
          <Link to={'/faq'}>FAQ</Link>
        </div>
      </div>
 

      
        <div className="main-info">
          <h1 className="title">
            Great conversations start with <span>a moment of patience.</span>
          </h1>
          <p>
            Embrace the <span>RabbitHole</span>—dive in, explore, and uncover something extraordinary!
          </p>
        <a href="/home" onClick={handleClick}
          className="button-56"
        >
          Start chatting
        </a>
        </div>
        <p className="footer">
          Created and all rights reserved by Ostap Maksymiv © 2025
        </p>

        <div className="base"></div>
        <div className="elipse"></div>
        <div className="radial"></div>
        <div className="fade">
          <div className="left"></div>
          <div className="right"></div>
        </div>
        <div className="fx">
          <div className="linear"></div>
          <div className="blur"></div>
        </div>
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="glowing">
              {[1, 2, 3].map((i) => (
                <span key={i} style={{ "--i": i }}></span>
              ))}
            </div>
          ))}
      
    </div>
        {circles}
    </>
  );
};

export default Lobby;
