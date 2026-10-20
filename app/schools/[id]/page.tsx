import Link from "next/link";
import { notFound } from "next/navigation";
import { SCHOOLS } from "@/lib/data/schools";

export function generateStaticParams() {
  return SCHOOLS.map((s) => ({ id: s.id }));
}

export default async function SchoolDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = SCHOOLS.find((x) => x.id === id);
  if (!s) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/schools" className="text-sm text-jade hover:underline">
        返回列表
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold">{s.name}</h1>
        <span className="text-sm text-gold bg-gold/10 px-3 py-1 rounded-full">{s.level}</span>
      </div>
      <p className="mt-2 text-ink/60">
        {s.city} · {s.type}类
      </p>

      <section className="mt-8 bg-white rounded-2xl p-6 border border-black/5">
        <h2 className="font-bold text-lg mb-4">实力与特色</h2>
        <ul className="space-y-2.5">
          {s.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed">
              <span className="text-gold mt-0.5">{i + 1}.</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <section className="rounded-2xl p-6 bg-jade/10 border border-jade/20">
          <h2 className="font-bold mb-2">转专业通道</h2>
          <p className="text-sm leading-relaxed text-ink/80">{s.transferPolicy}</p>
        </section>
        <section className="rounded-2xl p-6 bg-red-50 border border-red-100">
          <h2 className="font-bold mb-2 text-red-700">避坑提醒</h2>
          <p className="text-sm leading-relaxed text-red-900/80">{s.watchOut}</p>
        </section>
      </div>

      <div className="mt-8 p-5 rounded-2xl bg-ink text-paper/80 text-sm leading-relaxed">
        想知道这所学校适合不适合你？让
        <Link href="/chat?advisor=qingxing" className="text-gold hover:underline mx-1">
          青杏
        </Link>
        用位次思维帮你定位，或让
        <Link href="/chat?advisor=qingtang" className="text-gold hover:underline mx-1">
          青棠
        </Link>
        拆解它的专业组。
      </div>
    </div>
  );
}