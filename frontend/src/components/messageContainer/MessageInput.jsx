import React, { useState, useEffect,useRef } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../hooks/useSendMessage';
import useGetMessages from '../../hooks/useGetMessages';

import { IKImage } from "imagekitio-react";
import Upload from '../../upload/Upload';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import { MdDeleteOutline } from "react-icons/md";

import model from '../../utils/gimini'
import { CiMicrophoneOn } from "react-icons/ci";
import { CiMicrophoneOff } from "react-icons/ci";
import {
  HumeClient,
  convertBlobToBase64,
  convertBase64ToBlob,
  ensureSingleValidAudioTrack,
  getAudioStream,
  getBrowserSupportedMimeType,
  MimeType,
} from 'hume';
const MessageInput = () => {
  const {authUser} = useAuthContext();
  const [message, setMessage] = useState('');
  const { loading, sendMessage } = useSendMessage();
  const { messages } = useGetMessages();
  const sendByAi = useRef();
  const [microIsUse, setMicroIsUse] = useState(false);

  const {selectedConversation,setAiMessages,aiMessages,setSelectedAiConversation,selectedAiConversation} = useConversation();
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  const filteredMessages = messages.filter((message) => {
    return (
      (message.senderId === selectedConversation._id &&
        message.receiverId === authUser._id) ||
      (message.senderId === authUser._id &&
        message.receiverId === selectedConversation._id)
    );
  });
 
  const [connected, setConnected] = useState(false);
  const [audioQueue, setAudioQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatGroupId, setChatGroupId] = useState(null);

  const mimeType = useRef(getBrowserSupportedMimeType()?.mimeType || MimeType.WEBM);
  const client = useRef(null);
  const socket = useRef(null);
  const recorder = useRef(null);
  const audioStream = useRef(null);
  const currentAudio = useRef(null);
  const lastMessageRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!message?.trim() && !img.dbData?.filePath) {
    
      return;
    }
    await sendMessage(message, img.dbData?.filePath || undefined);
    setMessage('');
    setImg({
      isLoading: false,
      error: "",
      dbData: {},
      aiData: {},
    })
  };
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [img.dbData?.filePath]);
  const handleConnect = async () => {

    setMicroIsUse(true)
    if (!client.current) {
      client.current = new HumeClient({
        apiKey: import.meta.env.VITE_HUME_API_KEY || '',
        secretKey: import.meta.env.VITE_HUME_SECRET_KEY || '',
      });
    }

    socket.current = client.current.empathicVoice.chat.connect({
      configId: import.meta.env.VITE_HUME_CONFIG_ID || null,
      resumedChatGroupId: chatGroupId,
    });

    socket.current.on('open', handleWebSocketOpen);
    socket.current.on('message', handleWebSocketMessage);
    socket.current.on('error', handleWebSocketError);
    socket.current.on('close', handleWebSocketClose);

    setConnected(true);
  };

  const handleDisconnect = () => {
    setMicroIsUse(false)
    setConnected(false);
    stopAudioPlayback();
    if (recorder.current) recorder.current.stop();
    recorder.current = null;
    audioStream.current = null;
    if (socket.current) socket.current.close();
  };

  const startAudioCapture = async () => {
    audioStream.current = await getAudioStream();
    ensureSingleValidAudioTrack(audioStream.current);

    recorder.current = new MediaRecorder(audioStream.current, { mimeType: mimeType.current });
    recorder.current.ondataavailable = async ({ data }) => {
      if (data.size > 0 && socket.current) {
        const encodedAudioData = await convertBlobToBase64(data);
        socket.current.sendAudioInput({ data: encodedAudioData });
      }
    };

    recorder.current.start(100);
  };

  const playAudioFromQueue = () => {
    if (audioQueue.length === 0 || isPlaying) return;

    setIsPlaying(true);
    const audioBlob = audioQueue[0];
    const audioUrl = URL.createObjectURL(audioBlob);
    currentAudio.current = new Audio(audioUrl);

    currentAudio.current.play();
    currentAudio.current.onended = () => {
      setAudioQueue((prev) => prev.slice(1));
      setIsPlaying(false);
    };
  };

  const stopAudioPlayback = () => {
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current = null;
    }
    setIsPlaying(false);
    setAudioQueue([]);
  };

  const injectContext = async (contextText) => {
    if (!socket.current) return;

    try {
      socket.current.sendSessionSettings({
        context: {
          text: `My id is ${authUser._id}, ${contextText}`,
          type: 'persistent',
        },
      });
    } catch (error) {
      console.error('Failed to inject context:', error);
    }
  };

  const handleWebSocketOpen = async () => {
    const contextData = filteredMessages;

    await injectContext(JSON.stringify(contextData));
    await startAudioCapture();
  };
  const chat = model.startChat({
    history: selectedAiConversation?.history?.length
      ? selectedAiConversation.history.map(({ role, parts }) => ({
          role: role || "user", 
          parts: [{ text: parts[0]?.text || "" }], 
        }))
      : [], 
    generationConfig: {
      
    },
  });
  const handleWebSocketMessage = async (audioMessage) => {
    
    if (audioMessage.message?.content) {
      const isSimilarResponse = await chat.sendMessageStream([
        `Does the following text imply a direct or indirect request, command, or suggestion to send or write a message? Exclude cases where the text uses the word "tell" (e.g., "tell me something") or where the text appears to ask a question. Answer strictly in the format: "What to write: <message content>" if it implies such a request, or "no" otherwise. Text: "${audioMessage.message.content}"`
      ]);
      
  
      let accumulatedCheck = "";
      
     
      for await (const chunk of isSimilarResponse.stream) {
        const chunkText = chunk.text();
        accumulatedCheck += chunkText;
      }
    
      const responseText = accumulatedCheck.trim().toLowerCase();
  
      const isSimilar = responseText !== 'no';
    
      if(isSimilar){
  
        setMessage(responseText.slice(15,));
        setTimeout(() => {
          sendByAi.current.click();
        },1000)
        return;
      }
      
      
    }
    switch (audioMessage.type) {
      case 'chat_metadata':
        setChatGroupId(audioMessage.chatGroupId);
        break;
      case 'audio_output': {
        const audioBlob = convertBase64ToBlob(audioMessage.data, mimeType.current);
        setAudioQueue((prev) => [...prev, audioBlob]);
        break;
      }
      case 'user_interruption':
        stopAudioPlayback();
        break;

      default:
        console.log('Unhandled message type:', audioMessage);
    }
  };

  const handleWebSocketError = (error) => {
    console.error('WebSocket Error:', error);
  };

  const handleWebSocketClose = () => {
    if (connected) handleConnect();
  };
  useEffect(() => {
    const updateChatContext = async () => {
      if (!socket.current || !connected) return;
  
      try {
        const contextData = JSON.stringify(filteredMessages);
        await injectContext(contextData);
        
      } catch (error) {
        console.error("Failed to update chat context:", error);
      }
    };
  
    updateChatContext();
  }, [filteredMessages, connected]);
  useEffect(() => {
    if (audioQueue.length > 0) playAudioFromQueue();
  }, [audioQueue]);
  const [searchwidth,setSearchwidth] = useState('');
  useEffect(() => {
    const  handleResize = () => {
      if(window.innerWidth < 740){
        setSearchwidth('80%')
        
      }
      else if(window.innerWidth < 767){
        setSearchwidth('82%')
      
      }
      else{
        setSearchwidth('86%')
    
      }
    }
    handleResize()
		
		window.addEventListener('resize', handleResize);
	
	
		return () => {
		  window.removeEventListener('resize', handleResize);
		};
  },[])
  return (
    <>
    {
       img.dbData?.filePath && (
        <div className='absolute message-pre-img bottom-12 right-5 opacity-65 w-fit hover:opacity-100 transition-opacity duration-300'>   
          <IKImage
            ref={lastMessageRef}
            className='my-4 rounded-2xl'
            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
            path={img.dbData?.filePath}
            width="200"
            height='100'
            transformation={[{ height: 100,width:200}]}
            lqip={{active:true, quality:100}}
          />
          <MdDeleteOutline
        onClick={() =>      setImg({
          isLoading: false,
          error: "",
          dbData: {},
          aiData: {},
        })
        }
        className='sh absolute top-6 cursor-pointer right-3 ' color='rgb(59 130 246)'/>

          
  
        </div>
      )
    }
    <div style={{display:'flex',alignItems:'center'}}>
      <form className="px-4 my-3 flex items-center justify-center gap-5 " style={{width:searchwidth}} onSubmit={handleSubmit}>
        <div className="w-full relative">
        <Upload setImg={setImg}  />
          <input id="file" type="file" multiple={false} hidden />
          <input
            value={message}
            type="text"
            className="border text-sm rounded-lg outline-none block w-full p-2.5 bg-transparent  border-gray-600 text-white pl-8"
            placeholder="Send a message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button ref={sendByAi} type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
            {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
          </button>
        </div>
      </form>
    {microIsUse ? 
      <CiMicrophoneOn className='border rounded-lg bg-transparent p-2.5  border-gray-600 cursor-pointer' style={{width:'42px',height:'42px'}} onClick={handleDisconnect}  />
      : 
      <CiMicrophoneOff className='border rounded-lg bg-transparent p-2.5  border-gray-600 cursor-pointer' style={{width:'42px',height:'42px'}} onClick={handleConnect}  />
    }
    
    </div>

    </>
  );
};

export default MessageInput;

