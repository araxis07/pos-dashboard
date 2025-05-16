import { useState } from "react";
import CustomerTable from "@/components/customers/CustomerTable";
import CustomerForm from "@/components/customers/CustomerForm";
import { Card } from "@/components/common/Card";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    { id: "1", name: "สมชาย ใจดี", email: "somchai@email.com", phone: "0812345678" },
    { id: "2", name: "สุดารัตน์ ยิ้มแย้ม", email: "suda@email.com", phone: "0898765432" },
  ]);
  const handleAdd = (cus: any) => setCustomers(prev => [...prev, cus]);

  return (
    <div>
      <Card>
        <h1 className="text-xl font-bold mb-4">จัดการลูกค้า</h1>
        <CustomerForm onAdd={handleAdd} />
        <CustomerTable customers={customers} />
      </Card>
    </div>
  );
}
