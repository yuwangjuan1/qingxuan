"use client";

import { useMemo, useState } from "react";
import PageBanner from "@/app/components/PageBanner";
import NextStep from "@/app/components/NextStep";
import { GLOSSARY, PITFALLS, CALENDAR, FAQ } from "@/lib/data/knowledge";

const TABS = ["名词词典", "避坑指南", "填报日历", "高频问答"] as const;

const catStyle: Record<string, string> = {
  规则: "bg-jade/10 text-jade border-jade/20",
  数据: "bg-gold/10 text-gold-dark border-gold/25",
  流程: "bg-ink/5 text-ink/70 border-ink/10",
  风险: "bg-red-50 text-red-600 border-red-200",
};

export default function GuidePage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>(TABS[0]);
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const glossary = useMemo(
    () =>
      GLOSSARY.filter(
        (g) => !query || g.term.includes(query) || g.detail.includes(query)
      ),
    [query]
  );

  return (
    <div>
      <PageBanner
        theme="violet"
        slides={[
          { tag: "填报指南", title: "填报前过一遍，少走九成弯路", desc: "12 个规则名词、8 个经典坑位、高三全年时间线、10 条高频疑问。一站式补齐志愿填报的规则知识。" },
          { tag: "填报指南", title: "平行志愿怎么投档？", desc: "分数优先、遵循志愿、一轮投档——为什么会有退档，为什么必须拉开梯度，词典里讲得明明白白。" },
          { tag: "填报指南", title: "八大经典坑位", desc: "不看组构成冲校名、体检限制漏检、热门专业当保底……每年真实发生的翻车现场，逐个给你正确动作。" },
        ]}
      />

      <div className="max-w-[1200px] mx-auto px-4">
      <div className="mt-10 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-5 py-2.5 rounded-full text-sm transition-all " +
              (tab === t
                ? "bg-blue text-white font-medium shadow-card"
                : "bg-white border border-ink/10 text-ink/60 hover:border-blue/60 hover:text-blue")
            }
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "名词词典" && (
        <div className="mt-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索名词或关键词，如「位次」「退档」"
            className="field w-full rounded-full px-5 py-3.5 text-sm"
          />
          <div className="mt-5 space-y-4">
            {glossary.length === 0 && (
              <p className="text-sm text-ink/40 py-8 text-center">没有匹配的名词，换个关键词试试。</p>
            )}
            {glossary.map((g) => (
              <article key={g.term} className="card p-6">
                <div className="flex items-center gap-3">
                  <h2 className="font-bold">{g.term}</h2>
                  <span className={"text-xs px-2.5 py-0.5 rounded-full border " + catStyle[g.category]}>
                    {g.category}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gold-dark font-medium">{g.short}</p>
                <p className="mt-2.5 text-sm leading-loose text-ink/70">{g.detail}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {tab === "避坑指南" && (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-ink/50">
            来自每年真实发生的翻车现场。红色优先级最高，填表前逐条对照。
          </p>
          {PITFALLS.map((p, i) => (
            <article key={p.id} className="card p-6">
              <div className="flex items-start gap-4">
                <span
                  className={
                    "shrink-0 w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center " +
                    (p.level === "high"
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200")
                  }
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h2 className="font-bold">{p.title}</h2>
                  <p className="mt-2.5 text-sm leading-loose text-ink/70">
                    <span className="text-ink/40">现场：</span>
                    {p.scene}
                  </p>
                  <p className="mt-1.5 text-sm leading-loose text-ink/70">
                    <span className="text-ink/40">为什么会踩：</span>
                    {p.why}
                  </p>
                  <p className="mt-1.5 text-sm leading-loose text-jade">
                    <span className="text-ink/40">正确动作：</span>
                    {p.how}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {tab === "填报日历" && (
        <div className="mt-6">
          <div className="relative pl-8 space-y-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-gold before:to-gold/10">
            {CALENDAR.map((c) => (
              <div key={c.phase} className="relative">
                <span
                  className={
                    "absolute -left-8 top-1.5 w-4 h-4 rounded-full border-[3px] " +
                    (c.highlight
                      ? "bg-gold border-gold/30 shadow-gold"
                      : "bg-white border-ink/20")
                  }
                />
                <div
                  className={
                    "rounded-2xl p-6 border " +
                    (c.highlight
                      ? "bg-gold/5 border-gold/30 shadow-card"
                      : "card")
                  }
                >
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="font-bold">{c.phase}</h2>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-ink text-gold">{c.window}</span>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {c.todos.map((t, i) => (
                      <li key={i} className="text-sm leading-relaxed flex gap-2.5">
                        <span className="text-gold mt-0.5 shrink-0">☐</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-ink/40">
            各省填报窗口不同，具体日期以省考试院当年公告为准。日历帮你建立节奏感，别卡截止线。
          </p>
        </div>
      )}

      {tab === "高频问答" && (
        <div className="mt-6 space-y-3">
          {FAQ.map((f, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-paper/50 transition-colors"
              >
                <span className="font-medium text-sm">{f.q}</span>
                <span
                  className={
                    "shrink-0 w-6 h-6 rounded-full bg-gold/10 text-gold-dark text-sm flex items-center justify-center transition-transform " +
                    (openFaq === i ? "rotate-45" : "")
                  }
                >
                  +
                </span>
              </button>
              {openFaq === i && (
                <p className="px-6 pb-5 text-sm leading-loose text-ink/70">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
