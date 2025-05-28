export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/60 py-6 px-6 text-gray-600 flex flex-col md:flex-row justify-between items-center text-sm shadow-lg">
      <div className="mb-3 md:mb-0 flex items-center gap-2">
        <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
          <span className="text-white text-xs">💎</span>
        </div>
        <span className="font-medium text-gray-700">
          © {new Date().getFullYear()} POS Dashboard
        </span>
        <span className="text-gray-500">|</span>
        <span className="text-gray-500">
          Made with <span className="text-red-500 animate-pulse">❤️</span> ทีมงานของคุณ
        </span>
      </div>
      <div className="flex gap-6">
        <a 
          href="#" 
          className="hover:text-blue-600 transition-all duration-200 hover:scale-105 font-medium"
        >
          เงื่อนไขการใช้
        </a>
        <a 
          href="#" 
          className="hover:text-blue-600 transition-all duration-200 hover:scale-105 font-medium"
        >
          นโยบายความเป็นส่วนตัว
        </a>
        <a 
          href="#" 
          className="hover:text-blue-600 transition-all duration-200 hover:scale-105 font-medium flex items-center gap-1"
        >
          <span>🆘</span>
          ช่วยเหลือ
        </a>
      </div>
    </footer>
  );
}
