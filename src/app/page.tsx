import { Card } from "@/components/common/Card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="max-w-xl w-full text-center p-8">
        <h1 className="text-2xl font-bold mb-2">POS Dashboard</h1>
        <p className="mb-4">ระบบจัดการรายงานสำหรับร้าน & รายงานข้อมูลอย่างครบถ้วน</p>
        <Link href="/pos">
          <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 transition">
            ไปหน้าขายสินค้า
          </button>
        </Link>
      </Card>
    </div>
  );
}
