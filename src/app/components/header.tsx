"use client"
import { removeAccessToken } from "../utils/action";
import NavLink from "./nav-link";

const links = [
  { href: "/", label: " Home " },
  { href: "/our-team", label: " Teams " },
];

const auth = [
  { href: "/", label: " Home " },
  { href: "/login", label: "Login" },
];

export default function Header(user: any) {
  const logout = async () => {
    await removeAccessToken();
  };
  return (
    <header className="bg-black text-white font-bold">
      <nav className="mx-auto flex justify-between items-center py-4 px-6">
        <a>Non Company</a>

        <ul className="flex gap-4">
          {user && user.user ? (
            <ul className="flex gap-4">
              <div className="text-white">ชื่อผู้ใช้: {user.user?.username}</div>
              {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
          <div className="cursor-pointer" onClick={() => logout()}>
                Log Out
              </div>
            </ul>
          ) : (
            auth.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))
          )}
        </ul>
      </nav>
      
    </header>
  );
}