export function formatCurrency(num: number) {
  return num.toLocaleString("th-TH", { style: "currency", currency: "THB" });
}
