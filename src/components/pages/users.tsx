import { Card } from "@/components/common/Card";

export default function UsersPage() {
  const users = [
    { id: "1", name: "admin", role: "แอดมิน" },
    { id: "2", name: "cashier", role: "แคชเชียร์" },
  ];
  return (
    <div>
      <Card>
        <h1 className="text-xl font-bold mb-4">จัดการผู้ใช้</h1>
        <table className="min-w-full bg-white shadow rounded-xl">
          <thead>
            <tr>
              <th className="px-4 py-2">ชื่อผู้ใช้</th>
              <th className="px-4 py-2">สิทธิ์</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="text-center border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
