"use client";
import { useState } from 'react';
import { Button } from "@/components/common/Button";
import { formatCurrency, formatDateTime, convertToThaiText } from "@/components/utils/formatter";
import { printContent, generateReceiptNumber, getCurrentDateTime } from "@/components/utils/printing";

interface ReceiptProps {
  cart: CartItem[];
  paymentMethod: 'cash' | 'card' | 'promptpay';
  receivedAmount?: number;
  change?: number;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export default function Receipt({ cart, paymentMethod, receivedAmount, change }: ReceiptProps) {
  const [receiptNumber] = useState(generateReceiptNumber());
  const { date, time } = getCurrentDateTime();
  const [isPrinting, setIsPrinting] = useState(false);
  
  // Calculate totals
  const subTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const vatRate = 0.07;
  const vat = subTotal * vatRate;
  const total = subTotal;
  
  // Get payment method text
  const getPaymentMethodText = () => {
    switch (paymentMethod) {
      case 'cash':
        return 'เงินสด';
      case 'card':
        return 'บัตรเครดิต';
      case 'promptpay':
        return 'พร้อมเพย์';
      default:
        return 'อื่นๆ';
    }
  };
  
  const handlePrintReceipt = () => {
    setIsPrinting(true);
    
    // Receipt logo
    const logoHtml = `
      <div style="text-align: center; margin-bottom: 10px;">
        <div style="display: inline-block; background: linear-gradient(135deg, #3B82F6, #6366F1); color: white; padding: 8px 12px; border-radius: 8px; font-weight: bold;">
          <span style="font-size: 16px;">POS</span>
          <span style="font-size: 12px; display: block;">DASHBOARD</span>
        </div>
      </div>
    `;
    
    const receiptContent = `
      <div class="receipt">
        <div class="receipt-header">
          ${logoHtml}
          <h2>ร้านค้าออนไลน์</h2>
          <p>123 ถ.สุขุมวิท กรุงเทพฯ 10110</p>
          <p>โทร: 02-123-4567</p>
          <p>เลขประจำตัวผู้เสียภาษี: 0-1234-56789-0</p>
        </div>
        
        <div class="receipt-body">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 12px;">
            <span><strong>เลขที่:</strong> ${receiptNumber}</span>
            <span><strong>วันที่:</strong> ${date}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 12px;">
            <span><strong>พนักงาน:</strong> แอดมิน</span>
            <span><strong>เวลา:</strong> ${time}</span>
          </div>
          
          <div class="divider" style="margin-bottom: 10px;"></div>
          
          <table style="width: 100%;">
            <thead>
              <tr style="font-size: 11px; color: #4B5563;">
                <th>รายการ</th>
                <th class="right">ราคา/หน่วย</th>
                <th class="center">จำนวน</th>
                <th class="right">รวม</th>
              </tr>
            </thead>
            <tbody>
              ${cart.map((item) => `
                <tr>
                  <td style="font-size: 12px;">${item.name}</td>
                  <td class="right">${item.price.toFixed(2)}</td>
                  <td class="center">${item.qty}</td>
                  <td class="right"><strong>${(item.price * item.qty).toFixed(2)}</strong></td>
                </tr>
              `).join('')}
              <tr>
                <td colspan="4"><div class="divider"></div></td>
              </tr>
              <tr style="font-size: 11px; color: #4B5563;">
                <td colspan="2">จำนวนสินค้า:</td>
                <td class="center">${cart.reduce((sum, item) => sum + item.qty, 0)}</td>
                <td class="right"></td>
              </tr>
              <tr style="font-size: 11px; color: #4B5563;">
                <td colspan="3">ราคารวม:</td>
                <td class="right">${subTotal.toFixed(2)}</td>
              </tr>
              <tr style="font-size: 11px; color: #4B5563;">
                <td colspan="3">ภาษีมูลค่าเพิ่ม 7% (รวมใน):</td>
                <td class="right">${vat.toFixed(2)}</td>
              </tr>
              <tr class="total-row" style="font-size: 14px;">
                <td colspan="3">รวมทั้งสิ้น:</td>
                <td class="right">${total.toFixed(2)}</td>
              </tr>
              
              ${paymentMethod === 'cash' ? `
                <tr>
                  <td colspan="3">รับเงินมา:</td>
                  <td class="right">${receivedAmount?.toFixed(2) || '-'}</td>
                </tr>
                <tr>
                  <td colspan="3">เงินทอน:</td>
                  <td class="right">${change?.toFixed(2) || '-'}</td>
                </tr>
              ` : ''}
              
              <tr>
                <td colspan="4"><div class="divider"></div></td>
              </tr>
              <tr>
                <td colspan="4" style="text-align: center;">
                  <strong>ชำระโดย:</strong> ${getPaymentMethodText()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="receipt-footer">
          <p style="font-size: 10px; color: #6B7280;">(${convertToThaiText(total)})</p>
          <p style="font-weight: bold; margin-top: 8px;">ขอบคุณที่ใช้บริการ</p>
          <p style="font-size: 10px; margin-top: 4px; color: #6B7280;">www.posdashboard.com</p>
        </div>
      </div>
    `;
    
    printContent(receiptContent, { 
      title: `ใบเสร็จ #${receiptNumber}`
    });
    
    setTimeout(() => {
      setIsPrinting(false);
    }, 2000);
  };
  
  return (
    <Button 
      variant="secondary"
      icon={
        isPrinting ? (
          <div className="w-4 h-4 mr-1 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
        )
      }
      onClick={handlePrintReceipt}
      disabled={isPrinting}
      className="transition-all duration-200 hover:shadow-md"
    >
      {isPrinting ? 'กำลังพิมพ์...' : 'พิมพ์ใบเสร็จ'}
    </Button>
  );
}
