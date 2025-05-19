/**
 * Format a number to Thai Baht currency format
 * @param num Number to format
 * @param options Additional formatting options
 */
export function formatCurrency(num: number, options: Intl.NumberFormatOptions = {}) {
  const defaultOptions = { style: "currency", currency: "THB" };
  return num.toLocaleString("th-TH", { ...defaultOptions, ...options });
}

/**
 * Format a number with commas as thousands separators
 * @param num Number to format
 * @param decimalPlaces Number of decimal places (default: 0)
 */
export function formatNumber(num: number, decimalPlaces: number = 0) {
  return num.toLocaleString("th-TH", { 
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });
}

/**
 * Format a date to Thai locale format
 * @param date Date to format
 * @param options Date formatting options
 */
export function formatDate(date: Date | string, options: Intl.DateTimeFormatOptions = {}) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  };
  
  return dateObj.toLocaleDateString('th-TH', { ...defaultOptions, ...options });
}

/**
 * Format a time to Thai locale format
 * @param date Date to format
 * @param options Time formatting options
 */
export function formatTime(date: Date | string, options: Intl.DateTimeFormatOptions = {}) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions = { 
    hour: '2-digit', 
    minute: '2-digit'
  };
  
  return dateObj.toLocaleTimeString('th-TH', { ...defaultOptions, ...options });
}

/**
 * Format a date and time to Thai locale format
 * @param date Date to format
 * @param options Date and time formatting options
 */
export function formatDateTime(date: Date | string, options: Intl.DateTimeFormatOptions = {}) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit'
  };
  
  return dateObj.toLocaleString('th-TH', { ...defaultOptions, ...options });
}

/**
 * Format a phone number in Thai format (0x-xxxx-xxxx)
 * @param phone Phone number to format
 */
export function formatPhone(phone: string) {
  // Handle various input formats and normalize to just digits
  const digits = phone.replace(/\D/g, '');
  
  // Handle Thai mobile number format (0x-xxxx-xxxx)
  if (digits.length === 10 && digits.startsWith('0')) {
    return `${digits.substring(0, 2)}-${digits.substring(2, 6)}-${digits.substring(6, 10)}`;
  }
  
  // Return original if we can't format it
  return phone;
}

/**
 * Format a phone number in Thai format as the user types (0x-xxxx-xxxx)
 * @param phone Phone number to format
 */
export function formatPhoneNumber(phone: string) {
  // Remove non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  if (!digits) return '';
  
  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 6) {
    return `${digits.substring(0, 2)}-${digits.substring(2)}`;
  }
  return `${digits.substring(0, 2)}-${digits.substring(2, 6)}-${digits.substring(6, 10)}`;
}

/**
 * Truncate text with ellipsis if it exceeds max length
 * @param text Text to truncate
 * @param maxLength Maximum length before truncating
 */
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Convert number to Thai baht text (Thai Read Out)
 * @param num Number to convert
 */
export function convertToThaiText(num: number) {
  const digits = ['ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
  const positions = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];
  
  // Handle special case
  if (num === 0) return 'ศูนย์บาทถ้วน';
  
  // Convert to string and process
  const numStr = Math.abs(num).toFixed(2);
  const [intPart, decimalPart] = numStr.split('.');
  
  let result = '';
  
  // Process integer part
  for (let i = 0; i < intPart.length; i++) {
    const digit = parseInt(intPart[i]);
    const position = intPart.length - i - 1;
    
    if (digit !== 0) {
      // Special case for 1 in tens position
      if (digit === 1 && position % 6 === 1) {
        result += positions[position % 6];
      }
      // Special case for 2 in tens position
      else if (digit === 2 && position % 6 === 1) {
        result += 'ยี่' + positions[position % 6];
      }
      // General case
      else {
        result += digits[digit] + positions[position % 6];
      }
    }
    
    // Add "ล้าน" when needed
    if (position && position % 6 === 0) {
      result += 'ล้าน';
    }
  }
  
  // Add "บาท"
  result += 'บาท';
  
  // Process decimal part
  if (parseInt(decimalPart) > 0) {
    for (let i = 0; i < decimalPart.length; i++) {
      const digit = parseInt(decimalPart[i]);
      const position = decimalPart.length - i - 1;
      
      if (digit !== 0) {
        // Special case for 1 in tens position
        if (digit === 1 && position === 1) {
          result += 'สิบ';
        }
        // Special case for 2 in tens position
        else if (digit === 2 && position === 1) {
          result += 'ยี่สิบ';
        }
        // General case
        else {
          result += digits[digit];
          if (position === 1) result += 'สิบ';
        }
      }
    }
    result += 'สตางค์';
  } else {
    result += 'ถ้วน';
  }
  
  return result;
}
