import { formatPhone, formatDateTime } from "@/components/utils/formatter";
import type { Customer } from "@/components/customers/CustomerForm";

interface CustomerTableProps {
  customers: Customer[];
  onEdit?: (customer: Customer) => void;
  onDelete?: (customerId: string) => void;
  onViewTransactions?: (customerId: string) => void;
}

export default function CustomerTable({ 
  customers, 
  onEdit, 
  onDelete, 
  onViewTransactions 
}: CustomerTableProps) {
  
  // No customers state
  if (!customers.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <p className="font-medium">ไม่มีข้อมูลลูกค้า</p>
        <p className="text-sm">กรุณาเพิ่มข้อมูลลูกค้าใหม่หรือลองค้นหาด้วยคำค้นอื่น</p>
      </div>
    );
  }
  
  // Get member type badge style
  const getMemberTypeStyle = (type?: string) => {
    switch(type?.toLowerCase()) {
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'vip':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-blue-50 text-left text-blue-900">
            <th className="px-4 py-3 text-sm font-semibold">ลูกค้า</th>
            <th className="px-4 py-3 text-sm font-semibold">ติดต่อ</th>
            <th className="px-4 py-3 text-sm font-semibold">ประเภทสมาชิก</th>
            <th className="px-4 py-3 text-sm font-semibold">ข้อมูลเพิ่มเติม</th>
            <th className="px-4 py-3 text-sm font-semibold">จัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {customers.map(customer => (
            <tr key={customer.id} className="hover:bg-blue-50/30 transition group">
              <td className="px-4 py-3">
                <div>
                  <div className="font-medium text-gray-900">{customer.name}</div>
                  {customer.lastVisit && (
                    <div className="text-xs text-gray-500 mt-1">
                      ใช้บริการล่าสุด: {formatDateTime(customer.lastVisit)}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="space-y-1">
                  {customer.phone && (
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm">{formatPhone(customer.phone)}</span>
                    </div>
                  )}
                  {customer.email && (
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm truncate max-w-[180px]">{customer.email}</span>
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMemberTypeStyle(customer.memberType)}`}>
                  {customer.memberType === "standard" ? "ทั่วไป" : 
                   customer.memberType === "premium" ? "พรีเมียม" : 
                   customer.memberType === "vip" ? "VIP" : 
                   customer.memberType || "ทั่วไป"}
                </span>
                {customer.totalPurchase !== undefined && (
                  <div className="text-xs text-gray-500 mt-1">
                    ยอดซื้อสะสม: {customer.totalPurchase.toLocaleString('th-TH')} บาท
                  </div>
                )}
              </td>
              <td className="px-4 py-3">
                {customer.address && (
                  <div className="text-xs text-gray-500 line-clamp-2">{customer.address}</div>
                )}
                {customer.notes && (
                  <div className="text-xs italic text-gray-500 line-clamp-1 mt-1">{customer.notes}</div>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {onViewTransactions && (
                    <button 
                      onClick={() => onViewTransactions(customer.id)}
                      className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition"
                      title="ดูประวัติการซื้อ"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </button>
                  )}
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(customer)}
                      className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition"
                      title="แก้ไขข้อมูลลูกค้า"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(customer.id)}
                      className="p-1.5 text-red-600 hover:bg-red-100 rounded transition"
                      title="ลบลูกค้า"
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
