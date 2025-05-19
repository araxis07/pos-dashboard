import Image from "next/image";
import { formatCurrency } from "@/components/utils/formatter";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category?: string;
  image?: string;
  barcode?: string;
}

interface ProductListProps {
  onAddToCart: (product: Product) => void;
  searchTerm?: string;
  category?: string;
}

export default function ProductList({ onAddToCart, searchTerm = "", category = "all" }: ProductListProps) {
  // Mock data with more details - in a real app this would come from an API
  const allProducts: Product[] = [
    { id: "1", name: "น้ำดื่ม", price: 10, stock: 50, category: "drinks", barcode: "8850123456789" },
    { id: "2", name: "ขนมปัง", price: 20, stock: 30, category: "food", barcode: "8850987654321" },
    { id: "3", name: "ขนมถุง", price: 15, stock: 24, category: "snacks", barcode: "8850456789123" },
    { id: "4", name: "น้ำอัดลม", price: 20, stock: 40, category: "drinks", barcode: "8850111222333" },
    { id: "5", name: "มาม่า", price: 6, stock: 100, category: "food", barcode: "8850333222111" },
    { id: "6", name: "แซนวิช", price: 25, stock: 15, category: "food", barcode: "8850444555666" },
    { id: "7", name: "น้ำผลไม้", price: 25, stock: 30, category: "drinks", barcode: "8850666777888" },
    { id: "8", name: "ช็อคโกแลต", price: 35, stock: 45, category: "snacks", barcode: "8850999888777" },
    { id: "9", name: "ไอศกรีม", price: 30, stock: 20, category: "snacks", barcode: "8850111999888" },
  ];
  
  // Filter products based on search term and category
  const filteredProducts = allProducts.filter(prod => {
    const matchesSearch = searchTerm === "" || 
                         prod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         prod.barcode?.includes(searchTerm);
                         
    const matchesCategory = category === "all" || prod.category === category;
    
    return matchesSearch && matchesCategory;
  });
  
  // Generate a placeholder image URL for products
  const getProductImage = (name: string) => {
    return `https://via.placeholder.com/100?text=${encodeURIComponent(name)}`;
  };
  
  // Function to determine stock status color
  const getStockStatusColor = (stock: number) => {
    if (stock <= 5) return "text-red-700 bg-red-50";
    if (stock <= 20) return "text-amber-700 bg-amber-50";
    return "text-green-700 bg-green-50";
  };

  // Handle empty results after filtering
  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <p className="text-gray-500 mt-4">ไม่พบสินค้าที่ตรงกับการค้นหา</p>
        <p className="text-gray-400 text-sm">ลองค้นหาด้วยคำอื่น หรือเปลี่ยนหมวดหมู่</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredProducts.map(product => (
        <div 
          key={product.id} 
          className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Product image */}
          <div className="relative w-full h-28 bg-gray-100">
            <Image 
              src={product.image || getProductImage(product.name)}
              alt={product.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          
          {/* Product details */}
          <div className="p-3">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <span className="font-bold text-blue-700">{formatCurrency(product.price)}</span>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <div className={`text-xs px-2 py-1 rounded-full ${getStockStatusColor(product.stock)}`}>
                สต็อก: {product.stock}
              </div>
              
              {product.barcode && (
                <div className="text-xs text-gray-500">
                  {product.barcode}
                </div>
              )}
            </div>
            
            <button 
              className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
              onClick={() => onAddToCart(product)}
              disabled={product.stock <= 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              เพิ่มลงตะกร้า
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
