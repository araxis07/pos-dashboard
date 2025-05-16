import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { label: "แดชบอร์ด", href: "/dashboard" },
  { label: "ขายสินค้า", href: "/pos" },
  { label: "สินค้า", href: "/products" },
  { label: "ลูกค้า", href: "/customers" },
  { label: "ผู้ใช้", href: "/users" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:block w-64 bg-white shadow-xl min-h-screen pt-8">
      <ul className="space-y-3">
        {menus.map(menu => (
          <li key={menu.href}>
            <Link
              href={menu.href}
              className={`block px-8 py-3 rounded-l-full text-lg font-medium transition-all duration-200 ${
                pathname === menu.href ? "bg-blue-700 text-yellow-200 shadow-lg" : "hover:bg-blue-100 text-gray-700"
              }`}
            >
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
