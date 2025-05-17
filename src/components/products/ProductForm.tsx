import { useState } from "react";
import { Button } from "@/components/common/Button";

export default function ProductForm({ onAdd }: { onAdd: (prod: any) => void }) {
  const [form, setForm] = useState({ name: "", price: "", stock: "", barcode: "" });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) return;
    onAdd({ ...form, id: Math.random().toString() });
    setForm({ name: "", price: "", stock: "", barcode: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 mb-4 items-end">
      <div>
        <label className="block text-sm font-medium mb-1">ชื่อสินค้า</label>
        <input className="border p-2 rounded w-40 focus:ring-2 focus:ring-blue-300" required placeholder="ชื่อสินค้า" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">ราคา</label>
        <input className="border p-2 rounded w-24 focus:ring-2 focus:ring-blue-300" required type="number" min={0} placeholder="ราคา" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">จำนวน</label>
        <input className="border p-2 rounded w-20 focus:ring-2 focus:ring-blue-300" required type="number" min={0} placeholder="จำนวน" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">บาร์โค้ด</label>
        <input className="border p-2 rounded w-32 focus:ring-2 focus:ring-blue-300" placeholder="บาร์โค้ด" value={form.barcode} onChange={e => setForm({ ...form, barcode: e.target.value })} />
      </div>
      <Button type="submit" className="mt-5">เพิ่มสินค้า</Button>
    </form>
  );
}
