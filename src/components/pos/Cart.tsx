import { formatCurrency } from "@/components/utils/formatter";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  [key: string]: any;
}

interface CartProps {
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onCheckout: () => void;
}

export default function Cart({ cart, onRemove, onUpdateQuantity, onCheckout }: CartProps) {
  // Empty cart component
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-gray-400 text-center py-8">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-20 w-20 mx-auto mb-4 text-gray-300"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
          <p className="text-lg">ยังไม่มีสินค้าในตะกร้า</p>
          <p className="text-sm mt-2">กรุณาเลือกสินค้าเพื่อเพิ่มในตะกร้า</p>
        </div>
      </div>
    );
  }
  
  // Cart with items
  return (
    <div>
      <ul className="mb-2 space-y-2">
        {cart.map((item) => (
          <li 
            key={item.id} 
            className="flex flex-col rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center p-3">
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{formatCurrency(item.price)} x {item.qty}</p>
              </div>
              
              <div className="font-bold text-blue-700">
                {formatCurrency(item.price * item.qty)}
              </div>
            </div>
            
            <div className="flex justify-between items-center bg-gray-50 p-2 border-t">
              {/* Quantity controls */}
              <div className="flex items-center">
                <button 
                  onClick={() => onUpdateQuantity(item.id, item.qty - 1)}
                  className="h-8 w-8 flex items-center justify-center rounded-l-md bg-gray-200 hover:bg-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                
                <span className="h-8 w-12 flex items-center justify-center bg-white border-y border-gray-200">
                  {item.qty}
                </span>
                
                <button 
                  onClick={() => onUpdateQuantity(item.id, item.qty + 1)}
                  className="h-8 w-8 flex items-center justify-center rounded-r-md bg-gray-200 hover:bg-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              
              {/* Delete button */}
              <button 
                onClick={() => onRemove(item.id)} 
                className="flex items-center text-red-500 hover:text-red-700 rounded-md px-2 py-1 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                ลบ
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
