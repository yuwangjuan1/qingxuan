import Link from "next/link";
import { notFound } from "next/navigation";
import { MAJORS, TRAP_LABEL } from "@/lib/data/majors";

export function generateStaticParams() {
  return MAJORS.map((m) => ({ id: m.id }));
}

export default async function MajorDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = MAJORS.find((x) => x.id === id);
  if (!m) notFound();

  const exits = [
    { label: "直接就业", value: m.exits.job },
    { label: "考研深造", value: m.exits.grad },
    { label: "考公考编", value: m.exits.civil },
    { label: "其他路径", value: m.exits.other },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/majors" className="text-sm text-jade hover:underline">
        返回列表
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold">{m.name}</h1>
        <span className="text-sm text-ink/50 bg-paper px-3 py-1 rounded-full">{m.category}</span>
        {m.isTrap && (
          <span className="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
            {TRAP_LABEL}
          </span>
        )}
      </div>
      {m.isTrap && (
        <div className="mt-6 rounded-2xl p-6 bg-red-50 border border-red-200">
          <h2 className="font-bold text-red-700 mb-2">先祛魅再心动</h2>
          <p className="text-sm leading-relaxed text-red-900/80">{m.trapNote}</p>
        </div>
      )}

      <section className="mt-6 bg-white rounded-2xl p-6 border border-black/5">
        <h2 className="font-bold text-lg mb-2">这个专业学什么</h2>
        <p className="text-sm leading-relaxed text-ink/80">{m.what}</p>
      </section>

      <section className="mt-6">
        <h2 className="font-bold text-lg mb-4">四出口地图</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {exits.map((e) => (
            <div key={e.label} className="rounded-2xl p-5 bg-white border border-black/5">
              <h3 className="text-sm font-bold text-gold">{e.label}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{e.value}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <section className="rounded-2xl p-6 bg-jade/10 border border-jade/20">
          <h2 className="font-bold mb-2">适合你吗</h2>
          <ul className="space-y-1.5">
            {m.fitFor.map((f, i) => (
              <li key={i} className="text-sm leading-relaxed flex gap-2">
                <span className="text-jade">OK</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl p-6 bg-red-50 border border-red-100">
          <h2 className="font-bold mb-2 text-red-700">报考预警</h2>
          <p className="text-sm leading-relaxed text-red-900/80">{m.warning}</p>
        </section>
      </div>

      <div className="mt-8 p-5 rounded-2xl bg-ink text-paper/80 text-sm leading-relaxed">
        拿不准适不适合？找
        <Link href="/chat?advisor=qingtang" className="text-gold hover:underline mx-1">
          青棠
        </Link>
        做一次三角定位，用证据代替感觉。
      </div>
    </div>
  );
}