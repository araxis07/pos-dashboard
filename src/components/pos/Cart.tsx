export default function Cart({ cart, onRemove, onCheckout }: any) {
  const total = cart.reduce((sum: number, item: any) => sum + item.price * item.qty, 0);
  return (
    <div>
      <h2 className="font-bold text-xl mb-4">ตะกร้าสินค้า</h2>
      <ul className="mb-2">
        {cart.map((item: any, idx: number) => (
          <li key={idx} className="flex justify-between items-center border p-2 rounded-lg bg-white mb-2">
            <span>{item.name} x {item.qty}</span>
            <span>{item.price * item.qty} บาท</span>
            <button onClick={() => onRemove(item.id)} className="text-red-500">ลบ</button>
          </li>
        ))}
      </ul>
      <div className="font-bold mb-2">รวม: {total} บาท</div>
      <button className="bg-blue-700 text-white px-4 py-2 rounded" onClick={onCheckout} disabled={cart.length === 0}>ชำระเงิน</button>
    </div>
  );
}
