"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 text-white px-4 md:px-6 py-4 flex justify-between items-center shadow-xl sticky top-0 z-40 backdrop-blur-sm border-b border-blue-700/50">
      <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
        <div className="relative w-10 h-10 bg-white/10 rounded-lg p-2 backdrop-blur-sm">
          <Image 
            src="/window.svg" 
            alt="Logo" 
            fill
            className="object-contain invert"
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
        <div className="flex items-center gap-1">
          <Link href="/dashboard" className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-yellow-300 transition-all duration-200 font-medium">
            แดชบอร์ด
          </Link>
          <Link href="/pos" className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-yellow-300 transition-all duration-200 font-medium">
            ขายสินค้า
          </Link>
          <Link href="/products" className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-yellow-300 transition-all duration-200 font-medium">
            สินค้า
          </Link>
          <Link href="/customers" className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-yellow-300 transition-all duration-200 font-medium">
            ลูกค้า
          </Link>
          <Link href="/users" className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-yellow-300 transition-all duration-200 font-medium">
            ผู้ใช้
          </Link>
        </div>
        
        {/* User profile dropdown */}
        <div className="relative ml-4">
          <button 
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20"
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
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
              <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                ข้อมูลส่วนตัว
              </Link>
              <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                ตั้งค่าระบบ
              </Link>
              <hr className="my-1 border-gray-200" />
              <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-blue-800/95 backdrop-blur-sm shadow-xl md:hidden z-50 border-t border-blue-700/50">
          <div className="flex flex-col p-4 space-y-2">
            <Link href="/dashboard" className="py-3 px-4 hover:bg-white/10 rounded-lg transition-colors font-medium" onClick={() => setIsOpen(false)}>
              📊 แดชบอร์ด
            </Link>
            <Link href="/pos" className="py-3 px-4 hover:bg-white/10 rounded-lg transition-colors font-medium" onClick={() => setIsOpen(false)}>
              🛒 ขายสินค้า
            </Link>
            <Link href="/products" className="py-3 px-4 hover:bg-white/10 rounded-lg transition-colors font-medium" onClick={() => setIsOpen(false)}>
              📦 สินค้า
            </Link>
            <Link href="/customers" className="py-3 px-4 hover:bg-white/10 rounded-lg transition-colors font-medium" onClick={() => setIsOpen(false)}>
              👥 ลูกค้า
            </Link>
            <Link href="/users" className="py-3 px-4 hover:bg-white/10 rounded-lg transition-colors font-medium" onClick={() => setIsOpen(false)}>
              👤 ผู้ใช้
            </Link>
            <hr className="my-2 border-blue-600/50" />
            <div className="py-2 px-4 text-blue-200 text-sm">ผู้ใช้: Admin</div>
            <button className="py-2 px-4 text-left text-red-300 hover:bg-red-500/20 rounded-lg transition-colors">
              ออกจากระบบ
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
