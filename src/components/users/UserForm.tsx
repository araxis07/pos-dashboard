import { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";

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

interface UserFormData {
  username: string;
  fullName: string;
  email?: string;
  password?: string;
  role: string;
  status: "active" | "inactive";
  avatar?: string;
  lastLogin?: Date;
}

interface UserFormProps {
  onAdd?: (user: UserFormData) => void;
  onUpdate?: (user: User) => void;
  editUser?: User | null;
  roles?: string[];
}

export default function UserForm({ 
  onAdd, 
  onUpdate, 
  editUser, 
  roles = ['admin', 'manager', 'cashier', 'staff'] 
}: UserFormProps) {
  
  const [form, setForm] = useState<UserFormData>({
    username: "",
    fullName: "",
    email: "",
    password: "",
    role: "staff",
    status: "active"
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  // Set form data when editing an existing user
  useEffect(() => {
    if (editUser) {
      // Extract only the form fields needed
      setForm({
        username: editUser.username,
        fullName: editUser.fullName,
        email: editUser.email || "",
        password: "", // Clear password field for editing
        role: editUser.role,
        status: editUser.status,
        avatar: editUser.avatar,
        lastLogin: editUser.lastLogin
      });
    }
  }, [editUser]);
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.username.trim()) {
      newErrors.username = "กรุณาระบุชื่อผู้ใช้";
    } else if (form.username.length < 3) {
      newErrors.username = "ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร";
    }
    
    if (!form.fullName.trim()) {
      newErrors.fullName = "กรุณาระบุชื่อ-นามสกุล";
    }
    
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }
    
    // Only check password if adding a new user or if password field is not empty for edits
    if (!editUser && !form.password) {
      newErrors.password = "กรุณาระบุรหัสผ่าน";
    } else if (form.password && form.password.length < 6) {
      newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (editUser && onUpdate) {
      // For updates, include the id and build complete user object
      const userData: User = {
        ...editUser,
        ...form,
        id: editUser.id,
        // If password is empty, keep the existing password
        password: form.password || editUser.password
      };
      onUpdate(userData);
    } else if (onAdd) {
      // For new users, just pass the form data
      onAdd(form);
    }
    
    // Reset form if adding
    if (!editUser) {
      setForm({ 
        username: "", 
        fullName: "", 
        email: "",
        password: "",
        role: "staff",
        status: "active"
      });
      setShowPassword(false);
    }
  };
  
  // Get role display text
  const getRoleDisplayText = (role: string) => {
    switch(role) {
      case 'admin': return 'ผู้ดูแลระบบ';
      case 'manager': return 'ผู้จัดการ';
      case 'cashier': return 'แคชเชียร์';
      case 'staff': return 'พนักงาน';
      default: return role;
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic user info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">ชื่อผู้ใช้ <span className="text-red-500">*</span></label>
          <input 
            className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-300 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            required 
            placeholder="ชื่อผู้ใช้"
            value={form.username}
            disabled={!!editUser} // Can't change username when editing
            onChange={e => setForm({ ...form, username: e.target.value })}
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
        </div>
        
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">ชื่อ-นามสกุล <span className="text-red-500">*</span></label>
          <input 
            className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-300 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
            required 
            placeholder="ชื่อ-นามสกุล"
            value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>
        
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">อีเมล</label>
          <input 
            className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-300 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            type="email"
            placeholder="example@email.com"
            value={form.email || ""}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        
        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            รหัสผ่าน {!editUser && <span className="text-red-500">*</span>}
            {editUser && <span className="text-xs text-gray-500 font-normal">(เว้นว่างถ้าไม่ต้องการเปลี่ยน)</span>}
          </label>
          <div className="relative">
            <input 
              className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-300 pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              type={showPassword ? "text" : "password"}
              placeholder="รหัสผ่าน"
              value={form.password || ""}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <button 
              type="button"
              className="absolute right-2 top-2.5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
          {/* Role */}
        <div>
          <label htmlFor="user-role" className="block text-sm font-medium mb-1 text-gray-700">บทบาท <span className="text-red-500">*</span></label>
          <select
            id="user-role"
            className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {getRoleDisplayText(role)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">สถานะ <span className="text-red-500">*</span></label>
          <div className="flex gap-4 mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-blue-600"
                name="status"
                checked={form.status === 'active'}
                onChange={() => setForm({ ...form, status: 'active' })}
              />
              <span className="ml-2">เปิดใช้งาน</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-red-600"
                name="status"
                checked={form.status === 'inactive'}
                onChange={() => setForm({ ...form, status: 'inactive' })}
              />
              <span className="ml-2">ปิดใช้งาน</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Form actions */}
      <div className="flex justify-end gap-2">
        <Button type="submit" variant={editUser ? "success" : "primary"}>
          {editUser ? "บันทึกการแก้ไข" : "เพิ่มผู้ใช้"}
        </Button>
      </div>
    </form>
  );
}
