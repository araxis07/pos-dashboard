"use client";
import { useState } from "react";
import CustomerTable from "@/components/customers/CustomerTable";
import CustomerForm from "@/components/customers/CustomerForm";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import Link from "next/link";
import toast from "react-hot-toast";
import { useLocalStorage } from "@/components/utils/hooks";
import { formatDateTime } from "@/components/utils/formatter";

interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  memberType?: string;
  totalPurchase?: number;
  lastVisit?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Transaction {
  id: string;
  customerId: string;
  amount: number;
  items: number;
  date: Date;
  paymentMethod: string;
}

export default function CustomersPage() {
  // Initialize customer state from local storage with sample data
  const [customers, setCustomers] = useLocalStorage<Customer[]>("pos-customers", [
    { id: "1", name: "สมชาย ใจดี", email: "somchai@email.com", phone: "0812345678", memberType: "standard", totalPurchase: 2500, lastVisit: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
    { id: "2", name: "สุดารัตน์ ยิ้มแย้ม", email: "suda@email.com", phone: "0898765432", memberType: "premium", totalPurchase: 8750, address: "123/45 ซอย 5 ถนนสุขุมวิท กรุงเทพฯ", lastVisit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { id: "3", name: "วิทยา รักษ์ดี", email: "wittaya@email.com", phone: "0865554444", memberType: "vip", totalPurchase: 25000, notes: "ชอบสินค้าพรีเมียม", lastVisit: new Date() },
  ]);
  
  // Sample transaction data
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>("pos-transactions", [
    { id: "t1", customerId: "1", amount: 500, items: 3, date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), paymentMethod: "cash" },
    { id: "t2", customerId: "1", amount: 2000, items: 5, date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), paymentMethod: "card" },
    { id: "t3", customerId: "2", amount: 3500, items: 7, date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), paymentMethod: "promptpay" },
    { id: "t4", customerId: "2", amount: 5250, items: 10, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), paymentMethod: "card" },
    { id: "t5", customerId: "3", amount: 12000, items: 15, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), paymentMethod: "card" },
    { id: "t6", customerId: "3", amount: 13000, items: 8, date: new Date(), paymentMethod: "promptpay" },
  ]);
  
  // UI state
  const [showForm, setShowForm] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [transactionsCustomerId, setTransactionsCustomerId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [memberTypeFilter, setMemberTypeFilter] = useState<string>("all");

  // Handle adding a new customer
  const handleAdd = (customer: Customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now().toString(),
      totalPurchase: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setCustomers(prev => [...prev, newCustomer]);
    setShowForm(false);
    toast.success(`เพิ่มลูกค้า ${customer.name} สำเร็จแล้ว`);
  };

  // Handle updating a customer
  const handleUpdate = (customer: Customer) => {
    setCustomers(prev => 
      prev.map(c => 
        c.id === customer.id 
          ? { ...c, ...customer, updatedAt: new Date() } 
          : c
      )
    );
    setEditCustomer(null);
    toast.success(`อัพเดตข้อมูลลูกค้า ${customer.name} สำเร็จแล้ว`);
  };

  // Handle deleting a customer
  const handleDelete = (id: string) => {
    const customerToDelete = customers.find(c => c.id === id);
    if (customerToDelete) {
      setCustomers(prev => prev.filter(c => c.id !== id));
      toast.success(`ลบลูกค้า ${customerToDelete.name} สำเร็จแล้ว`);
    }
    setDeleteConfirmId(null);
  };
  
  // Filter customers based on search term and member type
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = searchTerm === "" || 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm);
    
    const matchesMemberType = memberTypeFilter === "all" || customer.memberType === memberTypeFilter;
    
    return matchesSearch && matchesMemberType;
  });
  
  // Get customer transactions
  const customerTransactions = transactions.filter(tx => 
    tx.customerId === transactionsCustomerId
  ).sort((a, b) => b.date.getTime() - a.date.getTime());
  
  // Get customer being viewed
  const viewedCustomer = customers.find(c => c.id === transactionsCustomerId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900">จัดการลูกค้า</h1>
          <p className="text-gray-500">จำนวนลูกค้าทั้งหมด {customers.length} ราย</p>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            }
            onClick={() => setShowForm(true)}
          >
            เพิ่มลูกค้า
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
              placeholder="ค้นหาลูกค้า..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Member type filter */}
          <div className="md:w-48">
            <select
              value={memberTypeFilter}
              onChange={e => setMemberTypeFilter(e.target.value)}
              className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="all">ทุกประเภทสมาชิก</option>
              <option value="standard">ทั่วไป</option>
              <option value="premium">พรีเมียม</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        </div>
      </Card>
      
      {/* Customer table */}
      <Card>
        <CustomerTable 
          customers={filteredCustomers} 
          onEdit={setEditCustomer} 
          onDelete={setDeleteConfirmId}
          onViewTransactions={setTransactionsCustomerId}
        />
      </Card>
      
      {/* Add/Edit customer modal */}
      <Modal
        open={showForm || editCustomer !== null}
        onClose={() => {
          setShowForm(false);
          setEditCustomer(null);
        }}
        title={editCustomer ? "แก้ไขข้อมูลลูกค้า" : "เพิ่มลูกค้าใหม่"}
      >
        <CustomerForm 
          onAdd={handleAdd} 
          onUpdate={handleUpdate}
          editCustomer={editCustomer}
        />
      </Modal>
      
      {/* Delete confirmation modal */}
      <Modal
        open={deleteConfirmId !== null}
        onClose={() => setDeleteConfirmId(null)}
        title="ยืนยันการลบลูกค้า"
        size="sm"
      >
        <div className="text-center py-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-gray-700 mb-6">คุณต้องการลบลูกค้ารายนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถเรียกคืนได้</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>ยกเลิก</Button>
            <Button variant="danger" onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}>ลบลูกค้า</Button>
          </div>
        </div>
      </Modal>
      
      {/* Transactions modal */}
      <Modal
        open={transactionsCustomerId !== null}
        onClose={() => setTransactionsCustomerId(null)}
        title={`ประวัติการซื้อของ ${viewedCustomer?.name || 'ลูกค้า'}`}
        size="lg"
      >
        <div className="py-4">
          {customerTransactions.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-1">ข้อมูลลูกค้า</h3>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-500">ชื่อ:</span> {viewedCustomer?.name}</p>
                    <p><span className="text-gray-500">อีเมล:</span> {viewedCustomer?.email || "-"}</p>
                    <p><span className="text-gray-500">เบอร์โทร:</span> {viewedCustomer?.phone || "-"}</p>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-800 mb-1">สรุปการซื้อ</h3>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-500">จำนวนรายการทั้งหมด:</span> {customerTransactions.length} รายการ</p>
                    <p><span className="text-gray-500">ยอดซื้อสะสม:</span> {viewedCustomer?.totalPurchase?.toLocaleString('th-TH')} บาท</p>
                    <p><span className="text-gray-500">ซื้อล่าสุด:</span> {viewedCustomer?.lastVisit ? formatDateTime(viewedCustomer.lastVisit) : "-"}</p>
                  </div>
                </div>
              </div>
              
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จำนวนเงิน</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จำนวนสินค้า</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชำระโดย</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{formatDateTime(tx.date)}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{tx.amount.toLocaleString('th-TH')} บาท</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{tx.items} ชิ้น</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {tx.paymentMethod === "cash" ? "เงินสด" : 
                           tx.paymentMethod === "card" ? "บัตรเครดิต" : 
                           tx.paymentMethod === "promptpay" ? "พร้อมเพย์" : tx.paymentMethod}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p>ไม่พบประวัติการซื้อของลูกค้ารายนี้</p>
            </div>
          )}
          
          <div className="flex justify-end mt-6">
            <Button variant="outline" onClick={() => setTransactionsCustomerId(null)}>ปิด</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
