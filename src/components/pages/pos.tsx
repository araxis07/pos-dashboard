import { useState } from "react";
import ProductList from "@/components/pos/ProductList";
import Cart from "@/components/pos/Cart";
import CheckoutModal from "@/components/pos/CheckoutModal";
import type { CartItem } from "@/types/pos";

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const addToCart = (product: CartItem) => {
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

  const updateQuantity = (id: string, qty: number) => {
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, qty } : item))
    );
  };

  const removeFromCart = (id: string) =>
    setCart(prev => prev.filter(item => item.id !== id));

  const handleCheckout = () => setModalOpen(true);

  const handleConfirm = () => {
    setModalOpen(false);
    setCart([]);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="grid md:grid-cols-2 gap-8">
        <ProductList onAddToCart={addToCart} />
        <Cart
          cart={cart}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={handleCheckout}
        />
        <CheckoutModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirm}
          cart={cart}
        />
      </div>
    </div>
  );
}
