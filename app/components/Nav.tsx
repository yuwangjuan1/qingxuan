"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/schools", label: "学校介绍" },
  { href: "/majors", label: "专业定位" },
  { href: "/tools", label: "择校工具" },
  { href: "/guide", label: "填报指南" },
  { href: "/insights", label: "竞争与就业" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden md:flex items-center gap-1.5 text-[15px]">
        {nav.map((n) => {
          const active = pathname === n.href || pathname.startsWith(n.href + "/");
          return (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active ? "page" : undefined}
              className={
                "px-4 py-2.5 rounded-full transition-all duration-200 " +
                (active
                  ? "bg-blue text-white font-semibold shadow-blue"
                  : "text-ink/65 hover:text-blue hover:bg-blue/[0.08] font-medium")
              }
            >
              {n.label}
            </Link>
          );
        })}
        <Link
          href="/chat"
          className={
            "btn-blue ml-3 px-6 py-2.5 rounded-full font-medium " +
            (pathname === "/chat" ? "ring-2 ring-blue/30 ring-offset-2" : "")
          }
        >
          AI 顾问
        </Link>
      </nav>
      <Link
        href="/chat"
        className="md:hidden btn-blue text-white text-sm px-5 py-2.5 rounded-full font-medium"
      >
        问顾问
      </Link>
    </>
  );
}
