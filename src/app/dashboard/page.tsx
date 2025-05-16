import { Card } from "@/components/common/Card";
import SalesChart from "@/components/dashboard/SalesChart";
import StatsSummary from "@/components/dashboard/StatsSummary";
import Link from "next/link";

export default function DashboardPage() {
  const salesData = [
    { date: "2024-05-10", total: 12000 },
    { date: "2024-05-11", total: 15000 },
    { date: "2024-05-12", total: 18000 },
  ];
  const stats = [
    { label: "ยอดขายวันนี้", value: "18,000 บาท" },
    { label: "สินค้าคงคลัง", value: "126 รายการ" },
    { label: "ลูกค้าทั้งหมด", value: "52 คน" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">แดชบอร์ดสรุปยอดขาย</h1>
        <Link href="/pos" className="text-blue-600 underline hover:text-blue-900">ไปที่หน้าขายสินค้า</Link>
      </div>
      <StatsSummary stats={stats} />
      <Card>
        <h2 className="text-xl font-bold mb-4">กราฟยอดขายรายวัน</h2>
        <SalesChart data={salesData} />
      </Card>
    </div>
  );
}
