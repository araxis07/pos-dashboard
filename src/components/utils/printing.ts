/**
 * Utilities for printing receipts and reports
 */

interface PrintOptions {
  title?: string;
  copies?: number;
  showDate?: boolean;
}

/**
 * Format and print HTML content using window.print()
 * @param content HTML content to print
 * @param options Printing options
 */
export function printContent(content: string, options: PrintOptions = {}) {
  const { title = 'Receipt' } = options;

  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to print receipts.');
    return;
  }

  // Set up the document
  printWindow.document.open();
  printWindow.document.write(`
    <html>
    <head>
      <title>${title}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Sarabun', sans-serif;
          font-size: 12pt;
          line-height: 1.4;
          margin: 0;
          padding: 1cm;
          color: #1F2937;
          background-color: #F9FAFB;
        }
        @media print {
          body {
            padding: 0;
            background-color: white;
          }
        }
        .receipt {
          width: 80mm;
          max-width: 80mm;
          margin: 0 auto;
          background-color: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        @media print {
          .receipt {
            box-shadow: none;
            padding: 0;
            width: 100%;
          }
        }
        .receipt-header {
          text-align: center;
          margin-bottom: 15px;
        }
        .receipt-header h2 {
          margin: 0;
          font-size: 16pt;
          font-weight: 600;
          color: #111827;
        }
        .receipt-header p {
          margin: 2px 0;
          font-size: 10pt;
          color: #4B5563;
        }
        .receipt-body {
          border-top: 1px dashed #CBD5E1;
          border-bottom: 1px dashed #CBD5E1;
          padding: 12px 0;
          margin: 8px 0;
        }
        .receipt-footer {
          text-align: center;
          margin-top: 12px;
          font-size: 10pt;
          padding-bottom: 8px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 4px 0;
          text-align: left;
        }
        .right {
          text-align: right;
        }
        .center {
          text-align: center;
        }
        .divider {
          border-top: 1px dashed #CBD5E1;
          margin: 6px 0;
        }
        .bold {
          font-weight: 600;
        }
        .total-row {
          font-weight: 700;
          font-size: 12pt;
          color: #1F2937;
        }
        
        /* QR Code Placeholder */
        .qr-code {
          text-align: center;
          margin: 10px 0;
        }
        .qr-code img {
          width: 100px;
          height: 100px;
        }
        
        /* Print Button - only visible in browser */
        .print-button {
          display: block;
          width: 80mm;
          max-width: 80mm;
          margin: 20px auto 0;
          background: #3B82F6;
          color: white;
          border: none;
          padding: 10px 0;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          font-family: 'Sarabun', sans-serif;
          font-size: 14px;
        }
        @media print {
          .print-button {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      ${content}
      <button class="print-button" onclick="window.print()">พิมพ์ใบเสร็จ</button>
    </body>
    </html>
  `);
  
  printWindow.document.close();

  // Give the browser a moment to load the content before printing
  setTimeout(() => {
    printWindow.print();
    
    // Close the window after printing if it hasn't been auto-closed by the browser
    setTimeout(() => {
      if (!printWindow.closed) {
        printWindow.close();
      }
    }, 500);
  }, 500);
}

/**
 * Get the current date and time formatted for receipt
 */
export function getCurrentDateTime() {
  const now = new Date();
  return {
    date: now.toLocaleDateString('th-TH', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }),
    time: now.toLocaleTimeString('th-TH', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  };
}

/**
 * Generate a unique receipt number
 */
export function generateReceiptNumber() {
  const now = new Date();
  const prefix = 'INV';
  const datePart = now.getFullYear().toString().substr(2) +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    now.getDate().toString().padStart(2, '0');
  const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `${prefix}${datePart}-${randomPart}`;
}
