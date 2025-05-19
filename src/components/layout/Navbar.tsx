"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-700 text-white px-4 md:px-6 py-4 flex justify-between items-center shadow-lg sticky top-0 z-30">
      <Link href="/" className="flex items-center gap-2">
        <div className="relative w-8 h-8">
          <Image 
            src="/window.svg" 
            alt="Logo" 
            fill
            className="object-contain invert"
          />
        </div>
        <span className="font-bold text-xl tracking-wide">POS DASHBOARD</span>
      </Link>
      
      {/* Mobile menu button */}
      <button 
        className="md:hidden p-2 rounded hover:bg-blue-600"
        onClick={() => setIsOpen(!isOpen)}
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
        <Link href="/dashboard" className="hover:text-yellow-300 transition-colors duration-200 font-medium">แดชบอร์ด</Link>
        <Link href="/pos" className="hover:text-yellow-300 transition-colors duration-200 font-medium">ขายสินค้า</Link>
        <Link href="/products" className="hover:text-yellow-300 transition-colors duration-200 font-medium">สินค้า</Link>
        <Link href="/customers" className="hover:text-yellow-300 transition-colors duration-200 font-medium">ลูกค้า</Link>
        <Link href="/users" className="hover:text-yellow-300 transition-colors duration-200 font-medium">ผู้ใช้</Link>
        
        {/* User profile dropdown */}
        <div className="relative ml-4">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-full transition-colors">
            <span>Admin</span>
            <div className="h-6 w-6 bg-blue-400 rounded-full flex items-center justify-center text-sm">A</div>
          </button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-blue-700 shadow-lg md:hidden z-50">
          <div className="flex flex-col p-4 space-y-3">
            <Link href="/dashboard" className="py-2 px-4 hover:bg-blue-600 rounded" onClick={() => setIsOpen(false)}>แดชบอร์ด</Link>
            <Link href="/pos" className="py-2 px-4 hover:bg-blue-600 rounded" onClick={() => setIsOpen(false)}>ขายสินค้า</Link>
            <Link href="/products" className="py-2 px-4 hover:bg-blue-600 rounded" onClick={() => setIsOpen(false)}>สินค้า</Link>
            <Link href="/customers" className="py-2 px-4 hover:bg-blue-600 rounded" onClick={() => setIsOpen(false)}>ลูกค้า</Link>
            <Link href="/users" className="py-2 px-4 hover:bg-blue-600 rounded" onClick={() => setIsOpen(false)}>ผู้ใช้</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
