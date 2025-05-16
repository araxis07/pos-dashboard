import { useState } from "react";
import ProductList from "@/components/pos/ProductList";
import Cart from "@/components/pos/Cart";
import CheckoutModal from "@/components/pos/CheckoutModal";

export default function POSPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const addToCart = (product: any) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.id === product.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].qty += 1;
        return updated;
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) =>
    setCart(prev => prev.filter(item => item.id !== id));

  const handleCheckout = () => setModalOpen(true);

  const handleConfirm = () => {
    setModalOpen(false);
    setCart([]);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <ProductList onAddToCart={addToCart} />
      <Cart cart={cart} onRemove={removeFromCart} onCheckout={handleCheckout} />
      <CheckoutModal open={modalOpen} onClose={() => setModalOpen(false)} onConfirm={handleConfirm} cart={cart} />
    </div>
  );
}
