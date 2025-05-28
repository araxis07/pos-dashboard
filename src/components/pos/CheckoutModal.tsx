"use client";
import { useState, useEffect } from "react";
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
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Reset states when modal is opened
  useEffect(() => {
    if (open) {
      setReceivedAmount('');
      setPaymentMethod('cash');
      setShowReceiptButtons(false);
      setIsProcessing(false);
    }
  }, [open]);
  
  // Handle confirming the payment
  const handlePaymentConfirmation = async () => {
    if (paymentMethod === 'cash' && Number(receivedAmount) < total) {
      alert('กรุณาระบุจำนวนเงินให้เพียงพอ');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setIsProcessing(false);
    // Show receipt options instead of closing immediately
    setShowReceiptButtons(true);
  };
  
  // Handle final confirmation after choosing receipt option
  const handleFinalConfirm = () => {
    setShowReceiptButtons(false);
    onConfirm();
  };
  
  // Reset states when modal closes
  const handleClose = () => {
    setShowReceiptButtons(false);
    setReceivedAmount('');
    setPaymentMethod('cash');
    onClose();
  };
  
  // Custom footer with action buttons
  const modalFooter = showReceiptButtons ? (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center">
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
        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        เสร็จสิ้น
      </Button>
    </div>
  ) : (
    <div className="flex space-x-3">
      <Button 
        variant="outline" 
        onClick={handleClose}
        className="flex-1"
      >
        ยกเลิก
      </Button>
      <Button 
        variant="success" 
        onClick={handlePaymentConfirmation}
        disabled={paymentMethod === 'cash' && (Number(receivedAmount) < total || !receivedAmount) || isProcessing}
        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400"
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
            กำลังประมวลผล...
          </>
        ) : (
          <>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            ยืนยันชำระเงิน
          </>
        )}
      </Button>
    </div>
  );
  
  return (
    <Modal 
      open={open} 
      onClose={showReceiptButtons ? handleFinalConfirm : handleClose} 
      title={showReceiptButtons ? "ชำระเงินสำเร็จ" : "ชำระเงิน"}
      description={showReceiptButtons 
        ? "การชำระเงินเสร็จสมบูรณ์ คุณสามารถพิมพ์ใบเสร็จได้" 
        : "กรุณาเลือกวิธีการชำระเงินและกรอกข้อมูลให้ครบถ้วน"
      }
      footer={modalFooter}
      size="lg"
    >
      {showReceiptButtons ? (
        <div className="text-center py-8">
          <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mx-auto flex items-center justify-center mb-6">
            <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-green-700 mb-3">ชำระเงินสำเร็จ!</h3>
          <p className="text-gray-600 mb-8 text-lg">คุณสามารถพิมพ์ใบเสร็จหรือปิดหน้าต่างนี้เพื่อทำรายการอื่น</p>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 max-w-md mx-auto mb-6 shadow-md transform hover:shadow-lg transition-all duration-300">
            <h4 className="font-semibold text-blue-800 mb-4 text-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              รายละเอียดการชำระเงิน
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-gray-600">วิธีชำระเงิน:</div>
              <div className="font-medium text-gray-900">
                {paymentMethod === 'cash' ? '💵 เงินสด' : paymentMethod === 'card' ? '💳 บัตรเครดิต' : '📱 พร้อมเพย์'}
              </div>
              
              {paymentMethod === 'cash' && (
                <>
                  <div className="text-gray-600">จำนวนเงินที่รับ:</div>
                  <div className="font-medium text-gray-900">{formatCurrency(Number(receivedAmount))}</div>
                  
                  <div className="text-gray-600">เงินทอน:</div>
                  <div className="font-medium text-green-600">{formatCurrency(change)}</div>
                </>
              )}
              
              <div className="text-gray-600">จำนวนรายการ:</div>
              <div className="font-medium text-gray-900">{cart.reduce((sum, item) => sum + item.qty, 0)} ชิ้น</div>
              
              <div className="text-gray-600 border-t border-blue-200 pt-2">ยอดรวมทั้งสิ้น:</div>
              <div className="font-bold text-blue-700 border-t border-blue-200 pt-2 text-lg">{formatCurrency(total)}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Order summary */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">สรุปรายการ</h3>
            </div>
          
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">รายการ</th>
                      <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">จำนวน</th>
                      <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700">ราคา</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {cart.map((item, index) => (
                      <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="py-3 px-4 text-sm text-gray-900">{item.name}</td>
                        <td className="py-3 px-4 text-sm text-center">
                          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
                            {item.qty}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-gray-900">
                          {formatCurrency(item.price * item.qty)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Order totals */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>จำนวนรายการ:</span>
                  <span className="font-medium">{cart.reduce((sum, item) => sum + item.qty, 0)} ชิ้น</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>ราคารวม:</span>
                  <span className="font-medium">{formatCurrency(subTotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>ภาษีมูลค่าเพิ่ม 7% (รวมใน):</span>
                  <span className="font-medium">{formatCurrency(vat)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl pt-3 border-t border-gray-300">
                  <span className="text-gray-900">รวมทั้งสิ้น:</span>
                  <span className="text-indigo-600">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        
          {/* Right column - Payment methods */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">วิธีการชำระเงิน</h3>
            </div>
          
            {/* Payment method selection */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                className={`p-4 rounded-xl border-2 transition-all duration-200 shadow-sm ${
                  paymentMethod === 'cash' 
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-500 text-green-700 shadow-lg shadow-green-100 transform scale-105' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                }`}
                onClick={() => setPaymentMethod('cash')}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">💵</div>
                  <div className="font-medium text-sm">เงินสด</div>
                </div>
              </button>
              <button
                className={`p-4 rounded-xl border-2 transition-all duration-200 shadow-sm ${
                  paymentMethod === 'card' 
                  ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-500 text-blue-700 shadow-lg shadow-blue-100 transform scale-105' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">💳</div>
                  <div className="font-medium text-sm">บัตรเครดิต</div>
                </div>
              </button>
              <button
                className={`p-4 rounded-xl border-2 transition-all duration-200 shadow-sm ${
                  paymentMethod === 'promptpay' 
                  ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-500 text-purple-700 shadow-lg shadow-purple-100 transform scale-105' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                }`}
                onClick={() => setPaymentMethod('promptpay')}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="font-medium text-sm">พร้อมเพย์</div>
                </div>
              </button>
            </div>
            
            {/* Cash payment form */}
            {paymentMethod === 'cash' && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 space-y-6 shadow-sm">
                <div>                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-3">
                    <span className="text-lg mr-2">💵</span> รับเงินมา
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-semibold">฿</span>
                    <input
                      type="number"
                      value={receivedAmount}
                      onChange={(e) => setReceivedAmount(e.target.value)}
                      placeholder="ระบุจำนวนเงิน"
                      className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-xl text-lg font-medium focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-sm"
                    />
                  </div>
                </div>
                
                {/* Quick amount buttons */}
                <div>                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-3">
                    <span className="text-lg mr-2">⚡</span> จำนวนเงินด่วน
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {quickAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setReceivedAmount(amount.toString())}
                        className="bg-white hover:bg-green-100 text-gray-800 hover:text-green-700 py-3 rounded-xl text-sm font-medium border border-green-200 hover:border-green-300 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        ฿{amount.toLocaleString()}
                      </button>
                    ))}
                    <button
                      onClick={() => setReceivedAmount(total.toString())}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      พอดี
                    </button>
                  </div>
                </div>
                
                {/* Change calculation */}
                <div>                  <label className="flex items-center text-gray-700 text-sm font-semibold mb-3">
                    <span className="text-lg mr-2">💰</span> เงินทอน
                  </label>
                  <div className={`rounded-xl px-4 py-4 text-right border-2 shadow-sm ${
                    Number(receivedAmount) >= total && receivedAmount 
                      ? 'bg-green-100 border-green-300' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <span className={`text-2xl font-bold ${
                      Number(receivedAmount) >= total && receivedAmount 
                        ? 'text-green-700' 
                        : 'text-red-400'
                    }`}>
                      {Number(receivedAmount) >= total && receivedAmount 
                        ? formatCurrency(change) 
                        : 'รอรับเงิน'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Card payment form */}
            {paymentMethod === 'card' && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg">
                  <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-blue-800 mb-2">💳 ชำระด้วยบัตรเครดิต</h4>
                <p className="text-blue-600 mb-6">กรุณาให้ลูกค้าสแกนบัตร</p>
                <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm mb-4">
                  <p className="text-sm text-gray-600 mb-1">ยอดรวม:</p>
                  <p className="font-bold text-2xl text-blue-600">{formatCurrency(total)}</p>
                </div>
                <div className="text-xs text-blue-600">รองรับบัตร Visa, MasterCard, JCB และ UnionPay</div>
              </div>
            )}
              
            {/* PromptPay QR payment form */}
            {paymentMethod === 'promptpay' && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300">
                <h4 className="text-lg font-semibold text-purple-800 mb-6">📱 ชำระด้วยพร้อมเพย์</h4>
                <div className="bg-white rounded-xl p-6 border border-purple-200 mb-6 inline-block shadow-sm">
                  <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4" />
                      </svg>
                      <p className="text-gray-500 text-sm">QR Code</p>
                    </div>
                  </div>
                </div>
                <p className="text-purple-600 mb-2 font-medium">สแกน QR Code เพื่อชำระเงิน</p>
                <p className="text-purple-800 font-bold text-lg mb-4">จำนวนเงิน: {formatCurrency(total)}</p>
                <div className="text-xs text-purple-600 px-6 py-2 bg-purple-100 rounded-full inline-block">หมดเวลาใน 14:59 นาที</div>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
