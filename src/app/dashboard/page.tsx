"use client";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import SalesChart from "@/components/dashboard/SalesChart";
import StatsSummary from "@/components/dashboard/StatsSummary";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  // สร้างข้อมูลสำหรับแสดงผลบนแดชบอร์ด (จำลองข้อมูล)
  const currentDate = new Date();
  const [periodFilter, setPeriodFilter] = useState<'day' | 'week' | 'month'>('day');
  
  // สร้างข้อมูลสำหรับกราฟย้อนหลัง 7 วัน
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(currentDate.getDate() - (6 - i));
    return {
      date: date.toISOString().slice(0, 10),
      total: Math.floor(Math.random() * 10000) + 10000 // สุ่มตัวเลขระหว่าง 10,000 - 20,000
    };
  });
  
  // สร้างข้อมูลสำหรับกราฟย้อนหลัง 4 สัปดาห์
  const last4Weeks = Array.from({ length: 4 }, (_, i) => {
    const date = new Date();
    date.setDate(currentDate.getDate() - ((3 - i) * 7));
    return {
      date: `สัปดาห์ที่ ${i + 1}`,
      total: Math.floor(Math.random() * 30000) + 50000 // สุ่มตัวเลขระหว่าง 50,000 - 80,000
    };
  });
  
  // สร้างข้อมูลสำหรับกราฟย้อนหลัง 6 เดือน
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(currentDate.getMonth() - (5 - i));
    const monthNames = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    return {
      date: monthNames[date.getMonth()],
      total: Math.floor(Math.random() * 100000) + 150000 // สุ่มตัวเลขระหว่าง 150,000 - 250,000
    };
  });
  
  const chartData = {
    day: last7Days,
    week: last4Weeks,
    month: last6Months
  };
    // สถิติสำหรับตัวเลขสรุป
  const stats = [
    { 
      label: "ยอดขายวันนี้", 
      value: "฿18,450", 
      change: "+12.3%",
      trend: "up" as const,
      icon: (
        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      label: "สินค้าคงคลัง", 
      value: "126 รายการ", 
      change: "-5 รายการ",
      trend: "down" as const,
      icon: (
        <svg className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      )
    },
    { 
      label: "ลูกค้าทั้งหมด", 
      value: "52 คน", 
      change: "+3 คน",
      trend: "up" as const,
      icon: (
        <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      label: "อัตรากำไร", 
      value: "28.5%", 
      change: "+2.1%",
      trend: "up" as const,
      icon: (
        <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];
  
  // สินค้าขายดี
  const bestSellingProducts = [
    { id: 1, name: "น้ำดื่ม", sold: 128, amount: 1280 },
    { id: 2, name: "ขนมปัง", sold: 75, amount: 1500 },
    { id: 3, name: "ขนมถุง", sold: 64, amount: 960 },
    { id: 4, name: "น้ำอัดลม", sold: 56, amount: 1120 },
    { id: 5, name: "บะหมี่กึ่งสำเร็จรูป", sold: 42, amount: 840 },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="space-y-8 p-6">
        {/* หัวข้อและเมนู */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              แดشบอร์ดสรุปยอดขาย
            </h1>
            <p className="text-gray-600 text-lg">
              ข้อมูลการขายและวิเคราะห์ล่าสุด ณ วันที่{' '}
              <span className="font-medium text-indigo-600">
                {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/pos">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border-indigo-200 text-indigo-700 hover:text-indigo-800"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                ไปหน้าขายสินค้า
              </Button>
            </Link>
            <Button 
              variant="primary" 
              size="sm"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              ดาวน์โหลดรายงาน
            </Button>
          </div>
        </div>
        
        {/* ตัวเลขสรุป */}
        <StatsSummary stats={stats} />
        
        {/* กราฟยอดขาย */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">กราฟยอดขาย</h2>
            </div>
            <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
              <button 
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  periodFilter === 'day' 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                    : 'bg-white hover:bg-gray-50 text-gray-700'
                }`}
                onClick={() => setPeriodFilter('day')}
              >
                รายวัน
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  periodFilter === 'week' 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                    : 'bg-white hover:bg-gray-50 text-gray-700'
                }`}
                onClick={() => setPeriodFilter('week')}
              >
                รายสัปดาห์
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  periodFilter === 'month' 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                    : 'bg-white hover:bg-gray-50 text-gray-700'
                }`}
                onClick={() => setPeriodFilter('month')}
              >
                รายเดือน
              </button>
            </div>
          </div>
          
          <div className="h-80 bg-gradient-to-br from-gray-50 to-white rounded-xl p-4">
            <SalesChart data={chartData[periodFilter]} />
          </div>
        </Card>        
        {/* สินค้าขายดี */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card 
            title="🏆 สินค้าขายดี 5 อันดับ" 
            className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl"
          >
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">สินค้า</th>
                    <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">จำนวนขาย</th>
                    <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">ยอดเงิน</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bestSellingProducts.map((product, index) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            index === 0 ? 'bg-yellow-500' : 
                            index === 1 ? 'bg-gray-400' : 
                            index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm font-medium">
                          {product.sold} ชิ้น
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap font-bold text-green-600">
                        ฿{product.amount.toLocaleString('th-TH')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-right">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border-indigo-200 text-indigo-700"
              >
                ดูรายงานเพิ่มเติม
              </Button>
            </div>
          </Card>
        
          <Card 
            title="📦 ภาพรวมสินค้าคงคลัง" 
            className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl"
          >
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold text-amber-800">สินค้าใกล้หมด</span>
                  </div>
                  <span className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm font-bold">5 รายการ</span>
                </div>
                <p className="text-sm text-amber-700 mb-3">มีสินค้า 5 รายการที่เหลือน้อยกว่า 10 ชิ้น ควรสั่งเพิ่ม</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200 text-xs"
                >
                  จัดการสต็อก
                </Button>
              </div>
            
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold text-green-800">สินค้าขายดี</span>
                  </div>
                  <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">12 รายการ</span>
                </div>
                <p className="text-sm text-green-700 mb-3">มีสินค้า 12 รายการที่ขายดีในกลุ่มลูกค้าประจำ</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-green-100 border-green-300 text-green-800 hover:bg-green-200 text-xs"
                >
                  ดูรายละเอียด
                </Button>
              </div>
            
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-semibold text-purple-800">สินค้าใหม่</span>
                  </div>
                  <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-bold">3 รายการ</span>
                </div>
                <p className="text-sm text-purple-700 mb-3">มีสินค้าใหม่ 3 รายการที่เพิ่มในสัปดาห์นี้</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200 text-xs"
                >
                  เพิ่มสินค้า
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
