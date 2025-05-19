import "../globals.css";
import { Metadata } from 'next';
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/common/Toast";

export const metadata: Metadata = {
  title: 'POS & Dashboard System',
  description: 'ระบบจัดการร้านค้าและรายงานข้อมูลอย่างครบถ้วน',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-100 text-slate-900 min-h-screen flex flex-col">
        <Toast />
        <Navbar />
        <div className="flex flex-1 min-h-[calc(100vh-64px)]">
          <Sidebar />
          <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
