import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-lg text-center shadow-2xl">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-3">POS Dashboard</h1>
        <p className="text-lg text-gray-600 mb-7">ระบบจัดการขายหน้าร้าน & รายงานข้อมูลอย่างครบถ้วน</p>
        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button variant="primary">ไปหน้าแดชบอร์ด</Button>
          </Link>
          <Link href="/pos">
            <Button variant="secondary">ไปหน้าขายสินค้า</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
