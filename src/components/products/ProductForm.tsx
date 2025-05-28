import { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";

interface ProductFormData {
  id?: string;
  name: string;
  price: number | string;
  stock: number | string;
  category?: string;
  barcode?: string;
  costPrice?: number | string;
  supplier?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
  barcode?: string;
  costPrice?: number;
  supplier?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductFormProps {
  onAdd?: (product: ProductFormData) => void;
  onUpdate?: (product: ProductFormData) => void;
  editProduct?: Product | null;
  categories?: string[];
}

export default function ProductForm({ onAdd, onUpdate, editProduct, categories = [] }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>({
    name: "",
    price: "",
    stock: "",
    barcode: "",
    category: "",
    costPrice: "",
    supplier: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Set form data when editing an existing product
  useEffect(() => {
    if (editProduct) {
      setForm({
        ...editProduct,
        price: editProduct.price.toString(),
        stock: editProduct.stock.toString(),
        costPrice: editProduct.costPrice ? editProduct.costPrice.toString() : ""
      });
    }
  }, [editProduct]);
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!form.name.trim()) {
      newErrors.name = "กรุณาระบุชื่อสินค้า";
    }
    
    if (!form.price) {
      newErrors.price = "กรุณาระบุราคาขาย";
    } else if (Number(form.price) < 0) {
      newErrors.price = "ราคาต้องมากกว่าหรือเท่ากับ 0";
    }
    
    if (!form.stock) {
      newErrors.stock = "กรุณาระบุจำนวนสินค้า";
    } else if (Number(form.stock) < 0) {
      newErrors.stock = "จำนวนสินค้าต้องมากกว่าหรือเท่ากับ 0";
    }
    
    if (form.costPrice && Number(form.costPrice) < 0) {
      newErrors.costPrice = "ต้นทุนต้องมากกว่าหรือเท่ากับ 0";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const productData: ProductFormData = {
      ...form,
      id: editProduct?.id,
      price: Number(form.price),
      stock: Number(form.stock),
      costPrice: form.costPrice ? Number(form.costPrice) : undefined
    };
    
    if (editProduct && onUpdate) {
      onUpdate(productData);
    } else if (onAdd) {
      onAdd(productData);
    }
    
    // Reset form if adding
    if (!editProduct) {
      setForm({ 
        name: "", 
        price: "", 
        stock: "", 
        barcode: "", 
        category: "",
        costPrice: "",
        supplier: ""
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic product info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product name */}
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700">ชื่อสินค้า <span className="text-red-500">*</span></label>
          <input 
            className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-300 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            required 
            placeholder="ชื่อสินค้า"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        
        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">ราคาขาย (บาท) <span className="text-red-500">*</span></label>
          <input 
            className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-300 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
            required 
            type="number" 
            min={0} 
            step={0.01}
            placeholder="ราคาขาย"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
          />
          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
        </div>
        
        {/* Cost price */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">ราคาทุน (บาท)</label>
          <input 
            className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-300 ${errors.costPrice ? 'border-red-500' : 'border-gray-300'}`}
            type="number" 
            min={0} 
            step={0.01}
            placeholder="ราคาทุน"
            value={form.costPrice}
            onChange={e => setForm({ ...form, costPrice: e.target.value })}
          />
          {errors.costPrice && <p className="text-red-500 text-xs mt-1">{errors.costPrice}</p>}
        </div>
        
        {/* Stock */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">จำนวนสินค้า <span className="text-red-500">*</span></label>
          <input 
            className={`border p-2 rounded w-full focus:ring-2 focus:ring-blue-300 ${errors.stock ? 'border-red-500' : 'border-gray-300'}`}
            required 
            type="number" 
            min={0} 
            placeholder="จำนวนสินค้า"
            value={form.stock}
            onChange={e => setForm({ ...form, stock: e.target.value })}
          />
          {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
        </div>
          {/* Category with option to add new */}
        <div>
          <label htmlFor="product-category" className="block text-sm font-medium mb-1 text-gray-700">หมวดหมู่</label>
          <div className="flex gap-2">
            <select
              id="product-category"
              className="border border-gray-300 p-2 rounded flex-1 focus:ring-2 focus:ring-blue-300"
              value={form.category || ""}
              onChange={e => setForm({ ...form, category: e.target.value })}
            >
              <option value="">-- เลือกหมวดหมู่ --</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Barcode */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">บาร์โค้ด</label>
          <input 
            className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
            placeholder="บาร์โค้ด"
            value={form.barcode || ""}
            onChange={e => setForm({ ...form, barcode: e.target.value })}
          />
        </div>
        
        {/* Supplier */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">ซัพพลายเออร์</label>
          <input 
            className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
            placeholder="ซัพพลายเออร์"
            value={form.supplier || ""}
            onChange={e => setForm({ ...form, supplier: e.target.value })}
          />
        </div>
      </div>
      
      {/* Form actions */}
      <div className="flex justify-end gap-2">
        <Button type="submit" variant={editProduct ? "success" : "primary"}>
          {editProduct ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"}
        </Button>
      </div>
    </form>
  );
}
