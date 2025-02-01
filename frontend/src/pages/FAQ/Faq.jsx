import React, { useState, useRef, useEffect } from 'react';
import './faq.scss';

import { Link } from "react-router-dom";
const Faq = () => {
 
  const pageRef = useRef(null);
  const navRef = useRef(null);
  const [route, setRoute] = useState("a");
  const [activeIndex, setActiveIndex] = useState(null);
  const faqPanelsRef = useRef([]);
  const faqItems = [
    {
      question: 'What is RabbitHole Messenger?',
      answer: 'RabbitHole Messenger is a secure and innovative messaging platform designed to provide seamless communication while protecting your privacy.'
    },
    {
      question: 'How do I create an account on RabbitHole?',
      answer: 'To create an account, download the RabbitHole app from your app store, open it, and follow the on-screen instructions to register with your phone number or email.'
    },
    {
      question: 'Is RabbitHole Messenger free to use?',
      answer: 'Yes, RabbitHole Messenger is free to use. However, certain premium features may require a subscription or one-time payment.'
    },
    {
      question: 'How secure is RabbitHole Messenger?',
      answer: 'RabbitHole Messenger uses end-to-end encryption to ensure your messages are private and secure. Only you and the intended recipient can read the messages.'
    },
    {
      question: 'Can I send files and media through RabbitHole Messenger?',
      answer: 'Yes, RabbitHole Messenger supports file sharing, including documents, images, videos, and more, with size limits depending on your subscription plan.'
    },
    {
      question: 'Does RabbitHole Messenger have a group chat feature?',
      answer: 'Yes, RabbitHole Messenger allows you to create group chats to connect and collaborate with multiple users at the same time.'
    }
  ];
  
  const circles = Array.from({ length: 100 }, (_, i) => (
    <div key={i} className="circle-container">
      <div className="circle"></div>
    </div>
  ));
  const toggleActiveClass = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    faqPanelsRef.current.forEach((panel, index) => {
      if (panel) {
        panel.style.maxHeight = index === activeIndex ? `${panel.scrollHeight}px` : '0';
      }
    });
  }, [activeIndex]);
  const loader = useRef(null);

  useEffect(() => {
    if (loader.current) {
      loader.current.style.transform = "translateX(-150%)";
     
  }
  },[])
  return (
    <>
    
    <div ref={loader} className="loader"></div>
    <div id="page" ref={pageRef} data-route={route}>
      
      <div className="navigation" ref={navRef}>
        <Link to='/' style={{display:'flex', alignItems:'center',gap:'20px'}}>
        <img
          src="/rabbithole.png"
          alt="Rabbit Hole Logo"
          className={`nav-logo`}
        />
        <span className="logo-text">RabbitHole</span>
        </Link>
        <div>
          <Link to={'/'}>Contacts</Link>
          <Link to={'/faq'}>FAQ</Link>
        </div>
      </div>


      
      <section className='faq'>
      <h1>We're here to help</h1>
      <p className='description'>
        Customer service is at the core of our business. If you need any help before or after making a purchase, we're here.
      </p>
      <div className='faqs' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
       
          {faqItems.map((item, index) => (
            <div onClick={() => toggleActiveClass(index)} key={index} className='faq-block'>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap:'15px' }}>
                <h2 style={{ flexGrow: 1 }}>{item.question}</h2>
                <div className={`plusminus ${activeIndex === index ? 'plusminus-active' : ''}`}></div>
              </div>
              <p 
                ref={el => faqPanelsRef.current[index] = el} 
                className={`faq-panel ${activeIndex === index ? 'active' : ''}`}
              >
                {item.answer}
              </p>
            </div>
          ))}
    
      </div>
    </section>
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="glowing">
              {[1, 2, 3].map((i) => (
                <span key={i} style={{ "--i": i }}></span>
              ))}
            </div>
          ))}
        {circles}
      
    </div>
    </>
  );
};

export default Faq;
