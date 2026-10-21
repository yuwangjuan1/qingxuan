import { INSIGHTS } from "@/lib/data/insights";

const toneStyle: Record<string, string> = {
  green: "bg-jade/10 border-jade/20 text-jade",
  yellow: "bg-amber-50 border-amber-200 text-amber-600",
  red: "bg-red-50 border-red-200 text-red-600",
};

export default function InsightsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="page-banner text-paper rounded-3xl px-8 py-10 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold">竞争与就业</h1>
        <p className="mt-3 text-paper/60 max-w-2xl leading-relaxed text-sm md:text-base">
          {INSIGHTS.length} 条行业红绿灯：定性判断，来源公开可查。绿灯不是躺赢，红灯也不是劝退，是帮你把预期校准到真实水位。
        </p>
      </div>
      <div className="mt-8 space-y-5">
        {INSIGHTS.map((it) => (
          <article key={it.id} className="card card-hover p-7">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={
                  "shrink-0 w-2.5 h-2.5 rounded-full " +
                  (it.tone === "green" ? "bg-jade" : it.tone === "yellow" ? "bg-amber-400" : "bg-red-500")
                }
              />
              <h2 className="font-bold text-lg">{it.title}</h2>
              <span className={"text-xs px-2.5 py-1 rounded-full border " + toneStyle[it.tone]}>
                {it.toneLabel}
              </span>
            </div>
            <p className="mt-3 text-sm text-ink/70 leading-loose">{it.summary}</p>
            <ul className="mt-4 space-y-2">
              {it.points.map((p, i) => (
                <li key={i} className="text-sm leading-relaxed flex gap-2.5">
                  <span className="text-gold mt-0.5">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 pt-4 border-t border-ink/5 text-xs text-ink/40">来源口径：{it.source}</p>
          </article>
        ))}
      </div>
    </div>
  );
}