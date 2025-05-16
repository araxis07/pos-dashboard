"use client";
import { useState } from "react";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
import { Card } from "@/components/common/Card";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([
    { id: "1", name: "น้ำดื่ม", price: 10, stock: 50, barcode: "P1001" },
    { id: "2", name: "ขนมปัง", price: 20, stock: 30, barcode: "P1002" },
  ]);
  const handleAdd = (prod: any) => setProducts(prev => [...prev, prod]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">จัดการสินค้า</h1>
        <Link href="/pos" className="text-blue-600 underline hover:text-blue-900">ไปที่ POS</Link>
      </div>
      <Card>
        <ProductForm onAdd={handleAdd} />
        <ProductTable products={products} />
      </Card>
    </div>
  );
}
