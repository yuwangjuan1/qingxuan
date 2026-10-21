"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ALL_SCHOOLS } from "@/lib/data/schools";
import PageBanner from "@/app/components/PageBanner";

const TYPES = ["全部", "综合", "理工", "财经", "师范"];

export default function SchoolsPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("全部");
  const [level, setLevel] = useState("不限");

  const list = useMemo(
    () =>
      ALL_SCHOOLS.filter(
        (s) =>
          (type === "全部" || s.type === type) &&
          (level === "不限" ||
            (level === "985" && s.level.includes("985")) ||
            (level === "211" && s.level.includes("211")) ||
            (level === "双非" && s.level.includes("双非"))) &&
          (!query ||
            s.name.includes(query) ||
            s.city.includes(query) ||
            s.tags.some((t) => t.includes(query)))
      ),
    [query, type, level]
  );

  return (
    <div>
      <PageBanner
        theme="orange"
        slides={[
          { tag: "学校介绍", title: "34 所院校，结构化拆解", desc: "学科实力、转专业政策、报考避坑点，一张卡讲清一所学校。信息来自公开资料整理，报考前请核对当年招生章程。" },
          { tag: "学校介绍", title: "不只看校名，要看专业组", desc: "同一所大学的不同专业组，命运可能天差地别。逐卡标注了调剂风险与校区差异，帮你避开「以为的和实际的」落差。" },
          { tag: "学校介绍", title: "搜索 + 筛选，快速定位", desc: "按 985/211/双非、综合/理工/财经/师范分类筛选，支持校名、城市、关键词搜索，三十秒圈定候选池。" },
        ]}
      />

      <div className="max-w-[1200px] mx-auto px-4">
      <div className="mt-10 space-y-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索校名、城市或关键词，如「电子」「成都」「两电一邮」"
          className="field w-full rounded-full px-5 py-3.5 text-sm"
        />
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={
                "px-4 py-1.5 rounded-full text-xs transition-all " +
                (type === t
                  ? "bg-blue text-white font-medium shadow-card"
                  : "bg-white border border-ink/10 text-ink/60 hover:border-blue/60 hover:text-blue")
              }
            >
              {t}
            </button>
          ))}
          <span className="w-px bg-ink/10 mx-1" />
          {["不限", "985", "211", "双非"].map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={
                "px-4 py-1.5 rounded-full text-xs transition-all " +
                (level === l
                  ? "bg-blue text-white font-medium shadow-card"
                  : "bg-white border border-ink/10 text-ink/60 hover:border-blue/60 hover:text-blue")
              }
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <p className="mt-16 text-center text-sm text-ink/40">没有匹配的院校，换个筛选条件试试。</p>
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((s) => (
            <Link
              key={s.id}
              href={"/schools/" + s.id}
              className="card card-hover group p-6 flex flex-col"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-bold text-lg group-hover:text-blue transition-colors">{s.name}</h2>
                <span className="text-[11px] text-gold-dark bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {s.level}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-ink/45">
                {s.city} · {s.type}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5 mt-auto pt-4">
                {s.tags.map((t) => (
                  <span key={t} className="text-xs bg-paper-dark/60 px-2.5 py-1 rounded-full text-ink/60">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
