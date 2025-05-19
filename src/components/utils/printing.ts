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
  const { title = 'Receipt', copies = 1, showDate = true } = options;

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
        body {
          font-family: 'Angsana New', 'Sarabun', sans-serif;
          font-size: 12pt;
          line-height: 1.3;
          margin: 0;
          padding: 0.5cm;
        }
        .receipt {
          width: 80mm;
          max-width: 80mm;
          margin: 0 auto;
        }
        .receipt-header {
          text-align: center;
          margin-bottom: 10px;
        }
        .receipt-header h2 {
          margin: 0;
          font-size: 14pt;
        }
        .receipt-header p {
          margin: 3px 0;
          font-size: 10pt;
        }
        .receipt-body {
          border-top: 1px dashed #000;
          border-bottom: 1px dashed #000;
          padding: 8px 0;
          margin: 5px 0;
        }
        .receipt-footer {
          text-align: center;
          margin-top: 10px;
          font-size: 10pt;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 3px 0;
          text-align: left;
        }
        .right {
          text-align: right;
        }
        .center {
          text-align: center;
        }
        .divider {
          border-top: 1px dashed #000;
          margin: 5px 0;
        }
        .bold {
          font-weight: bold;
        }
        .total-row {
          font-weight: bold;
          font-size: 12pt;
        }
      </style>
    </head>
    <body>
      ${content}
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
