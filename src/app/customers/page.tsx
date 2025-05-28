"use client";
import { useState } from "react";
import CustomerTable from "@/components/customers/CustomerTable";
import CustomerForm from "@/components/customers/CustomerForm";
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
  const [transactions] = useLocalStorage<Transaction[]>("pos-transactions", [
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
  const handleAdd = (customer: Omit<Customer, 'id'>) => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    จัดการลูกค้า
                  </h1>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      👥 {customers.length} ลูกค้าทั้งหมด
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      ✨ {customers.filter(c => c.memberType === 'vip').length} VIP
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link href="/dashboard">
                <button className="btn-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  กลับสู่แดชบอร์ด
                </button>
              </Link>
              
              <button 
                className="btn-primary"
                onClick={() => setShowForm(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                เพิ่มลูกค้าใหม่
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">ลูกค้าทั้งหมด</p>
                <p className="text-3xl font-bold text-gray-900">{customers.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">ลูกค้า VIP</p>
                <p className="text-3xl font-bold text-purple-600">{customers.filter(c => c.memberType === 'vip').length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">ยอดซื้อเฉลี่ย</p>
                <p className="text-3xl font-bold text-green-600">
                  ฿{Math.round(customers.reduce((sum, c) => sum + (c.totalPurchase || 0), 0) / customers.length).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                className="input-field pl-12" 
                placeholder="🔍 ค้นหาลูกค้า (ชื่อ, อีเมล, เบอร์โทร)..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
              {/* Member type filter */}
            <div className="md:w-64">
              <select
                value={memberTypeFilter}
                onChange={e => setMemberTypeFilter(e.target.value)}
                className="input-field"
                title="กรองตามประเภทสมาชิก"
              >
                <option value="all">🏷️ ทุกประเภทสมาชิก</option>
                <option value="standard">📋 ทั่วไป</option>
                <option value="premium">⭐ พรีเมียม</option>
                <option value="vip">👑 VIP</option>
              </select>
            </div>
            
            {(searchTerm || memberTypeFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setMemberTypeFilter('all');
                }}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ล้างตัวกรอง
              </button>
            )}
          </div>
          
          {filteredCustomers.length !== customers.length && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                🔍 แสดงผลลัพธ์ {filteredCustomers.length} จาก {customers.length} ลูกค้า
              </p>
            </div>
          )}
        </div>
        
        {/* Customer table */}
        <CustomerTable 
          customers={filteredCustomers} 
          onEdit={setEditCustomer} 
          onDelete={setDeleteConfirmId}
          onViewTransactions={setTransactionsCustomerId}
        />      
      {/* Add/Edit customer modal */}
      <Modal
        open={showForm || editCustomer !== null}
        onClose={() => {
          setShowForm(false);
          setEditCustomer(null);
        }}
        title={editCustomer ? "แก้ไขข้อมูลลูกค้า" : "เพิ่มลูกค้าใหม่"}
      >        <CustomerForm 
          onAdd={handleAdd as any} 
          onUpdate={handleUpdate as any}
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
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">ยืนยันการลบลูกค้า</h3>
          <p className="text-gray-600 mb-6">คุณต้องการลบลูกค้ารายนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถเรียกคืนได้</p>
          <div className="flex gap-3 justify-center">
            <button className="btn-secondary" onClick={() => setDeleteConfirmId(null)}>ยกเลิก</button>
            <button className="btn-danger" onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}>ลบลูกค้า</button>
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
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    👤 ข้อมูลลูกค้า
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium text-blue-700">ชื่อ:</span> <span className="text-gray-700">{viewedCustomer?.name}</span></p>
                    <p><span className="font-medium text-blue-700">อีเมล:</span> <span className="text-gray-700">{viewedCustomer?.email || "-"}</span></p>
                    <p><span className="font-medium text-blue-700">เบอร์โทร:</span> <span className="text-gray-700">{viewedCustomer?.phone || "-"}</span></p>
                    <p><span className="font-medium text-blue-700">ประเภท:</span> 
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                        viewedCustomer?.memberType === 'vip' ? 'bg-purple-100 text-purple-800' :
                        viewedCustomer?.memberType === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {viewedCustomer?.memberType === 'vip' ? '👑 VIP' :
                         viewedCustomer?.memberType === 'premium' ? '⭐ พรีเมียม' : '📋 ทั่วไป'}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                    📊 สรุปการซื้อ
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium text-green-700">จำนวนรายการ:</span> <span className="text-gray-700">{customerTransactions.length} รายการ</span></p>
                    <p><span className="font-medium text-green-700">ยอดซื้อสะสม:</span> <span className="font-bold text-green-600">฿{viewedCustomer?.totalPurchase?.toLocaleString('th-TH')}</span></p>
                    <p><span className="font-medium text-green-700">ซื้อล่าสุด:</span> <span className="text-gray-700">{viewedCustomer?.lastVisit ? formatDateTime(viewedCustomer.lastVisit) : "-"}</span></p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900">📋 รายการซื้อทั้งหมด</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จำนวนเงิน</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จำนวนสินค้า</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชำระโดย</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {customerTransactions.map((tx, index) => (
                        <tr key={tx.id} className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDateTime(tx.date)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">฿{tx.amount.toLocaleString('th-TH')}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{tx.items} ชิ้น</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              tx.paymentMethod === "cash" ? "bg-green-100 text-green-800" :
                              tx.paymentMethod === "card" ? "bg-blue-100 text-blue-800" :
                              "bg-purple-100 text-purple-800"
                            }`}>
                              {tx.paymentMethod === "cash" ? "💵 เงินสด" : 
                               tx.paymentMethod === "card" ? "💳 บัตรเครดิต" : 
                               tx.paymentMethod === "promptpay" ? "📱 พร้อมเพย์" : tx.paymentMethod}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ไม่พบประวัติการซื้อ</h3>
              <p className="text-gray-500">ลูกค้ารายนี้ยังไม่มีประวัติการซื้อสินค้า</p>
            </div>
          )}
          
          <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
            <button className="btn-secondary" onClick={() => setTransactionsCustomerId(null)}>ปิด</button>
          </div>
        </div>
      </Modal>
      </div>
    </div>
  );
}
