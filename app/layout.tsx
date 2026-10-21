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
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-lg text-ink border-b border-ink/[0.06] shadow-[0_1px_12px_rgba(14,27,44,0.04)]">
          <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-light to-gold text-ink font-bold flex items-center justify-center text-sm shadow-gold">
                青
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-bold tracking-widest text-base">
                  青选<span className="text-gold">.</span>
                </span>
                <span className="text-[10px] tracking-[0.2em] text-ink/40 mt-0.5">QINGXUAN</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1 text-sm">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="px-3.5 py-2 rounded-full text-ink/60 hover:text-blue hover:bg-blue/[0.07] transition-colors"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                href="/chat"
                className="btn-blue ml-3 text-white px-5 py-2 rounded-full font-medium"
              >
                AI 顾问
              </Link>
            </nav>
            <Link
              href="/chat"
              className="md:hidden btn-blue text-white text-xs px-4 py-2 rounded-full font-medium"
            >
              问顾问
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-gradient-to-b from-[#123C7A] to-[#0B1D3A] text-paper/60 text-xs leading-relaxed">
          <div className="max-w-[1200px] mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-white/10">
              <div className="max-w-sm">
                <p className="text-gold-light font-bold text-base tracking-widest mb-2">青选 · 高考志愿决策平台</p>
                <p className="text-paper/50">
                  不预测分数线，只教你怎么选。让每个家庭自己拿主意。
                </p>
              </div>
              <div className="flex gap-12 flex-wrap">
                <div className="space-y-2.5">
                  <p className="text-paper/80 font-medium">探索</p>
                  {nav.slice(0, 3).map((n) => (
                    <Link key={n.href} href={n.href} className="block hover:text-gold-light transition-colors">
                      {n.label}
                    </Link>
                  ))}
                </div>
                <div className="space-y-2.5">
                  <p className="text-paper/80 font-medium">了解</p>
                  {nav.slice(3).map((n) => (
                    <Link key={n.href} href={n.href} className="block hover:text-gold-light transition-colors">
                      {n.label}
                    </Link>
                  ))}
                  <Link href="/chat" className="block hover:text-gold-light transition-colors">
                    AI 顾问
                  </Link>
                </div>
              </div>
            </div>
            <div className="pt-6 space-y-2">
              <p className="text-paper/40">
                免责声明：本平台提供志愿决策方法与公开信息整理，不提供分数线预测，不承诺录取结果，不代表任何招生机构。填报前请以各省考试院与院校官方招生章程为准。
              </p>
              <p className="text-paper/40">© 2026 青选 QingXuan</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
