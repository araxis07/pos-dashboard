import { formatCurrency } from "@/components/utils/formatter";
import type { CartItem } from "@/types/pos";

interface CartProps {
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onCheckout: () => void;
}

export default function Cart({ cart, onRemove, onUpdateQuantity, onCheckout }: CartProps) {
  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const vatRate = 0.07;
  const vat = subtotal * vatRate;
  const total = subtotal;
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // Empty cart component
  if (cart.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            ตะกร้าสินค้า
          </h2>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-indigo-400"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">ตะกร้าของคุณว่างเปล่า</h3>
          <p className="text-gray-500 text-center max-w-sm">
            เริ่มต้นเลือกสินค้าที่คุณต้องการจากรายการสินค้าด้านซ้าย
          </p>
        </div>
      </div>
    );
  }  
  // Cart with items
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            ตะกร้าสินค้า
          </h2>
          <div className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-1 rounded-full">
            {totalItems} ชิ้น
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.map((item) => (
          <div 
            key={item.id} 
            className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            {/* Item Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatCurrency(item.price)} × {item.qty}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-lg font-bold text-indigo-600">
                    {formatCurrency(item.price * item.qty)}
                  </div>
                </div>
              </div>
              
              {/* Quantity Controls & Remove */}
              <div className="flex items-center justify-between">
                <div className="flex items-center bg-gray-50 rounded-lg">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.qty - 1)}
                    className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                    title="ลดจำนวน"
                    disabled={item.qty <= 1}
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  
                  <div className="px-4 py-2 min-w-[3rem] text-center font-medium text-gray-900 bg-white border-y border-gray-200">
                    {item.qty}
                  </div>
                  
                  <button 
                    onClick={() => onUpdateQuantity(item.id, item.qty + 1)}
                    className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                    title="เพิ่มจำนวน"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                
                <button 
                  onClick={() => onRemove(item.id)} 
                  className="flex items-center space-x-1 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                  title="ลบรายการ"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="text-sm font-medium">ลบ</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>ยอดรวม ({totalItems} รายการ)</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>ภาษีมูลค่าเพิ่ม 7% (รวมใน)</span>
            <span>{formatCurrency(vat)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-300">
            <span>รวมทั้งสิ้น</span>
            <span className="text-indigo-600">{formatCurrency(total)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>ดำเนินการชำระเงิน</span>
        </button>
      </div>
    </div>
  );
}
