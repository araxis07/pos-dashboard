export default function CustomerTable({ customers }: { customers: any[] }) {
  return (
    <table className="min-w-full bg-white shadow rounded-xl">
      <thead>
        <tr>
          <th className="px-4 py-2">ชื่อ</th>
          <th className="px-4 py-2">อีเมล</th>
          <th className="px-4 py-2">เบอร์โทร</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(cus => (
          <tr key={cus.id} className="text-center border-t">
            <td className="px-4 py-2">{cus.name}</td>
            <td className="px-4 py-2">{cus.email || "-"}</td>
            <td className="px-4 py-2">{cus.phone || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
