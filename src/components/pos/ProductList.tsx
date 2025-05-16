export default function ProductList({ onAddToCart }: { onAddToCart: (product: any) => void }) {
  // ใช้ mock data ได้
  const products = [
    { id: "1", name: "น้ำดื่ม", price: 10, stock: 50 },
    { id: "2", name: "ขนมปัง", price: 20, stock: 30 },
    { id: "3", name: "ขนมถุง", price: 15, stock: 24 },
  ];

  return (
    <div>
      <h2 className="font-bold text-xl mb-4">สินค้า</h2>
      <ul className="space-y-2">
        {products.map(prod => (
          <li key={prod.id} className="flex justify-between items-center border p-2 rounded-lg bg-white">
            <div>
              <div className="font-semibold">{prod.name}</div>
              <div className="text-sm text-gray-500">Stock: {prod.stock}</div>
              <div className="text-lg font-bold">{prod.price} บาท</div>
            </div>
            <button className="bg-green-600 px-4 py-1 rounded text-white" onClick={() => onAddToCart(prod)}>
              หยิบใส่ตะกร้า
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
