"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/schools", label: "学校介绍" },
  { href: "/majors", label: "专业定位" },
  { href: "/tools", label: "择校工具" },
  { href: "/guide", label: "填报指南" },
  { href: "/insights", label: "竞争与就业" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 桌面端 */}
      <nav className="hidden md:flex items-center gap-1.5 text-[15px]">
        {nav.map((n) => {
          const active = pathname === n.href || pathname.startsWith(n.href + "/");
          return (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active ? "page" : undefined}
              className={
                "px-4 py-2.5 rounded-lg transition-colors duration-150 " +
                (active
                  ? "bg-blue-pale text-blue font-semibold"
                  : "text-ink/65 hover:text-blue hover:bg-blue/[0.06] font-medium")
              }
            >
              {n.label}
            </Link>
          );
        })}
        <Link
          href="/chat"
          className={
            "btn-blue text-white ml-3 px-6 py-2.5 rounded-full font-medium " +
            (pathname === "/chat" ? "ring-2 ring-blue/30 ring-offset-2" : "")
          }
        >
          AI 顾问
        </Link>
      </nav>

      {/* 移动端 */}
      <div className="md:hidden flex items-center gap-2">
        <Link
          href="/chat"
          className="btn-blue text-white text-sm px-4 py-2.5 rounded-full font-medium"
        >
          问顾问
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "关闭菜单" : "打开菜单"}
          aria-expanded={open}
          className="w-11 h-11 rounded-xl border border-ink/10 bg-white flex flex-col items-center justify-center gap-[5px]"
        >
          <span className={"w-5 h-0.5 rounded-full bg-ink transition-all duration-300 " + (open ? "rotate-45 translate-y-[7px]" : "")} />
          <span className={"w-5 h-0.5 rounded-full bg-ink transition-opacity duration-200 " + (open ? "opacity-0" : "")} />
          <span className={"w-5 h-0.5 rounded-full bg-ink transition-all duration-300 " + (open ? "-rotate-45 -translate-y-[7px]" : "")} />
        </button>
      </div>

      {/* 移动端抽屉 */}
      {open && (
        <div className="md:hidden absolute top-[76px] left-0 right-0 z-40 bg-white border-b border-ink/10 shadow-[0_16px_32px_rgba(14,27,44,0.12)]">
          <nav className="px-4 py-3 flex flex-col">
            {nav.map((n) => {
              const active = pathname === n.href || pathname.startsWith(n.href + "/");
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={
                    "py-3.5 px-3 rounded-xl text-base font-medium flex items-center justify-between " +
                    (active ? "bg-blue/[0.08] text-blue" : "text-ink/75")
                  }
                >
                  {n.label}
                  {active && <span className="w-2 h-2 rounded-full bg-blue" />}
                </Link>
              );
            })}
            <Link
              href="/chat"
              onClick={() => setOpen(false)}
              className="btn-blue mt-2 mb-3 text-white text-center text-base font-medium py-3.5 rounded-xl"
            >
              AI 顾问
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
