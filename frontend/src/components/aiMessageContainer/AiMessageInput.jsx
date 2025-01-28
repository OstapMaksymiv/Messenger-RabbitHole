import React, { useState, useEffect,useRef } from 'react';
import { BsSend } from 'react-icons/bs';

import useGetMessages from '../../hooks/useGetMessages';

import useSendAiMessage from '../../hooks/useSendAiMessage';
import { IKImage } from "imagekitio-react";
import model from '../../utils/gimini'

import useConversation from '../../zustand/useConversation';
import Upload from '../../upload/Upload';
import { useAuthContext } from '../../context/AuthContext';
import { MdDeleteOutline } from "react-icons/md";
import toast from 'react-hot-toast';
const MessageInput = () => {
  const [question, setQuestion] = useState("");
  const {authUser} = useAuthContext();
  const {selectedAiConversation,backgroundType, setBackgroundType} = useConversation();

  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  const formRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const {loading, sendMessage} = useSendAiMessage();
  const { messages } = useGetMessages();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question?.trim() && !img.dbData?.filePath) {
     
      return;
    }
    await sendMessage({ question, answer, img: img.dbData?.filePath || undefined, });
    add(question, false);
    setQuestion("");  
    setImg({
      isLoading: false,
      error: "",
      dbData: {},
      aiData: {},
    });
  };
  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);
    if (!text && !Object.entries(img.aiData).length) return;
    try {
      
      const isSimilarResponse = await chat.sendMessageStream(
        [`Does the following text imply a request to change the background to summer, spring, autumn, or winter? Please answer "summer", "spring", "autumn", "winter", or "no" only: "${text}"`]
      );
      let accumulatedCheck = "";
      let accumulatedText = "";
      try {
        for await (const chunk of isSimilarResponse.stream) {
          const chunkText = chunk.text();
          accumulatedCheck += chunkText;
        }
      } catch (err) {
        toast.error(`${err}`);
        return;
      }
       
      const isSimilar = accumulatedCheck.trim().toLowerCase() !== 'no'
      const season = accumulatedCheck.trim().toLowerCase();
      if (isSimilar) {
        if(backgroundType === season){
           
           accumulatedText += 'That background is already installed.'
         
        }
        else if(backgroundType !== season){
 
          switch (season) {
            case 'summer':
              accumulatedText += 'Here is your summer background.Enjoy☀️!'
              setBackgroundType('summer');
              break;
            case 'winter':
              if(backgroundType === null){
                accumulatedText += 'That background is already installed.'
                break;
               
              }
              accumulatedText += 'Here is your winter background.Enjoy❄️!'
              setBackgroundType('winter');
              break;
            case 'spring':
              accumulatedText += 'Here is your spring background.Enjoy🌷!'
              setBackgroundType('spring');
              break;
            case 'autumn':
              accumulatedText += 'Here is your autumn background.Enjoy🍂!'
              setBackgroundType('autumn');
              break;
          }
        }
        
      } else {

        const result = await chat.sendMessageStream(
          Object.entries(img.aiData || {}).length ? [img.aiData, text] : [text]
        ); 
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
        
          accumulatedText += chunkText;
          setAnswer(accumulatedText);
        }
      }

      
      await sendMessage({ question:'', answer:accumulatedText, img: '', });
      formRef.current.reset();
      setQuestion("");
      setAnswer("");
      setImg({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
      });
    } catch (err) {
      console.log(err);
    }
  };
  const lastMessageRef = useRef();

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [img.dbData?.filePath]);

  return (
    <>  {
      selectedAiConversation.userId === authUser._id && img.dbData?.filePath && (
        <div className='absolute bottom-12 right-5 opacity-65 w-fit hover:opacity-100 transition-opacity duration-300'>
        <IKImage
          ref={lastMessageRef}
          className='my-4 rounded-2xl'
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="200"
          height="100"
          transformation={[{ height: 100, width: 200 }]}
          lqip={{active:true, quality:100}}
        />
        <MdDeleteOutline
          onClick={() =>
            setImg({
              isLoading: false,
              error: "",
              dbData: {},
              aiData: {},
            })
          }
          className="sh absolute top-6 cursor-pointer right-3"
        />
      </div>
      
      )
    }
    
      <form className="px-4 my-3 flex items-center justify-center gap-5 " onSubmit={handleSubmit} ref={formRef}>
        <div className="w-full relative">
          <Upload setImg={setImg}  />
          <input id="file" type="file" multiple={false} hidden />
          <input
            value={question}
            type="text"
            className="border text-sm rounded-lg outline-none block w-full p-2.5 bg-transparent  border-gray-600 text-white pl-8"
            placeholder="Send a message"
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
            {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
          </button>
        </div>
      </form>
    </>
  );
};

export default MessageInput;

