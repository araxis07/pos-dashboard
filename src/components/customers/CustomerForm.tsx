import { useState } from "react";
import { Button } from "@/components/common/Button";

export default function CustomerForm({ onAdd }: { onAdd: (cus: any) => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!form.name) return;
    onAdd({ ...form, id: Math.random().toString() });
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4 flex-wrap">
      <input className="border p-2 rounded w-40" required placeholder="ชื่อลูกค้า" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="border p-2 rounded w-40" placeholder="อีเมล" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="border p-2 rounded w-32" placeholder="เบอร์โทร" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      <Button type="submit">เพิ่มลูกค้า</Button>
    </form>
  );
}
