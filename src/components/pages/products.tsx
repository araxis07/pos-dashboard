import { useState } from "react";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
import { Card } from "@/components/common/Card";

export default function ProductsPage() {
  const [products, setProducts] = useState([
    { id: "1", name: "น้ำดื่ม", price: 10, stock: 50, barcode: "P1001" },
    { id: "2", name: "ขนมปัง", price: 20, stock: 30, barcode: "P1002" },
  ]);
  const handleAdd = (prod: any) => setProducts(prev => [...prev, prod]);

  return (
    <div>
      <Card>
        <h1 className="text-xl font-bold mb-4">จัดการสินค้า</h1>
        <ProductForm onAdd={handleAdd} />
        <ProductTable products={products} />
      </Card>
    </div>
  );
}
