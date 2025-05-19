"use client";
import { useState } from "react";
import Modal from "@/components/common/Modal";
import { Button } from "@/components/common/Button";
import { formatCurrency } from "@/components/utils/formatter";
import Receipt from "@/components/pos/Receipt";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cart: CartItem[];
}

export default function CheckoutModal({ open, onClose, onConfirm, cart }: CheckoutModalProps) {
  // Calculate totals
  const subTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vatRate = 0.07;
  const vat = subTotal * vatRate;
  const total = subTotal;
  
  // State for payment method and received amount
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'promptpay'>('cash');
  const [receivedAmount, setReceivedAmount] = useState<string>('');
  
  // Quick amounts for cash payment
  const quickAmounts = [100, 500, 1000];
  
  // Calculate change
  const change = receivedAmount ? Number(receivedAmount) - total : 0;
    // State for receipt generation
  const [showReceiptButtons, setShowReceiptButtons] = useState(false);
  
  // Handle confirming the payment
  const handlePaymentConfirmation = () => {
    if (paymentMethod === 'cash' && Number(receivedAmount) < total) {
      alert('กรุณาระบุจำนวนเงินให้เพียงพอ');
      return;
    }
    
    // Show receipt options instead of closing immediately
    setShowReceiptButtons(true);
  };
  
  // Handle final confirmation after choosing receipt option
  const handleFinalConfirm = () => {
    setShowReceiptButtons(false);
    onConfirm();
  };  // Custom footer with action buttons
  const modalFooter = showReceiptButtons ? (
    <>
      <div className="flex items-center mr-auto">
        <Receipt 
          cart={cart} 
          paymentMethod={paymentMethod}
          receivedAmount={Number(receivedAmount)}
          change={change}
        />
      </div>
      <Button 
        variant="success" 
        onClick={handleFinalConfirm}
      >
        เสร็จสิ้น
      </Button>
    </>
  ) : (
    <>
      <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
      <Button 
        variant="success" 
        onClick={handlePaymentConfirmation}
        disabled={paymentMethod === 'cash' && (Number(receivedAmount) < total || !receivedAmount)}
      >
        ยืนยันชำระเงิน
      </Button>
    </>
  );
    return (
    <Modal 
      open={open} 
      onClose={showReceiptButtons ? handleFinalConfirm : onClose} 
      title={showReceiptButtons ? "ชำระเงินสำเร็จ" : "ชำระเงิน"}
      description={showReceiptButtons 
        ? "การชำระเงินเสร็จสมบูรณ์ คุณสามารถพิมพ์ใบเสร็จได้" 
        : "กรุณาเลือกวิธีการชำระเงินและกรอกข้อมูลให้ครบถ้วน"
      }
      footer={modalFooter}
      size="lg"
    >      {showReceiptButtons ? (
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-green-700 mb-2">ชำระเงินสำเร็จ!</h3>
          <p className="text-gray-600 mb-8">คุณสามารถพิมพ์ใบเสร็จหรือปิดหน้าต่างนี้เพื่อทำรายการอื่น</p>
          
          <div className="border rounded-md p-4 bg-blue-50 text-left max-w-md mx-auto mb-6">
            <h4 className="font-medium text-blue-800 mb-2">รายละเอียดการชำระเงิน</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>วิธีชำระเงิน:</div>
              <div className="font-medium">
                {paymentMethod === 'cash' ? 'เงินสด' : paymentMethod === 'card' ? 'บัตรเครดิต' : 'พร้อมเพย์'}
              </div>
              
              {paymentMethod === 'cash' && (
                <>
                  <div>จำนวนเงินที่รับ:</div>
                  <div className="font-medium">{formatCurrency(Number(receivedAmount))}</div>
                  
                  <div>เงินทอน:</div>
                  <div className="font-medium">{formatCurrency(change)}</div>
                </>
              )}
              
              <div>จำนวนรายการ:</div>
              <div className="font-medium">{cart.reduce((sum, item) => sum + item.qty, 0)} ชิ้น</div>
              
              <div>ยอดรวมทั้งสิ้น:</div>
              <div className="font-medium text-blue-700">{formatCurrency(total)}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column - Order summary */}
          <div>
            <h3 className="font-medium text-lg mb-3">สรุปรายการ</h3>
          
          <div className="border rounded-md mb-4 overflow-hidden">
            <div className="max-h-64 overflow-y-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-3 text-left text-xs font-medium text-gray-500">รายการ</th>
                    <th className="py-2 px-3 text-center text-xs font-medium text-gray-500">จำนวน</th>
                    <th className="py-2 px-3 text-right text-xs font-medium text-gray-500">ราคา</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 px-3 text-sm">{item.name}</td>
                      <td className="py-2 px-3 text-sm text-center">{item.qty}</td>
                      <td className="py-2 px-3 text-sm text-right">{formatCurrency(item.price * item.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Order totals */}
            <div className="bg-gray-50 p-3 border-t">
              <div className="flex justify-between text-sm mb-1">
                <span>จำนวนรายการ:</span>
                <span>{cart.reduce((sum, item) => sum + item.qty, 0)} ชิ้น</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>ราคารวม:</span>
                <span>{formatCurrency(subTotal)}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>ภาษีมูลค่าเพิ่ม (รวมใน):</span>
                <span>{formatCurrency(vat)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>รวมทั้งสิ้น:</span>
                <span className="text-blue-700">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Payment methods */}
        <div>
          <h3 className="font-medium text-lg mb-3">วิธีการชำระเงิน</h3>
          
          {/* Payment method selection */}
          <div className="flex gap-2 mb-4">
            <button
              className={`flex-1 py-2 px-4 rounded-md border ${paymentMethod === 'cash' 
                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setPaymentMethod('cash')}
            >
              เงินสด
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md border ${paymentMethod === 'card' 
                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setPaymentMethod('card')}
            >
              บัตรเครดิต
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md border ${paymentMethod === 'promptpay' 
                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setPaymentMethod('promptpay')}
            >
              พร้อมเพย์
            </button>
          </div>
          
          {/* Cash payment form */}
          {paymentMethod === 'cash' && (
            <div className="border rounded-md p-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  รับเงินมา
                </label>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-2">฿</span>
                  <input
                    type="number"
                    value={receivedAmount}
                    onChange={(e) => setReceivedAmount(e.target.value)}
                    placeholder="ระบุจำนวนเงิน"
                    className="border rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              {/* Quick amount buttons */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  จำนวนเงินด่วน
                </label>
                <div className="flex gap-2">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setReceivedAmount(amount.toString())}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md text-sm"
                    >
                      ฿{amount}
                    </button>
                  ))}
                  <button
                    onClick={() => setReceivedAmount(total.toString())}
                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 rounded-md text-sm"
                  >
                    พอดี
                  </button>
                </div>
              </div>
              
              {/* Change calculation */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  เงินทอน
                </label>
                <div className="bg-gray-100 rounded-md px-3 py-3 text-right">
                  <span className={`text-xl font-bold ${change < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {change >= 0 ? formatCurrency(change) : 'รอรับเงิน'}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {/* Card payment form */}
          {paymentMethod === 'card' && (
            <div className="border rounded-md p-4 bg-gray-50 text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <p className="text-gray-600 mb-2">กรุณาให้ลูกค้าสแกนบัตร</p>
              <p className="text-sm text-gray-500">หรือใช้เครื่องรูดบัตรอื่น ๆ</p>
            </div>
          )}
            {/* PromptPay QR payment form */}
          {paymentMethod === 'promptpay' && (
            <div className="border rounded-md p-4 bg-gray-50 text-center py-6">
              <div className="w-48 h-48 mx-auto mb-4 bg-white p-2 border">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">QR Code</span>
                </div>
              </div>
              <p className="text-gray-600 mb-2">สแกน QR Code เพื่อชำระเงิน</p>
              <p className="text-sm text-gray-500">จำนวนเงิน: {formatCurrency(total)}</p>
            </div>
          )}
        </div>
      </div>
      )}
    </Modal>  );
}
