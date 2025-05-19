"use client";
import { useState, useEffect } from "react";
import TransactionTable from "@/components/reports/TransactionTable";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import Link from "next/link";
import toast from "react-hot-toast";
import { useLocalStorage } from "@/components/utils/hooks";
import { formatCurrency, formatDateTime } from "@/components/utils/formatter";

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
  products?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

export default function ReportsPage() {
  // Initialize transactions state from local storage with sample data
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>("pos-transactions", [
    { 
      id: "t1", 
      customerId: "1", 
      customerName: "สมชาย ใจดี", 
      amount: 500, 
      items: 3, 
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), 
      paymentMethod: "cash", 
      reference: "INV001",
      status: "completed",
      products: [
        { id: "1", name: "น้ำดื่ม", price: 10, quantity: 2 },
        { id: "5", name: "มาม่า", price: 6, quantity: 1 },
      ]
    },
    { 
      id: "t2", 
      customerId: "1", 
      customerName: "สมชาย ใจดี", 
      amount: 2000, 
      items: 5, 
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), 
      paymentMethod: "card", 
      reference: "INV002", 
      status: "completed",
      products: [
        { id: "3", name: "ขนมถุง", price: 15, quantity: 3 },
        { id: "4", name: "น้ำอัดลม", price: 20, quantity: 2 },
      ]
    },
    { 
      id: "t3", 
      customerId: "2", 
      customerName: "สุดารัตน์ ยิ้มแย้ม", 
      amount: 3500, 
      items: 7, 
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), 
      paymentMethod: "promptpay", 
      reference: "INV003", 
      status: "completed",
      products: [
        { id: "2", name: "ขนมปัง", price: 20, quantity: 2 },
        { id: "3", name: "ขนมถุง", price: 15, quantity: 5 },
      ]
    },
    { 
      id: "t4", 
      customerId: "2", 
      customerName: "สุดารัตน์ ยิ้มแย้ม", 
      amount: 5250, 
      items: 10, 
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 
      paymentMethod: "card", 
      reference: "INV004", 
      status: "refunded",
      products: [
        { id: "1", name: "น้ำดื่ม", price: 10, quantity: 5 },
        { id: "2", name: "ขนมปัง", price: 20, quantity: 3 },
        { id: "5", name: "มาม่า", price: 6, quantity: 2 },
      ]
    },
    { 
      id: "t5", 
      customerId: "3", 
      customerName: "วิทยา รักษ์ดี", 
      amount: 12000, 
      items: 15, 
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), 
      paymentMethod: "card", 
      reference: "INV005", 
      status: "completed",
      products: [
        { id: "4", name: "น้ำอัดลม", price: 20, quantity: 10 },
        { id: "2", name: "ขนมปัง", price: 20, quantity: 5 },
      ]
    },
    { 
      id: "t6", 
      customerId: "3", 
      customerName: "วิทยา รักษ์ดี", 
      amount: 13000, 
      items: 8, 
      date: new Date(), 
      paymentMethod: "promptpay", 
      reference: "INV006", 
      status: "canceled",
      products: [
        { id: "1", name: "น้ำดื่ม", price: 10, quantity: 3 },
        { id: "2", name: "ขนมปัง", price: 20, quantity: 5 },
      ]
    },
  ]);
  
  // UI state
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [printReceiptId, setPrintReceiptId] = useState<string | null>(null);
  
  // Set default date range to this month
  useEffect(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    setStartDate(firstDay.toISOString().split('T')[0]);
    setEndDate(lastDay.toISOString().split('T')[0]);
  }, []);
  
  // Handle printing receipt
  const handlePrintReceipt = (transactionId: string) => {
    setPrintReceiptId(transactionId);
    setTimeout(() => {
      toast.success('พิมพ์ใบเสร็จสำเร็จแล้ว');
      setPrintReceiptId(null);
    }, 1500);
  };
  
  // Filter transactions based on period and filters
  const getFilteredTransactions = () => {
    let filteredTx = [...transactions];
    
    // Filter by status
    if (statusFilter !== 'all') {
      filteredTx = filteredTx.filter(tx => tx.status === statusFilter);
    }
    
    // Filter by payment method
    if (paymentFilter !== 'all') {
      filteredTx = filteredTx.filter(tx => tx.paymentMethod === paymentFilter);
    }
    
    // Filter by period
    if (selectedPeriod === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      filteredTx = filteredTx.filter(tx => new Date(tx.date) >= today);
    } else if (selectedPeriod === 'yesterday') {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      filteredTx = filteredTx.filter(tx => 
        new Date(tx.date) >= yesterday && 
        new Date(tx.date) < today
      );
    } else if (selectedPeriod === 'thisWeek') {
      const today = new Date();
      const firstDayOfWeek = new Date(today);
      const day = today.getDay();
      const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
      firstDayOfWeek.setDate(diff);
      firstDayOfWeek.setHours(0, 0, 0, 0);
      
      filteredTx = filteredTx.filter(tx => new Date(tx.date) >= firstDayOfWeek);
    } else if (selectedPeriod === 'thisMonth') {
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      filteredTx = filteredTx.filter(tx => new Date(tx.date) >= firstDayOfMonth);
    } else if (selectedPeriod === 'custom' && startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      
      filteredTx = filteredTx.filter(tx => 
        new Date(tx.date) >= start && 
        new Date(tx.date) <= end
      );
    }
    
    // Sort by date, newest first
    return filteredTx.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };
  
  const filteredTransactions = getFilteredTransactions();
  
  // Calculate summary
  const totalSales = filteredTransactions
    .filter(tx => tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalRefunds = filteredTransactions
    .filter(tx => tx.status === 'refunded')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalTransactions = filteredTransactions.length;
  
  const averageTicket = filteredTransactions.length > 0 
    ? totalSales / filteredTransactions.filter(tx => tx.status === 'completed').length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900">รายงานการขาย</h1>
          <p className="text-gray-500">ข้อมูลรายการขายทั้งหมด {transactions.length} รายการ</p>
        </div>
        
        <div className="flex gap-2">
          <Link href="/dashboard">
            <Button 
              variant="outline" 
              size="sm"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3m0 0l3 3m-3-3v12m6-2v2m0-6V8m0 6h-4m8 0a8 8 0 10-16 0 8 8 0 0016 0z" />
                </svg>
              }
            >
              กลับสู่แดชบอร์ด
            </Button>
          </Link>
          
          <Button 
            variant="primary"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            }
            onClick={() => toast.success("ดาวน์โหลดรายงานสำเร็จแล้ว")}
          >
            ส่งออก Excel
          </Button>
        </div>
      </div>
      
      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">ยอดขายรวม</h3>
          <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalSales)}</p>
          <div className="mt-1 text-xs font-medium text-green-600">
            <span>จำนวน {filteredTransactions.filter(tx => tx.status === 'completed').length} รายการ</span>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">ยอดเฉลี่ยต่อบิล</h3>
          <p className="text-2xl font-bold text-blue-900">{formatCurrency(averageTicket)}</p>
          <div className="mt-1 text-xs text-gray-500">
            <span>จากบิลที่สำเร็จ</span>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">ยอดคืนสินค้า</h3>
          <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalRefunds)}</p>
          <div className="mt-1 text-xs font-medium text-red-600">
            <span>จำนวน {filteredTransactions.filter(tx => tx.status === 'refunded').length} รายการ</span>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">ยอดขายสุทธิ</h3>
          <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalSales - totalRefunds)}</p>
          <div className="mt-1 text-xs text-gray-500">
            <span>หลังหักยอดคืนสินค้า</span>
          </div>
        </Card>
      </div>
      
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Period filter */}
          <div className="md:w-48">
            <label className="block text-xs font-medium text-gray-700 mb-1">ช่วงเวลา</label>
            <select
              value={selectedPeriod}
              onChange={e => setSelectedPeriod(e.target.value)}
              className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="all">ทั้งหมด</option>
              <option value="today">วันนี้</option>
              <option value="yesterday">เมื่อวาน</option>
              <option value="thisWeek">สัปดาห์นี้</option>
              <option value="thisMonth">เดือนนี้</option>
              <option value="custom">กำหนดเอง</option>
            </select>
          </div>
          
          {/* Date range for custom period */}
          {selectedPeriod === 'custom' && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">ตั้งแต่วันที่</label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">ถึงวันที่</label>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </>
          )}
          
          {/* Status filter */}
          <div className="md:w-48">
            <label className="block text-xs font-medium text-gray-700 mb-1">สถานะ</label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="completed">สำเร็จ</option>
              <option value="refunded">คืนเงิน</option>
              <option value="canceled">ยกเลิก</option>
            </select>
          </div>
          
          {/* Payment method filter */}
          <div className="md:w-48">
            <label className="block text-xs font-medium text-gray-700 mb-1">การชำระเงิน</label>
            <select
              value={paymentFilter}
              onChange={e => setPaymentFilter(e.target.value)}
              className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="all">ทุกวิธี</option>
              <option value="cash">เงินสด</option>
              <option value="card">บัตรเครดิต</option>
              <option value="promptpay">พร้อมเพย์</option>
            </select>
          </div>
        </div>
      </Card>
      
      {/* Transactions table */}
      <Card>
        <TransactionTable 
          transactions={filteredTransactions} 
          onViewDetails={setSelectedTransaction}
          onPrintReceipt={handlePrintReceipt}
        />
      </Card>
      
      {/* Transaction details modal */}
      <Modal
        open={selectedTransaction !== null}
        onClose={() => setSelectedTransaction(null)}
        title={`รายละเอียดรายการ #${selectedTransaction?.reference || ''}`}
        size="md"
      >
        {selectedTransaction && (
          <div className="py-4">
            <div className="border-b pb-4 mb-4">
              <div className="flex flex-col md:flex-row md:justify-between gap-2">
                <div>
                  <p className="text-xs text-gray-500">วันที่และเวลา</p>
                  <p className="font-medium">{formatDateTime(selectedTransaction.date)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">สถานะ</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedTransaction.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : selectedTransaction.status === 'refunded'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedTransaction.status === "completed" ? 'สำเร็จ' : 
                    selectedTransaction.status === "refunded" ? 'คืนเงิน' : 
                    selectedTransaction.status === "canceled" ? 'ยกเลิก' : selectedTransaction.status}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex flex-col md:flex-row md:justify-between gap-2">
                <div>
                  <p className="text-xs text-gray-500">ลูกค้า</p>
                  <p className="font-medium">{selectedTransaction.customerName || 'ลูกค้าทั่วไป'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">วิธีชำระเงิน</p>
                  <p className="font-medium">
                    {selectedTransaction.paymentMethod === 'cash' ? 'เงินสด' : 
                    selectedTransaction.paymentMethod === 'card' ? 'บัตรเครดิต' : 
                    selectedTransaction.paymentMethod === 'promptpay' ? 'พร้อมเพย์' : selectedTransaction.paymentMethod}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Products */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">รายการสินค้า</h3>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="grid grid-cols-12 text-xs text-gray-500 mb-1">
                  <div className="col-span-6">สินค้า</div>
                  <div className="col-span-2 text-right">ราคา</div>
                  <div className="col-span-2 text-right">จำนวน</div>
                  <div className="col-span-2 text-right">รวม</div>
                </div>
                {selectedTransaction.products?.map(product => (
                  <div key={product.id} className="grid grid-cols-12 py-1 border-t border-gray-200 text-sm">
                    <div className="col-span-6">{product.name}</div>
                    <div className="col-span-2 text-right">{formatCurrency(product.price)}</div>
                    <div className="col-span-2 text-right">{product.quantity}</div>
                    <div className="col-span-2 text-right font-medium">{formatCurrency(product.price * product.quantity)}</div>
                  </div>
                ))}
                <div className="grid grid-cols-12 pt-2 mt-1 border-t border-gray-200">
                  <div className="col-span-8 text-right font-medium">ยอดรวม</div>
                  <div className="col-span-4 text-right text-lg font-bold">{formatCurrency(selectedTransaction.amount)}</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handlePrintReceipt(selectedTransaction.id)}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" />
                  </svg>
                }
              >
                พิมพ์ใบเสร็จ
              </Button>
              <Button 
                onClick={() => setSelectedTransaction(null)}
                variant="secondary"
              >
                ปิด
              </Button>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Receipt printing modal */}
      <Modal
        open={printReceiptId !== null}
        onClose={() => setPrintReceiptId(null)}
        title="กำลังพิมพ์ใบเสร็จ"
        size="sm"
      >
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p>กำลังส่งข้อมูลไปยังเครื่องพิมพ์...</p>
        </div>
      </Modal>
    </div>
  );
}
