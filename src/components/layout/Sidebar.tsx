"use client";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navItems: NavItem[] = [
    { href: '/dashboard', label: 'แดชบอร์ด', icon: 'chart-bar' },
    { href: '/pos', label: 'ขายสินค้า', icon: 'shopping-cart', badge: 'HOT' },
    { href: '/products', label: 'สินค้า', icon: 'cube' },
    { href: '/customers', label: 'ลูกค้า', icon: 'users' },
    { href: '/reports', label: 'รายงาน', icon: 'document-report' },
    { href: '/users', label: 'ผู้ใช้', icon: 'user-circle' },
  ];
  
  const icons = {
    'chart-bar': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      </svg>
    ),
    'shopping-cart': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
    ),
    'cube': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
      </svg>
    ),
    'users': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    ),
    'document-report': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
      </svg>
    ),
    'user-circle': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
      </svg>
    )
  };

  return (
    <aside className={`bg-white shadow-xl h-full transition-all duration-300 ease-in-out hidden md:block border-r border-gray-100 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-2">
                <Image 
                  src="/window.svg" 
                  alt="Logo" 
                  fill
                  className="object-contain invert"
                />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">POS System</h2>
                <p className="text-xs text-gray-500">ระบบจัดการร้านค้า</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={isCollapsed ? "ขยายเมนู" : "ย่อเมนู"}
          >
            <svg className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="p-4 space-y-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25' 
                  : 'hover:bg-gray-50 text-gray-700 hover:text-blue-600'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <span className={`${isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'} transition-colors`}>
                {icons[item.icon as keyof typeof icons]}
              </span>
              
              {!isCollapsed && (
                <>
                  <span className="font-medium flex-1">{item.label}</span>
                  
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-orange-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                  
                  {isActive && (
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-l-full"></div>
                  )}
                </>
              )}
              
              {isCollapsed && isActive && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-l-full"></div>
              )}
            </Link>
          );
        })}
      </div>
      
      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-900">เริ่มขายเลย!</p>
                <p className="text-xs text-blue-600">ไปหน้าขายสินค้า</p>
              </div>
            </div>
            <Link href="/pos">
              <button className="w-full bg-white text-blue-700 border border-blue-200 text-sm py-2 px-3 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 font-medium">
                เริ่มขาย
              </button>
            </Link>
          </div>
        </div>
      )}
      
      {/* Support Section */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs font-semibold text-gray-700">ต้องการความช่วยเหลือ?</p>
            </div>
            <p className="text-xs text-gray-600 mb-2">ติดต่อฝ่ายเทคนิค</p>
            <button className="w-full bg-white text-gray-700 border border-gray-300 text-xs py-1.5 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200">
              แจ้งปัญหา
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
          <button className="mt-2 w-full bg-white text-blue-700 border border-blue-300 text-xs py-1.5 rounded-lg hover:bg-blue-700 hover:text-white transition-colors">
            แจ้งปัญหา
          </button>
        </div>
      </div>
    </aside>
  );
}
