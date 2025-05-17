export default function CustomerTable({ customers }: { customers: any[] }) {
  if (!customers.length)
    return (
      <div className="text-center text-gray-400 py-8">ไม่มีข้อมูลลูกค้า</div>
    );
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-xl">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-4 py-2">ชื่อ</th>
            <th className="px-4 py-2">อีเมล</th>
            <th className="px-4 py-2">เบอร์โทร</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(cus => (
            <tr key={cus.id} className="text-center border-t hover:bg-blue-50 transition">
              <td className="px-4 py-2">{cus.name}</td>
              <td className="px-4 py-2">{cus.email || "-"}</td>
              <td className="px-4 py-2">{cus.phone || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
