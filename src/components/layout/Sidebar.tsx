"use client";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems: NavItem[] = [
    { href: '/dashboard', label: 'แดชบอร์ด', icon: 'chart-bar' },
    { href: '/pos', label: 'ขายสินค้า', icon: 'shopping-cart' },
    { href: '/products', label: 'สินค้า', icon: 'cube' },
    { href: '/customers', label: 'ลูกค้า', icon: 'users' },
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
    'user-circle': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
      </svg>
    )
  };

  return (
    <aside className="bg-white shadow-lg h-full w-56 p-4 hidden md:block">
      <div className="mb-8 mt-2">
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-12 h-12">
            <Image 
              src="/window.svg" 
              alt="Logo" 
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-xs">ระบบจัดการร้านค้า</p>
        </div>
      </div>
      
      <div className="space-y-1">
        {navItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-100 text-blue-800 font-medium' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className={isActive ? 'text-blue-700' : 'text-gray-500'}>
                {icons[item.icon as keyof typeof icons]}
              </span>
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-5 bg-blue-600 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>
      
      <div className="absolute bottom-8 left-4 right-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs text-blue-800 font-medium">พบปัญหาการใช้งาน?</p>
          <p className="text-xs text-blue-600 mt-1">ติดต่อฝ่ายเทคนิค</p>
          <button className="mt-2 w-full bg-white text-blue-700 border border-blue-300 text-xs py-1.5 rounded-lg hover:bg-blue-700 hover:text-white transition-colors">
            แจ้งปัญหา
          </button>
        </div>
      </div>
    </aside>
  );
}
