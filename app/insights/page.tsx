import { INSIGHTS } from "@/lib/data/insights";
import PageBanner from "@/app/components/PageBanner";

const toneStyle: Record<string, string> = {
  green: "bg-jade/10 border-jade/20 text-jade",
  yellow: "bg-amber-50 border-amber-200 text-amber-600",
  red: "bg-red-50 border-red-200 text-red-600",
};

export default function InsightsPage() {
  return (
    <div>
      <PageBanner
        slides={[
          { tag: "竞争与就业", title: "12 条行业红绿灯", desc: "定性判断，来源公开可查。绿灯不是躺赢，红灯也不是劝退，是帮你把预期校准到真实水位。" },
          { tag: "竞争与就业", title: "医学的长周期，金融的降薪潮", desc: "十年长跑的专业和降薪缩编的行业，红绿灯里逐条讲清楚，帮你看懂时间维度上的性价比。" },
          { tag: "竞争与就业", title: "银发经济与 AI 冲击", desc: "老龄化带来哪些确定性需求？AI 正在重构哪些专业？结构性变化早知道，选择少踩坑。" },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4">
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
    </div>
  );
}