'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '../../lib/hooks';
import { login } from '../../lib/features/auth/authSlice';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('Administrator');
  const [password, setPassword] = useState('**********');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ name: username }));
    router.push('/');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f7d348] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#f7d348] to-[#f9e076]"></div>
      <div className="absolute bottom-0 left-0 w-[150%] h-[30%] bg-white -rotate-3 translate-y-1/2"></div>

      <div className="bg-white w-[90%] max-w-md rounded-[20px] shadow-2xl p-10 z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="flex flex-col items-center mb-2">
            <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold italic tracking-tighter">SANTIM</span>
            </div>
            <div className="flex items-center">
                <span className="text-2xl font-black italic text-black">PAY</span>
                <span className="text-2xl font-light italic text-black ml-1">CaSh</span>
            </div>
          </div>
          <h1 className="text-4xl font-normal text-black mt-2">Log In</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <div className="border border-gray-200 rounded-md px-4 py-3">
              <label htmlFor="username" className="block text-[10px] font-bold text-gray-400 uppercase">User Name</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-sm text-gray-700 outline-none mt-1"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="border border-gray-200 rounded-md px-4 py-3 relative">
              <label htmlFor="password" className="block text-[10px] font-bold text-gray-400 uppercase">Password</label>
              <div className="flex items-center justify-between">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm text-gray-700 outline-none mt-1"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="hidden"
              />
              <div
                className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${rememberMe ? 'bg-[#333] border-[#333]' : 'bg-white border-gray-300'}`}
              >
                {rememberMe && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-[11px] text-gray-400 font-medium">Remember Me</span>
            </label>
            <button type="button" className="text-[11px] text-gray-400 hover:text-gray-600 font-medium">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1c1c1c] text-white py-5 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-black transition-all mt-4"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
}
