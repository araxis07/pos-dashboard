import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const features = [
    { 
      title: 'ขายสินค้าได้ง่าย',
      description: 'ระบบขายสินค้าใช้งานง่าย สะดวก รวดเร็ว ทำรายการขายได้อย่างมีประสิทธิภาพ',
      icon: '🛒',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'รายงานครบถ้วน',
      description: 'วิเคราะห์ยอดขาย สินค้าขายดี สต็อกสินค้า เพื่อช่วยในการตัดสินใจทางธุรกิจ',
      icon: '📊',
      color: 'from-green-500 to-green-600'
    },
    { 
      title: 'จัดการสินค้า',
      description: 'เพิ่ม แก้ไข ลบสินค้า จัดการสต็อก และตรวจสอบข้อมูลสินค้าได้อย่างสะดวก',
      icon: '📦',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      title: 'ฐานข้อมูลลูกค้า',
      description: 'จัดเก็บข้อมูลลูกค้า ประวัติการซื้อสินค้า เพื่อวิเคราะห์พฤติกรรมลูกค้า',
      icon: '👥',
      color: 'from-orange-500 to-orange-600'
    },
  ];

  const stats = [
    { label: 'ยอดขายวันนี้', value: '฿45,320', icon: '💰', trend: '+12%' },
    { label: 'จำนวนรายการ', value: '156', icon: '📋', trend: '+8%' },
    { label: 'สินค้าในสต็อก', value: '1,234', icon: '📦', trend: '-3%' },
    { label: 'ลูกค้าใหม่', value: '23', icon: '👤', trend: '+15%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  🚀 ระบบใหม่ล่าสุด
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  ระบบจัดการร้านค้า
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    ที่ใช้งานง่าย
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  POS Dashboard คือระบบจัดการร้านค้าที่ครบวงจร ช่วยให้คุณขายสินค้า จัดการสต็อก และติดตามผลประกอบการได้อย่างมีประสิทธิภาพ
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pos" className="group">
                  <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                    <span>🛒</span>
                    เริ่มขายสินค้า
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
                <Link href="/dashboard">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-2">
                    <span>📊</span>
                    ดูรายงาน
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Hero Image/Demo */}
            <div className="relative animate-fade-in">
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Browser Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-sm text-gray-600">
                    POS Dashboard - ระบบจัดการร้านค้า
                  </div>
                </div>
                
                {/* Demo Content */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">{stat.label}</p>
                            <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                          </div>
                          <div className="text-2xl">{stat.icon}</div>
                        </div>
                        <div className="text-xs text-green-600 mt-1">{stat.trend}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">ยอดขายรายวัน</span>
                      <span className="text-xs text-gray-500">7 วันล่าสุด</span>
                    </div>
                    <div className="flex items-end gap-1 h-16">
                      {[40, 65, 55, 80, 70, 85, 95].map((height, index) => (
                        <div 
                          key={index} 
                          className={`flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm`}
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ฟีเจอร์ที่ครบครัน
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ทุกสิ่งที่คุณต้องการสำหรับการจัดการร้านค้าอย่างมืออาชีพ
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            พร้อมเริ่มใช้งานแล้วหรือยัง?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            เริ่มใช้งานระบบ POS Dashboard ได้ทันที เพิ่มประสิทธิภาพการขายและบริหารร้านของคุณวันนี้
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pos">
              <button className="px-10 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl flex items-center justify-center gap-2">
                <span>🚀</span>
                เริ่มใช้งานเดี๋ยวนี้
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="px-10 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-2">
                <span>📊</span>
                ดูตัวอย่างรายงาน
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
          <p className="mb-8 max-w-lg mx-auto">
            เริ่มใช้งานระบบ POS Dashboard ได้ทันที เพิ่มประสิทธิภาพการขายและบริหารร้านของคุณ
          </p>
          <Link href="/pos">
            <Button variant="secondary" className="w-full sm:w-auto px-8">
              เริ่มใช้งานเดี๋ยวนี้
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
