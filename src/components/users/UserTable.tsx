import { formatDateTime } from "@/components/utils/formatter";

interface User {
  id: string;
  username: string;
  fullName: string;
  email?: string;
  role: string;
  status: "active" | "inactive";
  avatar?: string;
  lastLogin?: Date;
}

interface UserTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
  onToggleStatus?: (userId: string, newStatus: "active" | "inactive") => void;
}

export default function UserTable({ 
  users, 
  onEdit, 
  onDelete, 
  onToggleStatus 
}: UserTableProps) {
  
  // No users state
  if (!users.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p className="font-medium">ไม่มีข้อมูลผู้ใช้</p>
        <p className="text-sm">กรุณาเพิ่มผู้ใช้ใหม่หรือลองค้นหาด้วยคำค้นอื่น</p>
      </div>
    );
  }
  
  // Get role display name
  const getRoleDisplayText = (role: string) => {
    switch(role) {
      case 'admin': return 'ผู้ดูแลระบบ';
      case 'manager': return 'ผู้จัดการ';
      case 'cashier': return 'แคชเชียร์';
      case 'staff': return 'พนักงาน';
      default: return role;
    }
  };
  
  // Get role badge style
  const getRoleBadgeStyle = (role: string) => {
    switch(role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-purple-100 text-purple-800';
      case 'cashier': return 'bg-green-100 text-green-800';
      case 'staff': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-blue-50 text-left text-blue-900">
            <th className="px-4 py-3 text-sm font-semibold">ผู้ใช้</th>
            <th className="px-4 py-3 text-sm font-semibold">ข้อมูลติดต่อ</th>
            <th className="px-4 py-3 text-sm font-semibold">บทบาท</th>
            <th className="px-4 py-3 text-sm font-semibold">สถานะ</th>
            <th className="px-4 py-3 text-sm font-semibold">เข้าสู่ระบบล่าสุด</th>
            <th className="px-4 py-3 text-sm font-semibold">จัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map(user => (
            <tr key={user.id} className="hover:bg-blue-50/30 transition group">
              <td className="px-4 py-3">
                <div className="flex items-center">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.fullName} 
                      className="h-8 w-8 rounded-full object-cover mr-3 border border-gray-200" 
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm font-medium">
                      {getInitials(user.fullName)}
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900">{user.fullName}</div>
                    <div className="text-xs text-gray-500">@{user.username}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                {user.email && (
                  <div className="text-sm text-gray-900">{user.email}</div>
                )}
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeStyle(user.role)}`}>
                  {getRoleDisplayText(user.role)}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                </span>
                {onToggleStatus && (
                  <button 
                    onClick={() => onToggleStatus(user.id, user.status === 'active' ? 'inactive' : 'active')}
                    className="ml-2 text-xs text-blue-600 hover:underline"
                  >
                    {user.status === 'active' ? 'ปิด' : 'เปิด'}
                  </button>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {user.lastLogin ? formatDateTime(user.lastLogin) : '-'}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(user)}
                      className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition"
                      title="แก้ไขผู้ใช้"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && user.role !== 'admin' && (
                    <button 
                      onClick={() => onDelete(user.id)}
                      className="p-1.5 text-red-600 hover:bg-red-100 rounded transition"
                      title="ลบผู้ใช้"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
