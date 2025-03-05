import Link from "next/link";
import NavLink from "./nav-link";

const links = [
  { href: "/", label: "Home" },
  { href: "/our-team", label: "Our Team" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

export default function Header() {
  return (
    <header className="bg-white text-black">
      <nav className="mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/">Our Cool Project</Link>

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