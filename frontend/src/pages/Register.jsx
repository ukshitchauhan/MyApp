import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/API';

const Register = () => {
  
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e)=>{
    try{
      e.preventDefault()
      const response = await registerUser({username,email,password})
      alert(response.data.message)
      const token = response.data.data.token
      localStorage.setItem('token',token)
      setUsername('')
      setEmail('')
      setPassword('')
      navigate('/dashboard')
    }
    catch(err){
      alert(err.response.data.message);
      setUsername('')
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-zinc-950 flex items-center justify-center p-4 overflow-hidden">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-[-20%] left-[-20%] w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-96 h-96 bg-violet-700 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute top-[30%] right-[30%] w-96 h-96 bg-fuchsia-800 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000"></div>

      {/* Register Card */}
      <div className="relative w-full max-w-md bg-zinc-900/80 backdrop-blur-md border border-zinc-800/50 rounded-xl p-8 shadow-2xl shadow-purple-900/20">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-zinc-400 text-sm">Join MyApp today</p>
        </div>

        <form 
        onSubmit={(e)=>{
          submitHandler(e)

        }}
        className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="johndoe"
              className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors placeholder-zinc-600"
              value={username}
              onChange={(e)=>{
                  setUsername(e.target.value)
              }}  
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors placeholder-zinc-600"
              value={email}
              onChange={(e)=>{
                  setEmail(e.target.value)
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors placeholder-zinc-600"
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-violet-900/30 mt-2"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-zinc-400 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;