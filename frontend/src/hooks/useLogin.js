import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
const useLogin = () => {
    const {setAuthUser} =  useAuthContext()
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const login = async ({username, password}) => {
        const success =  handleInputErrors({username, password});
        if(!success) return
        setLoading(true)
        console.log(import.meta.env.VITE_BACKEND_URL);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,{
                method:"POST",
                credentials: "include", 
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body:JSON.stringify({username, password})
            })
            const data = await res.json();
            if(data.message){
                throw new Error(data.message)
            }
            localStorage.setItem("chat-user",JSON.stringify(data))
            setAuthUser(data)
            navigate('/home')
        } catch (error) {
            console.log(error);
            console.log(error.message);

            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {loading, login}
}

export default useLogin
function handleInputErrors({username, password}){
    if(!username || !password ){
        toast.error("Please fill all fields")
        return false
    }
    return true
}