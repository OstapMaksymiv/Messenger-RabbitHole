import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';
import './loginStyles.scss'
const Login = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState("");
    const {loading, login} = useLogin();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({username,password})
    }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto login'>
   <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-5 border-white border-2 border-solid '>
            <h1 className='text-3xl font-semibold text-center text-white'>Login to 
                <a href='/' className='' style={{
                        fontFamily: 'Instrument Serif, serif',
                        fontWeight: '300',
                        fontStyle: 'italic'
                }}> RabbitHole🐇</a>
            </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base text-white'>Username</span>
                    </label>
                    <input type="text" placeholder='Enter username' className='w-full inp bg-transparent  input-bordered h-10' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <label className='label'>
                        <span className='text-base text-white'>Password</span>
                    </label>
                    <input type="password" placeholder='Enter Password' className='w-full bg-transparent inp input-bordered h-10' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Link to="/signup" className='text-sm text-white  mt-2 inline-block'>
                    Don't have an account?
                </Link>
                <div>
                    <button disabled={loading} className='  login-btn'>
                    
                        {loading ? <span className='loading loading-spinner'></span> : "Login"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login