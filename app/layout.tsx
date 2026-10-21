import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "青选 QingXuan · 高考志愿决策平台",
    template: "%s · 青选 QingXuan",
  },
  description:
    "不预测分数线，只教你怎么选。34 所院校卡、24 个专业祛魅、位次工具与填报指南，青杏青棠青梧三位 AI 顾问陪伴全家做决定。",
  keywords: ["高考志愿", "志愿填报", "择校", "选专业", "冲稳保", "位次", "高考", "专业选择"],
  openGraph: {
    title: "青选 QingXuan · 高考志愿决策平台",
    description: "大厂告诉你能上哪些学校，我们帮你想清楚该上哪个。",
    type: "website",
    locale: "zh_CN",
  },
};

const nav = [
  { href: "/schools", label: "学校介绍" },
  { href: "/majors", label: "专业定位" },
  { href: "/tools", label: "择校工具" },
  { href: "/guide", label: "填报指南" },
  { href: "/insights", label: "竞争与就业" },
  { href: "/chat", label: "AI 顾问" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-ink text-paper">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold tracking-wide">
              <span className="text-gold">青选</span>
              <span className="text-xs ml-2 opacity-70">高考决策平台</span>
            </Link>
            <nav className="hidden md:flex gap-6 text-sm">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="hover:text-gold-light transition-colors">
                  {n.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/chat"
              className="md:hidden text-xs bg-gold text-ink px-3 py-1.5 rounded-full font-medium"
            >
              问顾问
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-ink text-paper/70 text-xs leading-relaxed">
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-2">
            <p className="text-gold-light font-medium">免责声明</p>
            <p>
              本平台提供志愿决策方法与公开信息整理，不提供分数线预测，不承诺录取结果，
              不代表任何招生机构。填报前请以各省考试院与院校官方招生章程为准。
            </p>
            <p>© 2026 青选 QingXuan · 让每个家庭自己拿主意</p>
          </div>
        </footer>
      </body>
    </html>
  );
}