"use client";
import { useState } from "react";
import CustomerTable from "@/components/customers/CustomerTable";
import CustomerForm from "@/components/customers/CustomerForm";
import { Card } from "@/components/common/Card";
import Link from "next/link";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    { id: "1", name: "สมชาย ใจดี", email: "somchai@email.com", phone: "0812345678" },
    { id: "2", name: "สุดารัตน์ ยิ้มแย้ม", email: "suda@email.com", phone: "0898765432" },
  ]);
  const handleAdd = (cus: any) => setCustomers(prev => [...prev, cus]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">จัดการลูกค้า</h1>
        <Link href="/dashboard" className="text-blue-600 underline hover:text-blue-900">กลับสู่แดชบอร์ด</Link>
      </div>
      <Card>
        <CustomerForm onAdd={handleAdd} />
        <CustomerTable customers={customers} />
      </Card>
    </div>
  );
}
