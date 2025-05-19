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
  const handleAdd = (user: Omit<User, "id">) => {
    // Hash password would happen on the backend - simulating here
    const newUser = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setUsers(prev => [...prev, newUser]);
    setShowForm(false);
    toast.success(`เพิ่มผู้ใช้ ${user.username} สำเร็จแล้ว`);
  };

  // Handle updating a user
  const handleUpdate = (user: User) => {
    setUsers(prev => 
      prev.map(u => 
        u.id === user.id 
          ? { 
              ...u, 
              ...user, 
              updatedAt: new Date(),
              // Don't update password if it wasn't provided
              password: user.password || u.password
            } 
          : u
      )
    );
    setEditUser(null);
    toast.success(`อัพเดตผู้ใช้ ${user.username} สำเร็จแล้ว`);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900">จัดการผู้ใช้งาน</h1>
          <p className="text-gray-500">จำนวนผู้ใช้งานทั้งหมด {users.length} คน</p>
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
            เพิ่มผู้ใช้
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
              placeholder="ค้นหาผู้ใช้..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Role filter */}
          <div className="md:w-48">
            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="all">ทุกบทบาท</option>
              <option value="admin">ผู้ดูแลระบบ</option>
              <option value="manager">ผู้จัดการ</option>
              <option value="cashier">แคชเชียร์</option>
              <option value="staff">พนักงาน</option>
            </select>
          </div>
          
          {/* Status filter */}
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="block w-full border border-gray-300 rounded-md py-2 px-3 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="all">ทุกสถานะ</option>
              <option value="active">เปิดใช้งาน</option>
              <option value="inactive">ปิดใช้งาน</option>
            </select>
          </div>
        </div>
      </Card>
      
      {/* User table */}
      <Card>
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-gray-700 mb-6">คุณต้องการลบผู้ใช้รายนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถเรียกคืนได้</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>ยกเลิก</Button>
            <Button variant="danger" onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}>ลบผู้ใช้</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
