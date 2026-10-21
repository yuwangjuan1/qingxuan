"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ALL_MAJORS, TRAP_LABEL } from "@/lib/data/majors";

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
    <div className="max-w-6xl mx-auto px-4 py-14">
      <div className="page-banner text-paper rounded-3xl px-8 py-10 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold">专业定位</h1>
        <p className="mt-3 text-paper/60 max-w-2xl leading-relaxed text-sm md:text-base">
          {ALL_MAJORS.length} 个专业讲清四件事：学什么、四个出口、适合谁、坑在哪。已收录 {trapCount} 个名称陷阱专业，报前先祛魅。
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索专业名或关键词，如「计算机」「数学」「考公」"
          className="field w-full rounded-full px-5 py-3.5 text-sm"
        />
        <div className="flex flex-wrap items-center gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={
                "px-4 py-1.5 rounded-full text-xs transition-all " +
                (cat === c
                  ? "bg-ink text-gold font-medium shadow-card"
                  : "bg-white border border-ink/10 text-ink/60 hover:border-gold hover:text-gold")
              }
            >
              {c}
            </button>
          ))}
          <span className="w-px bg-ink/10 mx-1" />
          <button
            onClick={() => setOnlyTrap(!onlyTrap)}
            className={
              "px-4 py-1.5 rounded-full text-xs transition-all " +
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
                <h2 className="font-bold text-lg group-hover:text-gold transition-colors">{m.name}</h2>
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
    </div>
  );
}
