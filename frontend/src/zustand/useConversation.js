import {create} from 'zustand'

const useConversation = create((set) => ({
    selectedConversation:null,
    setSelectedConversation: (selectedConversation) => set({selectedConversation}),
    messages:[],
    setMessages:(messages) => set({messages}),
    aiMessages:[],
    setAiMessages:(aiMessages) => set({aiMessages}),
    selectedAiConversation:null,
    setSelectedAiConversation: (selectedAiConversation) => set({selectedAiConversation}),
    backgroundType:null,
    setBackgroundType:(backgroundType) => set({backgroundType})
}))
export default useConversation;