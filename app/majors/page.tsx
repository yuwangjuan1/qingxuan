"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ALL_MAJORS, TRAP_LABEL } from "@/lib/data/majors";
import PageBanner from "@/app/components/PageBanner";
import NextStep from "@/app/components/NextStep";

export default function MajorsPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("全部");
  const [onlyTrap, setOnlyTrap] = useState(false);

  const cats = useMemo(
    () => ["全部", ...Array.from(new Set(ALL_MAJORS.map((m) => m.category)))],
    []
  );

  const list = useMemo(
    () =>
      ALL_MAJORS.filter(
        (m) =>
          (cat === "全部" || m.category === cat) &&
          (!onlyTrap || m.isTrap) &&
          (!query || m.name.includes(query) || m.what.includes(query))
      ),
    [query, cat, onlyTrap]
  );

  const trapCount = ALL_MAJORS.filter((m) => m.isTrap).length;

  return (
    <div>
      <PageBanner
        theme="emerald"
        slides={[
          { tag: "专业定位", title: "24 个专业，先祛魅再心动", desc: "学什么、四个出口、适合谁、坑在哪——每个专业讲清四件事。名称陷阱逐个拆穿，报前心里有底。" },
          { tag: "专业定位", title: "名称陷阱逐个拆穿", desc: "信息与计算科学是数学、生物医学工程不能当医生……名字像 A 实际是 B 的专业，这里逐个标注，报前先祛魅。" },
          { tag: "专业定位", title: "四出口地图", desc: "就业、深造、考公、其他路径，四个出口各是什么样，一张图看完再决定报不报。" },
        ]}
      />

      <div className="max-w-[1200px] mx-auto px-4">
      <div className="mt-10 space-y-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索专业名或关键词，如「计算机」「数学」「考公」"
          className="field w-full rounded-full px-5 py-3.5 text-base"
        />
        <div className="flex flex-wrap items-center gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={
                "px-4.5 py-2 rounded-full text-sm transition-all " +
                (cat === c
                  ? "bg-blue text-white font-medium shadow-card"
                  : "bg-white border border-ink/10 text-ink/60 hover:border-blue/60 hover:text-blue")
              }
            >
              {c}
            </button>
          ))}
          <span className="w-px bg-ink/10 mx-1" />
          <button
            onClick={() => setOnlyTrap(!onlyTrap)}
            className={
              "px-4.5 py-2 rounded-full text-sm transition-all " +
              (onlyTrap
                ? "bg-red-500 text-white font-medium shadow-card"
                : "bg-white border border-ink/10 text-ink/60 hover:border-red-400 hover:text-red-500")
            }
          >
            {onlyTrap ? "只看陷阱专业 ✓" : "只看陷阱专业"}
          </button>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="mt-16 text-center text-sm text-ink/40">没有匹配的专业，换个筛选条件试试。</p>
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((m) => (
            <Link
              key={m.id}
              href={"/majors/" + m.id}
              className="card card-hover group p-6 flex flex-col"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-bold text-lg group-hover:text-blue transition-colors">{m.name}</h2>
                <span className="text-[11px] text-ink/45 bg-paper-dark/60 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {m.category}
                </span>
              </div>
              {m.isTrap && (
                <p className="mt-2.5 text-xs text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-lg inline-block w-fit">
                  {TRAP_LABEL}
                </p>
              )}
              <p className="mt-3 text-sm text-ink/55 leading-relaxed line-clamp-2">{m.what}</p>
            </Link>
          ))}
        </div>
      )}

        <NextStep
          title="专业有方向了，先算算够不够得着"
          desc="把分数换成位次，再看冲稳保三档落在哪。工具在本地计算，不收集任何信息，算完心里就有区间了。"
          href="/tools"
          label="去算我的位次"
          altHref="/chat?advisor=qingxing"
          altLabel="找青杏聊策略"
        />
      </div>
    </div>
  );
}
