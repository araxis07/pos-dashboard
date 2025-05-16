import { Card } from "@/components/common/Card";
import SalesChart from "@/components/dashboard/SalesChart";
import StatsSummary from "@/components/dashboard/StatsSummary";

export default function DashboardPage() {
  // ตัวอย่าง mock data
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
      <StatsSummary stats={stats} />
      <Card>
        <h2 className="text-xl font-bold mb-4">กราฟยอดขายรายวัน</h2>
        <SalesChart data={salesData} />
      </Card>
    </div>
  );
}
