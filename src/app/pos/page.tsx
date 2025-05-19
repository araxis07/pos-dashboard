"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import ProductList from "@/components/pos/ProductList";
import Cart from "@/components/pos/Cart";
import CheckoutModal from "@/components/pos/CheckoutModal";
import Link from "next/link";
import toast from "react-hot-toast";

// Define types
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
  image?: string;
  barcode?: string;
}

interface CartItem extends Product {
  qty: number;
}

export default function POSPage() {
  // State for managing cart and UI
  const [cart, setCart] = useState<CartItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cartTotal, setCartTotal] = useState(0);
  
  // Mock categories for demonstration
  const categories = [
    { id: "all", name: "ทั้งหมด" },
    { id: "drinks", name: "เครื่องดื่ม" }, 
    { id: "food", name: "อาหาร" },
    { id: "snacks", name: "ขนม" }
  ];
  
  // Calculate cart total whenever cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    setCartTotal(total);
  }, [cart]);
  
  // Add product to cart
  const addToCart = (product: Product) => {
    // Play add sound effect
    const audio = new Audio('/assets/sounds/beep.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed', e));
    
    setCart(prev => {
      const idx = prev.findIndex(item => item.id === product.id);
      if (idx !== -1) {
        // Product already in cart, increase quantity
        const updated = [...prev];
        updated[idx].qty += 1;
        return updated;
      }
      // Add new product to cart
      return [...prev, { ...product, qty: 1 }];
    });
    
    // Show toast notification
    toast.success(`เพิ่ม ${product.name} ลงตะกร้าแล้ว`);
  };
  
  // Update product quantity in cart
  const updateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return removeFromCart(id);
    
    setCart(prev => 
      prev.map(item => 
        item.id === id ? { ...item, qty: newQty } : item
      )
    );
  };
  
  // Remove product from cart
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.error("นำรายการออกจากตะกร้าแล้ว");
  };
  
  // Open checkout modal
  const handleCheckout = () => setModalOpen(true);
  
  // Confirm checkout
  const handleConfirm = () => {
    setModalOpen(false);
    // Process payment here in a real app
    
    // Clear cart after successful checkout
    setCart([]);
    
    // Show success notification
    toast.success("ชำระเงินสำเร็จ! ขอบคุณที่ใช้บริการ");
  };
  
  // Cancel checkout
  const handleCancelCheckout = () => {
    setModalOpen(false);
  };
  
  // Clear entire cart
  const handleClearCart = () => {
    if (cart.length === 0) return;
    
    if (confirm("ต้องการล้างตะกร้าใช่หรือไม่?")) {
      setCart([]);
      toast.success("ล้างตะกร้าเรียบร้อยแล้ว");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-800">หน้าขายสินค้า (POS)</h1>
          <p className="text-gray-500">ขายสินค้าและรับชำระเงินอย่างรวดเร็ว</p>
        </div>
        
        <div className="flex gap-2">
          <Link href="/products">
            <Button 
              variant="outline" 
              size="sm"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
            >
              จัดการสินค้า
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button 
              variant="ghost"
              size="sm"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            >
              แดชบอร์ด
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Product section - Left side */}
        <div className="w-full lg:w-2/3">
          <Card className="h-full">
            {/* Search and filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                  placeholder="ค้นหาสินค้า..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex overflow-x-auto pb-2 sm:pb-0 gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap ${
                      selectedCategory === category.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product list */}
            <div className="overflow-y-auto h-[calc(100vh-320px)] pr-2">
              <ProductList 
                onAddToCart={addToCart}
                searchTerm={searchTerm} 
                category={selectedCategory} 
              />
            </div>
          </Card>
        </div>
        
        {/* Cart section - Right side */}
        <div className="w-full lg:w-1/3 flex flex-col">
          <Card className="h-full flex flex-col">
            {/* Cart header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl">ตะกร้าสินค้า</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearCart}
                disabled={cart.length === 0}
              >
                ล้างตะกร้า
              </Button>
            </div>
            
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto mb-4">
              <Cart 
                cart={cart} 
                onRemove={removeFromCart} 
                onUpdateQuantity={updateQuantity}
                onCheckout={handleCheckout} 
              />
            </div>
            
            {/* Cart summary & checkout */}
            <div className="border-t pt-4 mt-auto">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">จำนวนรายการ:</span>
                <span>{cart.reduce((sum, item) => sum + item.qty, 0)} ชิ้น</span>
              </div>
              
              <div className="flex justify-between mb-4">
                <span className="font-medium text-lg">รวมเงินทั้งสิ้น:</span>
                <span className="font-bold text-xl text-blue-700">
                  {cartTotal.toLocaleString('th-TH')} บาท
                </span>
              </div>
              
              <Button 
                variant="primary" 
                fullWidth 
                size="lg"
                disabled={cart.length === 0}
                onClick={handleCheckout}
              >
                ชำระเงิน
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Checkout modal */}
      <CheckoutModal 
        open={modalOpen} 
        onClose={handleCancelCheckout} 
        onConfirm={handleConfirm} 
        cart={cart}
      />
    </div>
  );
}
