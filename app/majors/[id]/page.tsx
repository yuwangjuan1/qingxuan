import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_MAJORS, TRAP_LABEL } from "@/lib/data/majors";

export function generateStaticParams() {
  return ALL_MAJORS.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = ALL_MAJORS.find((x) => x.id === id);
  return { title: m ? m.name + " · 学什么、出口在哪" : "专业定位" };
}

export default async function MajorDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = ALL_MAJORS.find((x) => x.id === id);
  if (!m) notFound();

  const exits = [
    { label: "直接就业", value: m.exits.job },
    { label: "考研深造", value: m.exits.grad },
    { label: "考公考编", value: m.exits.civil },
    { label: "其他路径", value: m.exits.other },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16">
      <div className="page-banner -mx-4 px-6 md:px-0">
        <div className="max-w-4xl mx-auto pt-6 pb-10">
          <Link href="/majors" className="text-sm text-ink/45 hover:text-gold-dark transition-colors">
            ← 返回列表
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">{m.name}</h1>
            <span className="text-xs text-ink/60 bg-ink/5 border border-ink/10 px-3 py-1 rounded-full">
              {m.category}
            </span>
            {m.isTrap && (
              <span className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                {TRAP_LABEL}
              </span>
            )}
          </div>
          {m.isTrap && (
            <div className="mt-5 rounded-2xl p-5 bg-red-50/80 border border-red-100">
              <h2 className="font-bold text-red-700 mb-1.5 text-sm">先祛魅再心动</h2>
              <p className="text-sm leading-loose text-red-900/70">{m.trapNote}</p>
            </div>
          )}
        </div>
      </div>

      <section className="card p-7 -mt-5 relative rounded-3xl">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <span className="section-line !w-6" />
          这个专业学什么
        </h2>
        <p className="text-sm leading-loose text-ink/75">{m.what}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
          <span className="section-line !w-6" />
          四出口地图
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {exits.map((e) => (
            <div key={e.label} className="card card-hover p-6">
              <h3 className="text-xs font-bold text-gold-dark tracking-widest border-b border-gold/15 pb-2.5 mb-3">
                {e.label}
              </h3>
              <p className="text-sm leading-loose text-ink/70">{e.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 grid md:grid-cols-2 gap-5">
        <section className="rounded-2xl p-6 bg-jade/5 border border-jade/20">
          <h2 className="font-bold mb-3 flex items-center gap-2 text-jade">
            <span className="w-1.5 h-4 rounded-full bg-jade" />
            适合你吗
          </h2>
          <ul className="space-y-2">
            {m.fitFor.map((f, i) => (
              <li key={i} className="text-sm leading-relaxed flex gap-2.5">
                <span className="shrink-0 w-4 h-4 rounded-full bg-jade/15 text-jade text-[10px] flex items-center justify-center mt-1">
                  ✓
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl p-6 bg-red-50/70 border border-red-100">
          <h2 className="font-bold mb-3 flex items-center gap-2 text-red-700">
            <span className="w-1.5 h-4 rounded-full bg-red-400" />
            报考预警
          </h2>
          <p className="text-sm leading-loose text-red-900/75">{m.warning}</p>
        </section>
      </div>

      <div className="mt-8 hero-dark rounded-2xl text-paper/80 text-sm leading-loose p-6">
        拿不准适不适合？找
        <Link href="/chat?advisor=qingtang" className="text-gold-light hover:underline mx-1">
          青棠
        </Link>
        做一次三角定位，用证据代替感觉。
      </div>
    </div>
  );
}
