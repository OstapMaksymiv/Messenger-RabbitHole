import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignUp from '../../hooks/useSignUp'
import '../login/loginStyles.scss'
const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName:'',
    username:'',
    password:'',
    confirmPassword:'',
    gender:''
  })
 
  const {loading ,signup} = useSignUp()
  const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs)
   
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-5 border-white border-2 border-solid'>
      <h1 className='text-3xl font-semibold text-center text-white'>Login to 
                <a href='/' className='' style={{
                        fontFamily: 'Instrument Serif, serif',
                        fontWeight: '300',
                        fontStyle: 'italic'
                }}> RabbitHole🐇</a>
            </h1>
          <form onSubmit={handleSubmit} >
            <div>
              <label className='label p-2'>
                <span className='text-base text-white'>Full Name</span>
              </label>
              <input type='text' placeholder='John Doe' className='w-full bg-transparent inp input-bordered h-10' value={inputs.fullName} onChange={(e) => setInputs(prev => ({...prev, fullName:e.target.value}))} />
            </div>
            <div>
              <label className='label p-2'>
                <span className='text-base text-white'>Username</span>
              </label>
              <input type="text" placeholder='johndoe' className='w-full bg-transparent inp input-bordered h-10' value={inputs.username} onChange={(e) => setInputs(prev => ({...prev, username:e.target.value}))} />
            </div>
            <div>
              <label className='label'>
                <span className='text-base text-white'>Password</span>
              </label>
              <input type="password"  placeholder='Enter Password' className='w-full bg-transparent inp input-bordered h-10' value={inputs.password} onChange={(e) => setInputs(prev => ({...prev, password:e.target.value}))}/>
            </div>
            <div>
              <label className='label'>
                <span className='text-base text-white'>Confirm Password</span>
              </label>
              <input
                type='password'
                placeholder='Confirm Password'
                className='w-full bg-transparent inp input-bordered h-10'
                value={inputs.confirmPassword} onChange={(e) => setInputs(prev => ({...prev, confirmPassword:e.target.value}))}
              />
					</div>
          <GenderCheckBox handleCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>
          <Link to="/login" className='text-sm text-white  mt-2 inline-block'>Already have an account?</Link>
          <div>
            <button disabled={loading} className='login-btn'>{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}</button>
          </div>
          </form>
      </div>
    </div>
  )
}

export default SignUp