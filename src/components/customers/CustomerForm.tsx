import { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { formatPhoneNumber } from "@/components/utils/formatter";

export interface CustomerFormData {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  memberType?: string;
  totalPurchase?: number;
  lastVisit?: Date;
  notes?: string;
}

export interface Customer {
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

interface CustomerFormProps {
  onAdd?: (customer: CustomerFormData) => void;
  onUpdate?: (customer: CustomerFormData) => void;
  editCustomer?: Customer | null;
  memberTypes?: string[];
}

export default function CustomerForm({ 
  onAdd, 
  onUpdate, 
  editCustomer, 
  memberTypes = ['standard', 'premium', 'vip'] 
}: CustomerFormProps) {
  
  const [form, setForm] = useState<CustomerFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    memberType: "standard",
    notes: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Set form data when editing an existing customer
  useEffect(() => {
    if (editCustomer) {
      setForm(editCustomer);
    }
  }, [editCustomer]);
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.name.trim()) {
      newErrors.name = "กรุณาระบุชื่อลูกค้า";
    }
    
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }
    
    if (form.phone && !/^\d{9,10}$/.test(form.phone.replace(/[- ]/g, ''))) {
      newErrors.phone = "รูปแบบเบอร์โทรไม่ถูกต้อง";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Format phone number as user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-digit characters
    let phoneNumber = e.target.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (phoneNumber.length > 10) {
      phoneNumber = phoneNumber.substring(0, 10);
    }
    
    setForm({ ...form, phone: phoneNumber });
  };
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const customerData: CustomerFormData = {
      ...form,
      id: editCustomer?.id
    };
    
    if (editCustomer && onUpdate) {
      onUpdate(customerData);
    } else if (onAdd) {
      onAdd(customerData);
    }
    
    // Reset form if adding
    if (!editCustomer) {
      setForm({ 
        name: "", 
        email: "", 
        phone: "",
        address: "",
        memberType: "standard",
        notes: ""
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic customer info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer name */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700">ชื่อลูกค้า <span className="text-red-500">*</span></label>
          <input 
            className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-300 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            required 
            placeholder="ชื่อ-นามสกุล"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
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
        
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">เบอร์โทรศัพท์</label>
          <input 
            className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-300 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="08x-xxx-xxxx"
            value={formatPhoneNumber(form.phone || "")}
            onChange={handlePhoneChange}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
          {/* Member type */}
        <div>
          <label htmlFor="customer-member-type" className="block text-sm font-medium mb-1 text-gray-700">ประเภทสมาชิก</label>
          <select
            id="customer-member-type"
            className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
            value={form.memberType || "standard"}
            onChange={e => setForm({ ...form, memberType: e.target.value })}
          >
            {memberTypes.map((type) => (
              <option key={type} value={type}>
                {type === "standard" ? "ทั่วไป" : 
                 type === "premium" ? "พรีเมียม" : 
                 type === "vip" ? "VIP" : type}
              </option>
            ))}
          </select>
        </div>
        
        {/* Address */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700">ที่อยู่</label>
          <textarea
            className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
            rows={3}
            placeholder="ที่อยู่"
            value={form.address || ""}
            onChange={e => setForm({ ...form, address: e.target.value })}
          />
        </div>
        
        {/* Notes */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700">บันทึกเพิ่มเติม</label>
          <textarea
            className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
            rows={2}
            placeholder="บันทึกเพิ่มเติมเกี่ยวกับลูกค้า"
            value={form.notes || ""}
            onChange={e => setForm({ ...form, notes: e.target.value })}
          />
        </div>
      </div>
      
      {/* Form actions */}
      <div className="flex justify-end gap-2">
        <Button type="submit" variant={editCustomer ? "success" : "primary"}>
          {editCustomer ? "บันทึกการแก้ไข" : "เพิ่มลูกค้า"}
        </Button>
      </div>
    </form>
  );
}
