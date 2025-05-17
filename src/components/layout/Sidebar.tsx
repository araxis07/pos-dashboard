"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="bg-white shadow h-full w-56 p-6 hidden md:block">
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="hover:text-blue-700">
          แดชบอร์ด
        </Link>
        <Link href="/pos" className="hover:text-blue-700">
          ขายสินค้า
        </Link>
        <Link href="/products" className="hover:text-blue-700">
          สินค้า
        </Link>
        <Link href="/customers" className="hover:text-blue-700">
          ลูกค้า
        </Link>
        <Link href="/users" className="hover:text-blue-700">
          ผู้ใช้
        </Link>
      </nav>
    </aside>
  );
}
