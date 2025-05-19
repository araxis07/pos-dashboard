import { formatDateTime, formatCurrency } from "@/components/utils/formatter";

interface Transaction {
  id: string;
  customerId?: string;
  customerName?: string;
  amount: number;
  items: number;
  date: Date;
  paymentMethod: string;
  reference?: string;
  status: "completed" | "refunded" | "canceled";
}

interface TransactionTableProps {
  transactions: Transaction[];
  onViewDetails?: (transaction: Transaction) => void;
  onPrintReceipt?: (transactionId: string) => void;
}

export default function TransactionTable({ 
  transactions, 
  onViewDetails, 
  onPrintReceipt 
}: TransactionTableProps) {
  
  // No transactions state
  if (!transactions.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="font-medium">ไม่มีข้อมูลรายการขาย</p>
        <p className="text-sm">กรุณาเลือกช่วงเวลาอื่นหรือปรับตัวกรอง</p>
      </div>
    );
  }
  
  // Get status badge style
  const getStatusBadgeStyle = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'refunded':
        return 'bg-orange-100 text-orange-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get payment method display text
  const getPaymentMethodText = (method: string) => {
    switch(method) {
      case 'cash': return 'เงินสด';
      case 'card': return 'บัตรเครดิต';
      case 'promptpay': return 'พร้อมเพย์';
      default: return method;
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-blue-50 text-left text-blue-900">
            <th className="px-4 py-3 text-sm font-semibold">หมายเลข</th>
            <th className="px-4 py-3 text-sm font-semibold">วันที่</th>
            <th className="px-4 py-3 text-sm font-semibold">ลูกค้า</th>
            <th className="px-4 py-3 text-sm font-semibold">ยอดขาย</th>
            <th className="px-4 py-3 text-sm font-semibold">จำนวนสินค้า</th>
            <th className="px-4 py-3 text-sm font-semibold">การชำระเงิน</th>
            <th className="px-4 py-3 text-sm font-semibold">สถานะ</th>
            <th className="px-4 py-3 text-sm font-semibold">จัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map(transaction => (
            <tr key={transaction.id} className="hover:bg-blue-50/30 transition group">
              <td className="px-4 py-3">
                <div>
                  <span className="font-mono text-sm font-medium">#{transaction.reference || transaction.id.substring(0, 6)}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">
                {formatDateTime(transaction.date)}
              </td>
              <td className="px-4 py-3 text-sm">
                {transaction.customerName || 'ลูกค้าทั่วไป'}
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">
                {formatCurrency(transaction.amount)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {transaction.items} ชิ้น
              </td>
              <td className="px-4 py-3 text-sm">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  {getPaymentMethodText(transaction.paymentMethod)}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyle(transaction.status)}`}>
                  {transaction.status === "completed" ? 'สำเร็จ' : 
                   transaction.status === "refunded" ? 'คืนเงิน' : 
                   transaction.status === "canceled" ? 'ยกเลิก' : transaction.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {onPrintReceipt && (
                    <button 
                      onClick={() => onPrintReceipt(transaction.id)}
                      className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition"
                      title="พิมพ์ใบเสร็จ"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                    </button>
                  )}
                  {onViewDetails && (
                    <button 
                      onClick={() => onViewDetails(transaction)}
                      className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition"
                      title="ดูรายละเอียด"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
