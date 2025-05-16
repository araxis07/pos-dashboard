export default function ProductTable({ products }: { products: any[] }) {
  return (
    <table className="min-w-full bg-white shadow rounded-xl">
      <thead>
        <tr>
          <th className="px-4 py-2">ชื่อสินค้า</th>
          <th className="px-4 py-2">ราคา</th>
          <th className="px-4 py-2">Stock</th>
          <th className="px-4 py-2">บาร์โค้ด</th>
        </tr>
      </thead>
      <tbody>
        {products.map(prod => (
          <tr key={prod.id} className="text-center border-t">
            <td className="px-4 py-2">{prod.name}</td>
            <td className="px-4 py-2">{prod.price} บาท</td>
            <td className="px-4 py-2">{prod.stock}</td>
            <td className="px-4 py-2">{prod.barcode || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
