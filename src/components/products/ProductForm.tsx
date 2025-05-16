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
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4 flex-wrap">
      <input className="border p-2 rounded w-40" required placeholder="ชื่อสินค้า" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="border p-2 rounded w-24" required type="number" placeholder="ราคา" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
      <input className="border p-2 rounded w-20" required type="number" placeholder="จำนวน" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
      <input className="border p-2 rounded w-32" placeholder="บาร์โค้ด" value={form.barcode} onChange={e => setForm({ ...form, barcode: e.target.value })} />
      <Button type="submit">เพิ่มสินค้า</Button>
    </form>
  );
}
