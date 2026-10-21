import { INSIGHTS } from "@/lib/data/insights";

const toneStyle: Record<string, string> = {
  green: "bg-jade/10 border-jade/20 text-jade",
  yellow: "bg-amber-50 border-amber-200 text-amber-600",
  red: "bg-red-50 border-red-200 text-red-600",
};

export default function InsightsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">竞争与就业形势</h1>
      <p className="mt-2 text-ink/60">
        定性红绿灯，不造数据。每个判断附来源口径，帮你把「听说好就业」变成可核验的结构化参考。
      </p>
      <div className="mt-8 space-y-5">
        {INSIGHTS.map((it) => (
          <article key={it.id} className="bg-white rounded-2xl p-6 border border-black/5">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-bold text-lg">{it.title}</h2>
              <span className={"text-xs px-2.5 py-1 rounded-full border " + toneStyle[it.tone]}>
                {it.toneLabel}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink/70 leading-relaxed">{it.summary}</p>
            <ul className="mt-4 space-y-1.5">
              {it.points.map((p, i) => (
                <li key={i} className="text-sm leading-relaxed flex gap-2">
                  <span className="text-gold mt-0.5">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-ink/40">来源口径：{it.source}</p>
          </article>
        ))}
      </div>
    </div>
  );
}