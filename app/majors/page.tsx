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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">专业定位</h1>
      <p className="mt-2 text-ink/60">
        {ALL_MAJORS.length} 个专业讲清四件事：学什么、四个出口、适合谁、坑在哪。已收录 {trapCount} 个名称陷阱专业，报前先祛魅。
      </p>

      <div className="mt-6 space-y-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索专业名或关键词，如「计算机」「数学」「考公」"
          className="w-full bg-white border border-black/10 rounded-full px-5 py-3 text-sm outline-none focus:border-gold"
        />
        <div className="flex flex-wrap items-center gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={
                "px-3.5 py-1.5 rounded-full text-xs transition-colors " +
                (cat === c ? "bg-ink text-gold font-medium" : "bg-white border border-black/10 hover:border-gold")
              }
            >
              {c}
            </button>
          ))}
          <span className="w-px bg-black/10 mx-1" />
          <button
            onClick={() => setOnlyTrap(!onlyTrap)}
            className={
              "px-3.5 py-1.5 rounded-full text-xs transition-colors " +
              (onlyTrap ? "bg-red-500 text-white font-medium" : "bg-white border border-black/10 hover:border-red-400")
            }
          >
            {onlyTrap ? "只看陷阱专业 ✓" : "只看陷阱专业"}
          </button>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="mt-12 text-center text-sm text-ink/40">没有匹配的专业，换个筛选条件试试。</p>
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((m) => (
            <Link
              key={m.id}
              href={"/majors/" + m.id}
              className="bg-white rounded-2xl p-5 border border-black/5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-bold text-lg">{m.name}</h2>
                <span className="text-xs text-ink/50 whitespace-nowrap">{m.category}</span>
              </div>
              {m.isTrap && (
                <p className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-lg inline-block">
                  {TRAP_LABEL}
                </p>
              )}
              <p className="mt-3 text-sm text-ink/60 line-clamp-2">{m.what}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
