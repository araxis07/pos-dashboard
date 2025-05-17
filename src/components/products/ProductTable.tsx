import { formatCurrency } from "@/components/utils/formatter";

export default function ProductTable({ products }: { products: any[] }) {
  if (!products.length)
    return (
      <div className="text-center text-gray-400 py-8">ไม่มีข้อมูลสินค้า</div>
    );
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-xl">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-4 py-2">ชื่อสินค้า</th>
            <th className="px-4 py-2">ราคา</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">บาร์โค้ด</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id} className="text-center border-t hover:bg-blue-50 transition">
              <td className="px-4 py-2">{prod.name}</td>
              <td className="px-4 py-2">{formatCurrency(Number(prod.price))}</td>
              <td className="px-4 py-2">{prod.stock}</td>
              <td className="px-4 py-2">{prod.barcode || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
