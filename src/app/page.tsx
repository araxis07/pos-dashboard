import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const features = [
    { 
      title: 'ขายสินค้าได้ง่าย',
      description: 'ระบบขายสินค้าใช้งานง่าย สะดวก รวดเร็ว ทำรายการขายได้อย่างมีประสิทธิภาพ',
      icon: '/public/shopping-cart.svg'
    },
    { 
      title: 'รายงานครบถ้วน',
      description: 'วิเคราะห์ยอดขาย สินค้าขายดี สต็อกสินค้า เพื่อช่วยในการตัดสินใจทางธุรกิจ',
      icon: '/public/chart-pie.svg' 
    },
    { 
      title: 'จัดการสินค้า',
      description: 'เพิ่ม แก้ไข ลบสินค้า จัดการสต็อก และตรวจสอบข้อมูลสินค้าได้อย่างสะดวก',
      icon: '/public/cube.svg' 
    },
    { 
      title: 'ฐานข้อมูลลูกค้า',
      description: 'จัดเก็บข้อมูลลูกค้า ประวัติการซื้อสินค้า เพื่อวิเคราะห์พฤติกรรมลูกค้า',
      icon: '/public/users.svg' 
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen py-8">
      {/* Hero Section */}
      <div className="w-full max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900 leading-tight">
            ระบบจัดการร้านค้า<br />
            <span className="text-blue-600">ที่ใช้งานง่าย</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            POS Dashboard คือระบบจัดการร้านค้าที่ครบวงจร ช่วยให้คุณขายสินค้า จัดการสต็อก และติดตามผลประกอบการได้อย่างมีประสิทธิภาพ
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/pos">
              <Button variant="primary" className="w-full sm:w-auto">
                ไปหน้าขายสินค้า
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" className="w-full sm:w-auto">
                ดูรายงาน
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="w-full h-72 md:h-96 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-4">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-12 bg-blue-800 flex items-center px-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-white text-sm mx-auto">POS Dashboard</div>
                </div>
                <div className="mt-12 p-4 bg-white h-full">
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="aspect-square bg-blue-50 rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <Card className="max-w-6xl w-full p-8 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">ฟีเจอร์หลัก</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-blue-50 p-6 rounded-xl hover-scale card-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2 text-blue-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </Card>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-700 py-12 px-4 rounded-2xl w-full max-w-6xl">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-4">พร้อมเริ่มใช้งานแล้วหรือยัง?</h2>
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
