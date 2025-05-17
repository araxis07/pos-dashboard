"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center shadow">
      <span className="font-bold text-xl tracking-wide">POS DASHBOARD</span>
      <div className="flex gap-6">
        <Link href="/dashboard" className="hover:text-yellow-300">แดชบอร์ด</Link>
        <Link href="/pos" className="hover:text-yellow-300">ขายสินค้า</Link>
        <Link href="/products" className="hover:text-yellow-300">สินค้า</Link>
        <Link href="/customers" className="hover:text-yellow-300">ลูกค้า</Link>
        <Link href="/users" className="hover:text-yellow-300">ผู้ใช้</Link>
      </div>
    </nav>
  );
}
