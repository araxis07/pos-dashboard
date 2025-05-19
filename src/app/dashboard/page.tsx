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
      trend: "up",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      label: "สินค้าคงคลัง", 
      value: "126 รายการ", 
      change: "-5 รายการ",
      trend: "down",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      )
    },
    { 
      label: "ลูกค้าทั้งหมด", 
      value: "52 คน", 
      change: "+3 คน",
      trend: "up",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      label: "อัตรากำไร", 
      value: "28.5%", 
      change: "+2.1%",
      trend: "up",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    <div className="space-y-6">
      {/* หัวข้อและเมนู */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900">แดชบอร์ดสรุปยอดขาย</h1>
          <p className="text-gray-500">ข้อมูลการขายและวิเคราะห์ล่าสุด ณ วันที่ {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/pos">
            <Button variant="outline" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              ไปหน้าขายสินค้า
            </Button>
          </Link>
          <Button variant="primary" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            ดาวน์โหลดรายงาน
          </Button>
        </div>
      </div>
      
      {/* ตัวเลขสรุป */}
      <StatsSummary stats={stats} />
      
      {/* กราฟยอดขาย */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">กราฟยอดขาย</h2>
          <div className="flex rounded-md overflow-hidden border">
            <button 
              className={`px-3 py-1 text-sm ${periodFilter === 'day' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setPeriodFilter('day')}
            >
              วัน
            </button>
            <button 
              className={`px-3 py-1 text-sm ${periodFilter === 'week' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setPeriodFilter('week')}
            >
              สัปดาห์
            </button>
            <button 
              className={`px-3 py-1 text-sm ${periodFilter === 'month' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setPeriodFilter('month')}
            >
              เดือน
            </button>
          </div>
        </div>
        
        <div className="h-80">
          <SalesChart data={chartData[periodFilter]} />
        </div>
      </Card>
      
      {/* สินค้าขายดี */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="สินค้าขายดี 5 อันดับ" className="h-full">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สินค้า</th>
                  <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">จำนวนขาย</th>
                  <th className="py-2 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ยอดเงิน</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bestSellingProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="py-3 px-3 whitespace-nowrap">{product.name}</td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">{product.sold} ชิ้น</td>
                    <td className="py-3 px-3 text-right whitespace-nowrap font-medium text-gray-900">{product.amount.toLocaleString('th-TH')} บาท</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <Button variant="outline" size="sm">ดูรายงานเพิ่มเติม</Button>
          </div>
        </Card>
        
        <Card title="ภาพรวมสินค้าคงคลัง" className="h-full">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">สินค้าใกล้หมด</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-medium">5 รายการ</span>
              </div>
              <p className="text-sm text-gray-600">มีสินค้า 5 รายการที่เหลือน้อยกว่า 10 ชิ้น ควรสั่งเพิ่ม</p>
              <Button variant="outline" size="sm" className="mt-2 text-xs">จัดการสต็อก</Button>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">สินค้าขายดีจากฐานลูกค้า</span>
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">12 รายการ</span>
              </div>
              <p className="text-sm text-gray-600">มีสินค้า 12 รายการที่ขายดีในกลุ่มลูกค้าประจำ</p>
              <Button variant="outline" size="sm" className="mt-2 text-xs">ดูรายละเอียด</Button>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">สินค้าใหม่</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs font-medium">3 รายการ</span>
              </div>
              <p className="text-sm text-gray-600">มีสินค้าใหม่ 3 รายการที่เพิ่มในสัปดาห์นี้</p>
              <Button variant="outline" size="sm" className="mt-2 text-xs">เพิ่มสินค้า</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
