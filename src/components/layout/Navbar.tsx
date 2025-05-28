"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Format time for display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <nav 
      className={`bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 text-white px-4 md:px-6 py-3 flex justify-between items-center shadow-lg sticky top-0 z-40 backdrop-blur-sm transition-all duration-300 ${
        scrolled ? 'py-2 shadow-xl border-b border-blue-700/50' : ''
      }`}
    >
      <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
        <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-xl p-2 backdrop-blur-sm border border-white/10">
          <Image 
            src="/window.svg" 
            alt="Logo" 
            fill
            className="object-contain invert drop-shadow-lg"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl tracking-wide">POS DASHBOARD</span>
          <span className="text-blue-200 text-xs">ระบบจัดการร้านค้า</span>
        </div>
      </Link>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        title="Toggle navigation menu"
        aria-label="Toggle navigation menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? 
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> :
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          }
        </svg>
      </button>
      
      {/* Desktop navigation */}
      <div className="hidden md:flex items-center gap-6">
        {/* Date and time display */}
        <div className="bg-blue-800/40 rounded-lg px-3 py-2 mr-4 border border-blue-700/30 hidden lg:flex flex-col items-end">
          <span className="text-xs text-blue-200">{formatDate(currentTime)}</span>
          <span className="text-sm font-medium">{formatTime(currentTime)}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 hover:text-yellow-300 transition-all duration-200 font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            แดชบอร์ด
          </Link>
          <Link href="/pos" className="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 hover:text-yellow-300 transition-all duration-200 font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            ขายสินค้า
          </Link>
          <Link href="/products" className="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 hover:text-yellow-300 transition-all duration-200 font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            สินค้า
          </Link>
          <Link href="/customers" className="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 hover:text-yellow-300 transition-all duration-200 font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            ลูกค้า
          </Link>
          <Link href="/users" className="flex items-center px-3 py-2 rounded-lg hover:bg-white/10 hover:text-yellow-300 transition-all duration-200 font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            ผู้ใช้
          </Link>
        </div>
        
        {/* User profile dropdown */}
        <div className="relative ml-4">
          <button 
            className="flex items-center gap-3 bg-gradient-to-br from-blue-700/60 to-indigo-800/60 hover:from-blue-600/60 hover:to-indigo-700/60 px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/10 shadow-sm hover:shadow-md"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="h-8 w-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg">
              A
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">Admin</span>
              <span className="text-xs text-blue-200">ผู้ดูแลระบบ</span>
            </div>
            <svg className={`w-4 h-4 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-lg font-bold text-white">
                    A
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Admin User</div>
                    <div className="text-xs text-gray-500">admin@example.com</div>
                  </div>
                </div>
              </div>
              
              <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                ข้อมูลส่วนตัว
              </Link>
              <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                ตั้งค่าระบบ
              </Link>
              <hr className="my-2 border-gray-200" />
              <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                <svg className="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </div>
        {/* Mobile navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-gradient-to-b from-blue-900 to-blue-800 backdrop-blur-md shadow-xl md:hidden z-50 border-t border-blue-700/50 animate-fadeIn">
          <div className="flex flex-col p-4 space-y-1">
            {/* User info for mobile */}
            <div className="bg-blue-800/40 rounded-xl p-4 mb-3 border border-blue-700/30 flex items-center gap-3">
              <div className="h-12 w-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-lg">
                A
              </div>
              <div>
                <div className="font-medium">Admin</div>
                <div className="text-blue-200 text-sm">ผู้ดูแลระบบ</div>
              </div>
            </div>
            
            <Link href="/dashboard" className="flex items-center py-3 px-4 hover:bg-white/10 rounded-xl transition-all duration-200 font-medium active:scale-95" onClick={() => setIsOpen(false)}>
              <div className="w-8 h-8 mr-3 bg-blue-700/40 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              แดชบอร์ด
            </Link>
            <Link href="/pos" className="flex items-center py-3 px-4 hover:bg-white/10 rounded-xl transition-all duration-200 font-medium active:scale-95" onClick={() => setIsOpen(false)}>
              <div className="w-8 h-8 mr-3 bg-blue-700/40 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              ขายสินค้า
            </Link>
            <Link href="/products" className="flex items-center py-3 px-4 hover:bg-white/10 rounded-xl transition-all duration-200 font-medium active:scale-95" onClick={() => setIsOpen(false)}>
              <div className="w-8 h-8 mr-3 bg-blue-700/40 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              สินค้า
            </Link>
            <Link href="/customers" className="flex items-center py-3 px-4 hover:bg-white/10 rounded-xl transition-all duration-200 font-medium active:scale-95" onClick={() => setIsOpen(false)}>
              <div className="w-8 h-8 mr-3 bg-blue-700/40 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              ลูกค้า
            </Link>
            <Link href="/users" className="flex items-center py-3 px-4 hover:bg-white/10 rounded-xl transition-all duration-200 font-medium active:scale-95" onClick={() => setIsOpen(false)}>
              <div className="w-8 h-8 mr-3 bg-blue-700/40 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              ผู้ใช้
            </Link>
            
            <hr className="my-3 border-blue-600/50" />
            
            <Link href="/settings" className="flex items-center py-3 px-4 hover:bg-white/10 rounded-xl transition-all duration-200 font-medium active:scale-95" onClick={() => setIsOpen(false)}>
              <div className="w-8 h-8 mr-3 bg-blue-700/40 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              ตั้งค่า
            </Link>
            <button className="flex items-center py-3 px-4 text-left text-red-300 hover:bg-red-500/20 rounded-xl transition-all duration-200 active:scale-95">
              <div className="w-8 h-8 mr-3 bg-red-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              ออกจากระบบ
            </button>
          </div>
          
          {/* Current time for mobile */}
          <div className="p-4 border-t border-blue-700/30 text-center text-sm text-blue-200">
            {formatDate(currentTime)} • {formatTime(currentTime)}
          </div>
        </div>
      )}
    </nav>
  );
}
