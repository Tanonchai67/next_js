
import NavLink from "./nav-link";

const links = [
  { href: "/", label: " Home " },
  { href: "/login", label: " เข้าสู่ระบบ " },
];

export default function Header() {
  return (
    <header className="bg-black text-white font-bold">
      <nav className="mx-auto flex justify-between items-center py-4 px-6">
        <a>Non Company</a>

        <ul className="flex gap-4">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );
}