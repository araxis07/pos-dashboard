import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-4 px-6 text-gray-500 flex flex-col md:flex-row justify-between items-center text-sm">
      <div className="mb-2 md:mb-0">
        © {new Date().getFullYear()} POS Dashboard | Made with ❤️ ทีมงานของคุณ
      </div>
      <div className="flex gap-4">
        <Link href="#" className="hover:text-blue-700 transition-colors">เงื่อนไขการใช้</Link>
        <Link href="#" className="hover:text-blue-700 transition-colors">นโยบายความเป็นส่วนตัว</Link>
        <Link href="#" className="hover:text-blue-700 transition-colors">ช่วยเหลือ</Link>
      </div>
    </footer>
  );
}
