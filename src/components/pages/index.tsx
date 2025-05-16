import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-xl mx-auto mt-20">
      <Card>
        <h1 className="text-3xl font-bold mb-2">ยินดีต้อนรับสู่ POS Dashboard</h1>
        <p className="text-gray-600 mb-6">ระบบบริหารร้านค้าและสรุปยอดขายในที่เดียว</p>
        <Link href="/dashboard">
          <Button>เริ่มต้นใช้งาน</Button>
        </Link>
      </Card>
    </div>
  );
}
