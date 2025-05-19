import { formatCurrency } from "@/components/utils/formatter";
import { useState } from "react";
import { Button } from "@/components/common/Button";

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

interface ProductTableProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  onUpdateStock?: (productId: string, newStock: number) => void;
}

export default function ProductTable({ products, onEdit, onDelete, onUpdateStock }: ProductTableProps) {
  const [stockUpdates, setStockUpdates] = useState<Record<string, number>>({});
  
  // No products state
  if (!products.length) {
    return (
      <div className="text-center text-gray-400 py-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p className="font-medium">ไม่มีข้อมูลสินค้า</p>
        <p className="text-sm">กรุณาเพิ่มสินค้าใหม่หรือลองค้นหาด้วยคำค้นอื่น</p>
      </div>
    );
  }
  
  // Handle stock update
  const handleStockUpdate = (productId: string) => {
    if (onUpdateStock && typeof stockUpdates[productId] === 'number') {
      onUpdateStock(productId, stockUpdates[productId]);
      setStockUpdates(prev => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-blue-50 text-left text-blue-900">
            <th className="px-4 py-3 text-sm font-semibold">ชื่อสินค้า</th>
            <th className="px-4 py-3 text-sm font-semibold">ราคา</th>
            <th className="px-4 py-3 text-sm font-semibold">ราคาทุน</th>
            <th className="px-4 py-3 text-sm font-semibold">สต็อก</th>
            <th className="px-4 py-3 text-sm font-semibold">หมวดหมู่</th>
            <th className="px-4 py-3 text-sm font-semibold">บาร์โค้ด</th>
            <th className="px-4 py-3 text-sm font-semibold">จัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map(product => (
            <tr key={product.id} className="hover:bg-blue-50/30 transition group">
              <td className="px-4 py-3">
                <div>
                  <span className="font-medium text-gray-900">{product.name}</span>
                  {product.supplier && (
                    <div className="text-xs text-gray-500 mt-1">
                      ซัพพลายเออร์: {product.supplier}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 font-medium">{formatCurrency(product.price)}</td>
              <td className="px-4 py-3 text-gray-600">
                {product.costPrice ? formatCurrency(product.costPrice) : "-"}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className={`inline-flex items-center ${
                    product.stock <= 0 
                      ? 'text-red-600 bg-red-50' 
                      : product.stock <= 10 
                        ? 'text-amber-600 bg-amber-50' 
                        : 'text-green-600 bg-green-50'
                  } px-2 py-0.5 rounded-full text-xs font-medium`}>
                    {product.stock <= 0 
                      ? 'หมด' 
                      : product.stock <= 10 
                        ? `เหลือน้อย (${product.stock})` 
                        : product.stock}
                  </div>
                  {onUpdateStock && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center">
                        <input 
                          type="number"
                          className="w-16 border border-gray-300 rounded-l px-2 py-1 text-sm"
                          placeholder="จำนวน"
                          value={stockUpdates[product.id] ?? ''}
                          onChange={(e) => {
                            const value = e.target.value === '' ? '' : Number(e.target.value);
                            setStockUpdates({...stockUpdates, [product.id]: value === '' ? 0 : value});
                          }}
                        />
                        <Button 
                          size="xs"
                          variant="secondary"
                          className="rounded-l-none" 
                          onClick={() => handleStockUpdate(product.id)}
                          disabled={stockUpdates[product.id] === undefined}
                        >
                          อัพเดต
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                {product.category ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                ) : (
                  <span className="text-gray-400 text-sm">-</span>
                )}
              </td>
              <td className="px-4 py-3 font-mono text-sm text-gray-600">{product.barcode || "-"}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(product)}
                      className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition"
                      title="แก้ไขสินค้า"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(product.id)}
                      className="p-1.5 text-red-600 hover:bg-red-100 rounded transition"
                      title="ลบสินค้า"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
