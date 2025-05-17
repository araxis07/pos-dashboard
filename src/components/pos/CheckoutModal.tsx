import Modal from "@/components/common/Modal";
import { formatCurrency } from "@/components/utils/formatter";

export default function CheckoutModal({ open, onClose, onConfirm, cart }: any) {
  const total = cart.reduce((sum: number, item: any) => sum + item.price * item.qty, 0);
  return (
    <Modal open={open} onClose={onClose} title="ยืนยันชำระเงิน">
      <div>
        <div className="mb-2">จำนวนรายการ: {cart.length}</div>
        <div className="font-bold text-xl">รวมเงิน: {formatCurrency(total)}</div>
        <div className="flex gap-3 mt-6">
          <button className="bg-green-600 px-4 py-2 rounded text-white flex-1 hover:bg-green-700" onClick={onConfirm}>ยืนยัน</button>
          <button className="bg-gray-300 px-4 py-2 rounded text-gray-800 flex-1 hover:bg-gray-400" onClick={onClose}>ยกเลิก</button>
        </div>
      </div>
    </Modal>
  );
}
