import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { label: "แดชบอร์ด", href: "/dashboard" },
  { label: "ขายสินค้า", href: "/pos" },
  { label: "สินค้า", href: "/products" },
  { label: "ลูกค้า", href: "/customers" },
  { label: "ผู้ใช้", href: "/users" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-blue-700 text-white shadow w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <Link href="/" className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition">POS DASHBOARD</Link>
        <div className="flex gap-4">
          {menus.map(menu => (
            <Link
              key={menu.href}
              href={menu.href}
              className={`rounded px-3 py-1 font-medium hover:bg-blue-800 hover:text-yellow-200 transition ${
                pathname === menu.href ? "bg-blue-900 text-yellow-300" : ""
              }`}
            >
              {menu.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
