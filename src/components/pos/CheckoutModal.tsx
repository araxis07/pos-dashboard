import Modal from "@/components/common/Modal";

export default function CheckoutModal({ open, onClose, onConfirm, cart }: any) {
  const total = cart.reduce((sum: number, item: any) => sum + item.price * item.qty, 0);
  return (
    <Modal open={open} onClose={onClose} title="ยืนยันชำระเงิน">
      <div>
        <div className="mb-2">จำนวนรายการ: {cart.length}</div>
        <div className="font-bold text-xl">รวมเงิน: {total} บาท</div>
        <button className="bg-green-600 px-4 py-2 rounded text-white mt-4 mr-3" onClick={onConfirm}>ยืนยัน</button>
        <button className="bg-gray-300 px-4 py-2 rounded text-gray-800 mt-4" onClick={onClose}>ยกเลิก</button>
      </div>
    </Modal>
  );
}
