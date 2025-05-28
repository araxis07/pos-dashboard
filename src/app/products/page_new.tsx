"use client";
import { useState, useEffect } from "react";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import Link from "next/link";
import toast from "react-hot-toast";
import { useLocalStorage } from "@/components/utils/hooks";

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

export default function ProductsPage() {
  // Initialize product state from local storage
  const [products, setProducts] = useLocalStorage<Product[]>("pos-products", [
    { id: "1", name: "น้ำดื่ม", price: 10, stock: 50, barcode: "P1001", category: "drinks", costPrice: 7 },
    { id: "2", name: "ขนมปัง", price: 20, stock: 30, barcode: "P1002", category: "food", costPrice: 12 },
    { id: "3", name: "ขนมถุง", price: 15, stock: 24, barcode: "P1003", category: "snacks", costPrice: 10 },
    { id: "4", name: "น้ำอัดลม", price: 20, stock: 40, barcode: "P1004", category: "drinks", costPrice: 15 },
    { id: "5", name: "มาม่า", price: 6, stock: 100, barcode: "P1005", category: "food", costPrice: 4 },
  ]);
  
  // UI state
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<"all" | "low" | "out">("all");
  
  // Get categories from products
  const categories = Array.from(new Set(products.map(p => p.category || "uncategorized")));

  // Handle adding a new product
  const handleAdd = (product: Product) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setProducts(prev => [...prev, newProduct]);
    setShowForm(false);
    toast.success(`เพิ่มสินค้า ${product.name} สำเร็จแล้ว`);
  };

  // Handle updating a product
  const handleUpdate = (product: Product) => {
    setProducts(prev => 
      prev.map(p => 
        p.id === product.id 
          ? { ...product, updatedAt: new Date() } 
          : p
      )
    );
    setEditProduct(null);
    toast.success(`อัพเดตสินค้า ${product.name} สำเร็จแล้ว`);
  };

  // Handle deleting a product
  const handleDelete = (id: string) => {
    const productToDelete = products.find(p => p.id === id);
    if (productToDelete) {
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success(`ลบสินค้า ${productToDelete.name} สำเร็จแล้ว`);
    }
    setDeleteConfirmId(null);
  };

  // Handle stock update
  const handleStockUpdate = (id: string, newStock: number) => {
    setProducts(prev => 
      prev.map(p => 
        p.id === id 
          ? { ...p, stock: newStock, updatedAt: new Date() } 
          : p
      )
    );
    toast.success("อัพเดตจำนวนสินค้าสำเร็จแล้ว");
  };

  // Filter products based on search term, category, and stock level
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    
    const matchesStockFilter = 
      stockFilter === "all" || 
      (stockFilter === "low" && product.stock <= 10 && product.stock > 0) ||
      (stockFilter === "out" && product.stock === 0);
    
    return matchesSearch && matchesCategory && matchesStockFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="space-y-8 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              จัดการสินค้า
            </h1>
            <p className="text-gray-600 text-lg flex items-center space-x-2">
              <span>จำนวนสินค้าทั้งหมด</span>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-semibold">
                {products.length} รายการ
              </span>
            </p>
          </div>
          
          <div className="flex gap-3">
            <Link href="/pos">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90 border-indigo-200 text-indigo-700 hover:text-indigo-800"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                ไปที่หน้าขาย
              </Button>
            </Link>
            
            <Button 
              variant="primary"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              onClick={() => setShowForm(true)}
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              เพิ่มสินค้า
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 ค้นหาสินค้า
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาด้วยชื่อสินค้าหรือบาร์โค้ด..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/90 backdrop-blur-sm"
                />
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="w-full lg:w-64">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📂 หมวดหมู่
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/90 backdrop-blur-sm"
              >
                <option value="all">ทุกหมวดหมู่</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'drinks' ? '🥤 เครื่องดื่ม' :
                     category === 'food' ? '🍞 อาหาร' :
                     category === 'snacks' ? '🍿 ขนม' : category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Stock Filter */}
            <div className="w-full lg:w-64">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📊 สถานะสต็อก
              </label>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value as "all" | "low" | "out")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/90 backdrop-blur-sm"
              >
                <option value="all">ทุกสถานะ</option>
                <option value="low">🔶 สินค้าใกล้หมด (≤10)</option>
                <option value="out">🔴 สินค้าหมด</option>
              </select>
            </div>
          </div>
        </Card>
        
        {/* Product table */}
        <Card>
          <ProductTable 
            products={filteredProducts} 
            onEdit={setEditProduct} 
            onDelete={setDeleteConfirmId}
            onUpdateStock={handleStockUpdate}
          />
        </Card>
        
        {/* Add/Edit product modal */}
        <Modal
          open={showForm || editProduct !== null}
          onClose={() => {
            setShowForm(false);
            setEditProduct(null);
          }}
          title={editProduct ? "แก้ไขสินค้า" : "เพิ่มสินค้า"}
        >
          <ProductForm 
            onAdd={handleAdd} 
            onUpdate={handleUpdate}
            editProduct={editProduct}
            categories={categories}
          />
        </Modal>
        
        {/* Delete confirmation modal */}
        <Modal
          open={deleteConfirmId !== null}
          onClose={() => setDeleteConfirmId(null)}
          title="ยืนยันการลบสินค้า"
          size="sm"
        >
          <div className="text-center py-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <p className="text-gray-700 mb-6">คุณต้องการลบสินค้านี้ใช่หรือไม่? การกระทำนี้ไม่สามารถเรียกคืนได้</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>ยกเลิก</Button>
              <Button variant="danger" onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}>ลบสินค้า</Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
