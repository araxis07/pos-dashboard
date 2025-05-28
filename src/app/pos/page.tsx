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
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock categories for demonstration
  const categories = [
    { id: "all", name: "ทั้งหมด", icon: "🏷️" },
    { id: "drinks", name: "เครื่องดื่ม", icon: "🥤" }, 
    { id: "food", name: "อาหาร", icon: "🍜" },
    { id: "snacks", name: "ขนม", icon: "🍪" },
    { id: "electronics", name: "อิเล็กทรอนิกส์", icon: "📱" }
  ];
  
  // Calculate cart total whenever cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    setCartTotal(total);
  }, [cart]);
  
  // Add product to cart
  const addToCart = (product: Product) => {
    // Check if product is in stock
    if (product.stock <= 0) {
      toast.error("สินค้าหมด");
      return;
    }
    
    setCart(prev => {
      const idx = prev.findIndex(item => item.id === product.id);
      if (idx !== -1) {
        // Check if adding one more would exceed stock
        if (prev[idx].qty >= product.stock) {
          toast.error("สินค้าไม่เพียงพอ");
          return prev;
        }
        // Product already in cart, increase quantity
        const updated = [...prev];
        updated[idx].qty += 1;
        return updated;
      }
      // Add new product to cart
      return [...prev, { ...product, qty: 1 }];
    });
    
    // Show toast notification
    toast.success(`เพิ่ม ${product.name} ลงตะกร้าแล้ว`, {
      icon: "🛒",
      style: {
        background: '#10B981',
        color: 'white',
      },
    });
  };
  
  // Update product quantity in cart
  const updateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return removeFromCart(id);
    
    const product = cart.find(item => item.id === id);
    if (product && newQty > product.stock) {
      toast.error("จำนวนเกินสินค้าในสต็อก");
      return;
    }
    
    setCart(prev => 
      prev.map(item => 
        item.id === id ? { ...item, qty: newQty } : item
      )
    );
  };
  
  // Remove product from cart
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.error("นำรายการออกจากตะกร้าแล้ว", {
      icon: "🗑️",
    });
  };
  
  // Open checkout modal
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("ตะกร้าสินค้าว่าง");
      return;
    }
    setModalOpen(true);
  };
  
  // Confirm checkout
  const handleConfirm = async () => {
    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setModalOpen(false);
    setIsLoading(false);
    
    // Clear cart after successful checkout
    setCart([]);
    
    // Show success notification
    toast.success("ชำระเงินสำเร็จ! ขอบคุณที่ใช้บริการ", {
      icon: "✅",
      duration: 4000,
      style: {
        background: '#059669',
        color: 'white',
      },
    });
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
      toast.success("ล้างตะกร้าเรียบร้อยแล้ว", {
        icon: "🗑️",
      });
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'f':
            event.preventDefault();
            document.getElementById('search-input')?.focus();
            break;
          case 'Enter':
            event.preventDefault();
            handleCheckout();
            break;
          case 'Backspace':
            event.preventDefault();
            handleClearCart();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [cart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🛒</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">หน้าขายสินค้า (POS)</h1>
                <p className="text-gray-600">ขายสินค้าและรับชำระเงินอย่างรวดเร็ว</p>
              </div>
            </div>
            
            {/* Quick stats */}
            <div className="flex gap-4 text-sm">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <div className="text-blue-600 font-medium">ยอดขายวันนี้</div>
                <div className="text-blue-900 font-bold">฿25,430</div>
              </div>
              <div className="bg-green-50 px-4 py-2 rounded-lg">
                <div className="text-green-600 font-medium">รายการ</div>
                <div className="text-green-900 font-bold">47</div>
              </div>
            </div>
          </div>
          
          {/* Quick actions */}
          <div className="flex gap-2 mt-4">
            <Link href="/products">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium">
                <span>📦</span>
                จัดการสินค้า
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium">
                <span>📊</span>
                แดชบอร์ด
              </button>
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium">
              <span>⌨️</span>
              Ctrl+F ค้นหา
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Product section - Left side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              {/* Search and filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input 
                    id="search-input"
                    type="text" 
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    placeholder="ค้นหาสินค้า หรือสแกนบาร์โค้ด... (Ctrl+F)" 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Category tabs */}
              <div className="flex overflow-x-auto pb-2 mb-6 gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all font-medium ${
                      selectedCategory === category.id 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
              
              {/* Product list */}
              <div className="h-[calc(100vh-400px)] overflow-y-auto pr-2">
                <ProductList 
                  onAddToCart={addToCart}
                  searchTerm={searchTerm} 
                  category={selectedCategory} 
                />
              </div>
            </div>
          </div>
          
          {/* Cart section - Right side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-[calc(100vh-140px)] flex flex-col">
              {/* Cart header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">🛒</span>
                    </div>
                    <h2 className="font-bold text-xl text-gray-900">ตะกร้าสินค้า</h2>
                  </div>
                  {cart.length > 0 && (
                    <button 
                      onClick={handleClearCart}
                      className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="ล้างตะกร้า (Ctrl+Backspace)"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {cart.length > 0 && (
                  <div className="flex gap-4 mt-3 text-sm text-gray-600">
                    <span>{cart.length} รายการ</span>
                    <span>{cart.reduce((sum, item) => sum + item.qty, 0)} ชิ้น</span>
                  </div>
                )}
              </div>
              
              {/* Cart items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-3xl">🛒</span>
                    </div>
                    <p className="text-center font-medium">ตะกร้าสินค้าว่าง</p>
                    <p className="text-sm text-center mt-1">เลือกสินค้าเพื่อเริ่มการขาย</p>
                  </div>
                ) : (
                  <Cart 
                    cart={cart} 
                    onRemove={removeFromCart} 
                    onUpdateQuantity={updateQuantity}
                    onCheckout={handleCheckout} 
                  />
                )}
              </div>
              
              {/* Cart summary & checkout */}
              {cart.length > 0 && (
                <div className="border-t border-gray-100 p-6 bg-gray-50 rounded-b-xl">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">จำนวนรายการ:</span>
                      <span className="font-medium">{cart.reduce((sum, item) => sum + item.qty, 0)} ชิ้น</span>
                    </div>
                    
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-gray-900">รวมเงินทั้งสิ้น:</span>
                      <span className="font-bold text-2xl text-blue-700">
                        ฿{cartTotal.toLocaleString('th-TH')}
                      </span>
                    </div>
                    
                    <button 
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          กำลังประมวลผล...
                        </>
                      ) : (
                        <>
                          <span>💳</span>
                          ชำระเงิน (Ctrl+Enter)
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Checkout modal */}
      <CheckoutModal 
        open={modalOpen} 
        onClose={handleCancelCheckout} 
        onConfirm={handleConfirm} 
        cart={cart}
        isLoading={isLoading}
      />
    </div>
  );
}
  
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
