import { useState, useEffect } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
  image?: string;
  barcode?: string;
  description?: string;
  discount?: number;
}

interface ProductListProps {
  onAddToCart: (product: Product) => void;
  searchTerm?: string;
  category?: string;
}

export default function ProductList({ onAddToCart, searchTerm = "", category = "all" }: ProductListProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  
  // Simulate fetching products with loading state
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data with more variety
        const allProducts: Product[] = [
          { 
            id: "1", 
            name: "น้ำดื่ม", 
            price: 10, 
            stock: 50, 
            category: "drinks", 
            barcode: "8850123456789",
            description: "น้ำดื่มบริสุทธิ์ 600ml",
            discount: 0
          },
          { 
            id: "2", 
            name: "ขนมปัง", 
            price: 20, 
            stock: 30, 
            category: "food", 
            barcode: "8850987654321",
            description: "ขนมปังโฮลวีท",
            discount: 10
          },
          { 
            id: "3", 
            name: "ขนมถุง", 
            price: 15, 
            stock: 24, 
            category: "snacks", 
            barcode: "8850456789123",
            description: "ขนมขบเคี้ยวรสชีส" 
          },
          { 
            id: "4", 
            name: "น้ำอัดลม", 
            price: 20, 
            stock: 40, 
            category: "drinks", 
            barcode: "8850111222333",
            description: "น้ำอัดลมรสโคลา 325ml",
            discount: 5
          },
          { 
            id: "5", 
            name: "มาม่า", 
            price: 6, 
            stock: 100, 
            category: "food", 
            barcode: "8850333222111",
            description: "บะหมี่กึ่งสำเร็จรูป" 
          },
          { 
            id: "6", 
            name: "แซนวิช", 
            price: 25, 
            stock: 15, 
            category: "food", 
            barcode: "8850444555666",
            description: "แซนวิชไก่ย่าง",
            discount: 15
          },
          { 
            id: "7", 
            name: "น้ำผลไม้", 
            price: 25, 
            stock: 30, 
            category: "drinks", 
            barcode: "8850666777888",
            description: "น้ำส้มคั้นสด 100%" 
          },
          { 
            id: "8", 
            name: "ช็อคโกแลต", 
            price: 35, 
            stock: 45, 
            category: "snacks", 
            barcode: "8850999888777",
            description: "ช็อคโกแลตนม" 
          },
          { 
            id: "9", 
            name: "ไอศกรีม", 
            price: 30, 
            stock: 3, 
            category: "snacks", 
            barcode: "8850111999888",
            description: "ไอศกรีมวนิลลา" 
          },
          { 
            id: "10", 
            name: "สมาร์ทโฟน", 
            price: 8900, 
            stock: 5, 
            category: "electronics", 
            barcode: "8850999999999",
            description: "สมาร์ทโฟน Android",
            discount: 500
          },
          { 
            id: "11", 
            name: "หูฟัง", 
            price: 1200, 
            stock: 12, 
            category: "electronics", 
            barcode: "8850888888888",
            description: "หูฟัง Bluetooth" 
          },
        ];
        
        setProducts(allProducts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('เกิดข้อผิดพลาดในการโหลดข้อมูล'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Filter products based on search term and category
  const filteredProducts = products.filter(prod => {
    const matchesSearch = searchTerm === "" || 
                         prod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         prod.barcode?.includes(searchTerm) ||
                         prod.description?.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchesCategory = category === "all" || prod.category === category;
    
    return matchesSearch && matchesCategory;
  });
  
  // Generate a placeholder image URL for products
  const getProductImage = (name: string, category: string = "") => {
    const categoryEmojis: { [key: string]: string } = {
      'drinks': '🥤',
      'food': '🍜',
      'snacks': '🍪',
      'electronics': '📱'
    };
    
    const emoji = categoryEmojis[category] || '📦';
    return `https://via.placeholder.com/120x120/6366f1/ffffff?text=${emoji}`;
  };
  
  // Function to determine stock status
  const getStockStatus = (stock: number) => {
    if (stock <= 0) return { color: "bg-red-100 text-red-800", text: "หมด", icon: "❌" };
    if (stock <= 5) return { color: "bg-red-100 text-red-800", text: "ใกล้หมด", icon: "⚠️" };
    if (stock <= 20) return { color: "bg-yellow-100 text-yellow-800", text: "เหลือน้อย", icon: "⚡" };
    return { color: "bg-green-100 text-green-800", text: "พร้อมขาย", icon: "✅" };
  };

  // Calculate final price after discount
  const getFinalPrice = (price: number, discount: number = 0) => {
    return price - discount;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="overflow-hidden bg-white border border-gray-200 rounded-xl animate-pulse">
            <div className="h-32 bg-gray-200"></div>
            <div className="p-4 space-y-3">
              <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
              <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-red-100 rounded-full">
          <span className="text-2xl">❌</span>
        </div>
        <p className="font-medium text-red-600">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
        <p className="mt-1 text-sm text-gray-500">{error.message}</p>
      </div>
    );
  }

  // Handle empty results after filtering
  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="flex items-center justify-center w-20 h-20 mb-4 bg-gray-100 rounded-full">
          <span className="text-3xl">🔍</span>
        </div>
        <p className="text-lg font-medium text-gray-600">ไม่พบสินค้าที่ตรงกับการค้นหา</p>
        <p className="mt-1 text-sm text-gray-400">ลองค้นหาด้วยคำอื่น หรือเปลี่ยนหมวดหมู่</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredProducts.map(product => {
        const stockStatus = getStockStatus(product.stock);
        const finalPrice = getFinalPrice(product.price, product.discount);
        const hasDiscount = product.discount && product.discount > 0;
        
        return (
          <div 
            key={product.id} 
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200 transform hover:scale-[1.02]"
          >
            {/* Product image */}
            <div className="relative w-full h-32 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
              <Image 
                src={product.image || getProductImage(product.name, product.category)}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {hasDiscount && (
                <div className="absolute px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full top-2 left-2">
                  ลด ฿{product.discount}
                </div>
              )}
              
              <div className={`absolute top-2 right-2 ${stockStatus.color} text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1`}>
                <span>{stockStatus.icon}</span>
                {stockStatus.text}
              </div>
            </div>
            
            {/* Product details */}
            <div className="p-4">
              <div className="mb-2">
                <h3 className="text-sm font-semibold text-gray-900 transition-colors line-clamp-1 group-hover:text-blue-700">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                )}
              </div>
              
              {/* Price section */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col">
                  {hasDiscount ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-red-600">
                          ฿{finalPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ฿{product.price.toLocaleString()}
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="text-lg font-bold text-blue-700">
                      ฿{product.price.toLocaleString()}
                    </span>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="text-xs text-gray-500">สต็อก</div>
                  <div className="text-sm font-medium text-gray-900">{product.stock}</div>
                </div>
              </div>
              
              {/* Barcode */}
              {product.barcode && (
                <div className="mb-3 font-mono text-xs text-gray-400">
                  #{product.barcode}
                </div>
              )}
              
              {/* Add to cart button */}
              <button 
                className={`w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  product.stock <= 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg transform hover:scale-105'
                }`}
                onClick={() => onAddToCart(product)}
                disabled={product.stock <= 0}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {product.stock <= 0 ? 'สินค้าหมด' : 'เพิ่มลงตะกร้า'}
              </button>
            </div>          </div>
        );
      })}
    </div>
  );
}
