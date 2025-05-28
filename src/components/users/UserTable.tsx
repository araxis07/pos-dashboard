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
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">ไม่มีข้อมูลผู้ใช้</h3>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">ไม่พบผู้ใช้ที่ตรงกับเงื่อนไขการค้นหา ลองปรับเปลี่ยนคำค้นหาหรือตัวกรอง</p>
        <button 
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          รีเฟรช
        </button>
      </div>
    );
  }
  
  // Get role display name with emoji
  const getRoleDisplayText = (role: string) => {
    switch(role) {
      case 'admin': return '👑 ผู้ดูแลระบบ';
      case 'manager': return '📊 ผู้จัดการ';
      case 'cashier': return '💰 แคชเชียร์';
      case 'staff': return '👤 พนักงาน';
      default: return role;
    }
  };
  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case 'admin': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'manager': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cashier': return 'bg-green-100 text-green-800 border-green-200';
      case 'staff': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-left text-white">
            <th className="px-6 py-4 text-sm font-semibold tracking-wider uppercase">ผู้ใช้</th>
            <th className="px-6 py-4 text-sm font-semibold tracking-wider uppercase">ข้อมูลติดต่อ</th>
            <th className="px-6 py-4 text-sm font-semibold tracking-wider uppercase">บทบาท</th>
            <th className="px-6 py-4 text-sm font-semibold tracking-wider uppercase">สถานะ</th>
            <th className="px-6 py-4 text-sm font-semibold tracking-wider uppercase">เข้าสู่ระบบล่าสุด</th>
            <th className="px-6 py-4 text-sm font-semibold tracking-wider uppercase">จัดการ</th>
          </tr>
        </thead>        <tbody className="divide-y divide-gray-100 bg-white">
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-200 group">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.fullName} 
                      className="h-10 w-10 rounded-full object-cover mr-4 border-2 border-gray-200 group-hover:border-blue-300 transition-colors" 
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 text-blue-600 flex items-center justify-center mr-4 text-sm font-semibold border border-blue-200 group-hover:border-blue-400 transition-colors">
                      {getInitials(user.fullName)}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{user.fullName}</div>
                    <div className="text-sm text-gray-500">@{user.username}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                {user.email && (
                  <div className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{user.email}</div>
                )}
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(user.role)} group-hover:shadow-sm transition-all duration-200`}>
                  {getRoleDisplayText(user.role)}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800 border-green-200 group-hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-800 border-gray-200 group-hover:bg-gray-200'
                  }`}>
                    <span className={`mr-1 ${user.status === 'active' ? '🟢' : '🔴'}`}></span>
                    {user.status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                  </span>
                  {onToggleStatus && (
                    <button 
                      onClick={() => onToggleStatus(user.id, user.status === 'active' ? 'inactive' : 'active')}
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                    >
                      {user.status === 'active' ? 'ปิด' : 'เปิด'}
                    </button>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                {user.lastLogin ? formatDateTime(user.lastLogin) : (
                  <span className="text-gray-400 italic">ยังไม่เคยเข้าสู่ระบบ</span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(user)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-105"
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
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-105"
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
