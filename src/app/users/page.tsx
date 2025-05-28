"use client";
import { useState } from "react";
import UserTable from "@/components/users/UserTable";
import UserForm from "@/components/users/UserForm";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import Link from "next/link";
import toast from "react-hot-toast";
import { useLocalStorage } from "@/components/utils/hooks";

interface User {
  id: string;
  username: string;
  fullName: string;
  email?: string;
  password?: string;
  role: string;
  status: "active" | "inactive";
  avatar?: string;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function UsersPage() {
  // Initialize users state from local storage with sample data
  const [users, setUsers] = useLocalStorage<User[]>("pos-users", [
    { 
      id: "1", 
      username: "admin", 
      fullName: "ผู้ดูแลระบบ", 
      email: "admin@example.com", 
      role: "admin", 
      status: "active", 
      lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    { 
      id: "2", 
      username: "manager", 
      fullName: "วิชัย จัดการ", 
      email: "manager@example.com", 
      role: "manager", 
      status: "active", 
      lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    { 
      id: "3", 
      username: "cashier1", 
      fullName: "สมศรี คิดเงิน", 
      email: "cashier@example.com", 
      role: "cashier", 
      status: "active", 
      lastLogin: new Date()
    },
    { 
      id: "4", 
      username: "staff1", 
      fullName: "มานะ ทำงาน", 
      email: "staff@example.com", 
      role: "staff", 
      status: "inactive", 
      lastLogin: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    },
  ]);
  
  // UI state
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  // Handle adding a new user
  const handleAdd = (userData: Omit<User, "id">) => {
    // Hash password would happen on the backend - simulating here
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setUsers(prev => [...prev, newUser]);
    setShowForm(false);
    toast.success(`เพิ่มผู้ใช้ ${userData.username} สำเร็จแล้ว`);
  };

  // Handle updating a user
  const handleUpdate = (userData: User) => {
    const updatedUser: User = {
      ...userData,
      id: userData.id || "", // Ensure id is always string
      updatedAt: new Date(),
      // Don't update password if it wasn't provided
      password: userData.password || users.find(u => u.id === userData.id)?.password
    };
    
    setUsers(prev => 
      prev.map(u => 
        u.id === updatedUser.id ? updatedUser : u
      )
    );
    setEditUser(null);
    toast.success(`อัพเดตผู้ใช้ ${updatedUser.username} สำเร็จแล้ว`);
  };

  // Handle deleting a user
  const handleDelete = (id: string) => {
    const userToDelete = users.find(u => u.id === id);
    // Don't allow admin deletion
    if (userToDelete && userToDelete.role !== 'admin') {
      setUsers(prev => prev.filter(u => u.id !== id));
      toast.success(`ลบผู้ใช้ ${userToDelete.username} สำเร็จแล้ว`);
    } else {
      toast.error('ไม่สามารถลบผู้ดูแลระบบได้');
    }
    setDeleteConfirmId(null);
  };
  
  // Handle toggling user status
  const handleToggleStatus = (userId: string, newStatus: "active" | "inactive") => {
    const userToToggle = users.find(u => u.id === userId);
    
    // Don't allow deactivating admin
    if (userToToggle && userToToggle.role === 'admin' && newStatus === 'inactive') {
      toast.error('ไม่สามารถปิดการใช้งานของผู้ดูแลระบบได้');
      return;
    }
    
    setUsers(prev => 
      prev.map(u => 
        u.id === userId 
          ? { ...u, status: newStatus, updatedAt: new Date() } 
          : u
      )
    );
    toast.success(`${newStatus === 'active' ? 'เปิด' : 'ปิด'}การใช้งานผู้ใช้สำเร็จแล้ว`);
  };
  
  // Filter users based on search term, role, and status
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === "" || 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900 flex items-center gap-3">
            👥 จัดการผู้ใช้งาน
          </h1>
          <p className="text-gray-600 mt-1">
            จำนวนผู้ใช้งานทั้งหมด <span className="font-semibold text-blue-700">{users.length}</span> คน
          </p>
        </div>
        
        <div className="flex gap-2">
          <Link href="/dashboard">
            <Button 
              variant="outline" 
              size="sm"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
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
            เพิ่มผู้ใช้
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-blue-100">ผู้ใช้ทั้งหมด</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-green-100">เปิดใช้งาน</p>
              <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-red-100">ปิดใช้งาน</p>
              <p className="text-2xl font-bold">{users.filter(u => u.status === 'inactive').length}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <div className="flex items-center">
            <div className="p-3 bg-white/20 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-purple-100">ผู้ดูแลระบบ</p>
              <p className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Filters */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all" 
              placeholder="ค้นหาผู้ใช้..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>          
          {/* Role filter */}
          <div className="md:w-48">
            <label htmlFor="role-filter" className="sr-only">กรองตามบทบาท</label>
            <select
              id="role-filter"
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg py-2 px-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
            >
              <option value="all">🎭 ทุกบทบาท</option>
              <option value="admin">👑 ผู้ดูแลระบบ</option>
              <option value="manager">📊 ผู้จัดการ</option>
              <option value="cashier">💰 แคชเชียร์</option>
              <option value="staff">👤 พนักงาน</option>
            </select>
          </div>
          
          {/* Status filter */}
          <div className="md:w-48">
            <label htmlFor="status-filter" className="sr-only">กรองตามสถานะ</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="block w-full border border-gray-300 rounded-lg py-2 px-3 bg-white/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
            >
              <option value="all">📊 ทุกสถานะ</option>
              <option value="active">✅ เปิดใช้งาน</option>
              <option value="inactive">❌ ปิดใช้งาน</option>
            </select>
          </div>
        </div>
      </Card>
      
      {/* User table */}
      <Card className="bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg">
        <UserTable 
          users={filteredUsers} 
          onEdit={setEditUser} 
          onDelete={setDeleteConfirmId}
          onToggleStatus={handleToggleStatus}
        />
      </Card>
      
      {/* Add/Edit user modal */}
      <Modal
        open={showForm || editUser !== null}
        onClose={() => {
          setShowForm(false);
          setEditUser(null);
        }}
        title={editUser ? `แก้ไขผู้ใช้ ${editUser.username}` : "เพิ่มผู้ใช้ใหม่"}
      >
        <UserForm 
          onAdd={handleAdd} 
          onUpdate={handleUpdate}
          editUser={editUser}
        />
      </Modal>
        {/* Delete confirmation modal */}
      <Modal
        open={deleteConfirmId !== null}
        onClose={() => setDeleteConfirmId(null)}
        title="ยืนยันการลบผู้ใช้"
        size="sm"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">ลบผู้ใช้งาน</h3>
          <p className="text-gray-600 mb-6">คุณต้องการลบผู้ใช้รายนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถเรียกคืนได้</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
              ยกเลิก
            </Button>
            <Button 
              variant="danger" 
              onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              }
            >
              ลบผู้ใช้
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
