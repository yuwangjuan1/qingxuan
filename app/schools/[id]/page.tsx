import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_SCHOOLS } from "@/lib/data/schools";

export function generateStaticParams() {
  return ALL_SCHOOLS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = ALL_SCHOOLS.find((x) => x.id === id);
  return { title: s ? s.name + "怎么样 · 报考要点" : "学校介绍" };
}

export default async function SchoolDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = ALL_SCHOOLS.find((x) => x.id === id);
  if (!s) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16">
      <div className="page-banner -mx-4 px-6 md:px-0">
        <div className="max-w-4xl mx-auto pt-6 pb-10">
          <Link href="/schools" className="text-sm text-ink/45 hover:text-gold-dark transition-colors">
            ← 返回列表
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">{s.name}</h1>
            <span className="text-xs text-blue bg-blue/10 border border-blue/25 px-3 py-1 rounded-full">
              {s.level}
            </span>
          </div>
          <p className="mt-3 text-ink/55">
            {s.city} · {s.type}类
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {s.tags.map((t) => (
              <span key={t} className="text-xs border border-ink/10 bg-ink/[0.03] rounded-full px-3 py-1 text-ink/60">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="card p-7 -mt-5 relative rounded-3xl">
        <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
          <span className="section-line !w-6" />
          实力与特色
        </h2>
        <ul className="space-y-3.5">
          {s.highlights.map((h, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="shrink-0 w-5 h-5 rounded-full bg-gold/15 text-gold-dark text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-5 grid md:grid-cols-2 gap-5">
        <section className="rounded-2xl p-6 bg-jade/5 border border-jade/20">
          <h2 className="font-bold mb-2.5 flex items-center gap-2 text-jade">
            <span className="w-1.5 h-4 rounded-full bg-jade" />
            转专业通道
          </h2>
          <p className="text-sm leading-loose text-ink/75">{s.transferPolicy}</p>
        </section>
        <section className="rounded-2xl p-6 bg-red-50/70 border border-red-100">
          <h2 className="font-bold mb-2.5 flex items-center gap-2 text-red-700">
            <span className="w-1.5 h-4 rounded-full bg-red-400" />
            避坑提醒
          </h2>
          <p className="text-sm leading-loose text-red-900/75">{s.watchOut}</p>
        </section>
      </div>

      <div className="mt-8 hero-blue rounded-2xl text-paper/80 text-sm leading-loose p-6">
        想知道这所学校适合不适合你？让
        <Link href="/chat?advisor=qingxing" className="text-gold-light hover:underline mx-1">
          青杏
        </Link>
        用位次思维帮你定位，或让
        <Link href="/chat?advisor=qingtang" className="text-gold-light hover:underline mx-1">
          青棠
        </Link>
        拆解它的专业组。
      </div>
    </div>
  );
}
