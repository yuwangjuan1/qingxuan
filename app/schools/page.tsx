"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ALL_SCHOOLS } from "@/lib/data/schools";

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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">学校介绍</h1>
      <p className="mt-2 text-ink/60">
        {ALL_SCHOOLS.length} 所结构化院校卡：实力在哪、政策如何、坑在哪。信息来自公开资料整理，报考前请核对当年招生章程。
      </p>

      <div className="mt-6 space-y-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索校名、城市或关键词，如「电子」「成都」「两电一邮」"
          className="w-full bg-white border border-black/10 rounded-full px-5 py-3 text-sm outline-none focus:border-gold"
        />
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={
                "px-3.5 py-1.5 rounded-full text-xs transition-colors " +
                (type === t ? "bg-ink text-gold font-medium" : "bg-white border border-black/10 hover:border-gold")
              }
            >
              {t}
            </button>
          ))}
          <span className="w-px bg-black/10 mx-1" />
          {["不限", "985", "211", "双非"].map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={
                "px-3.5 py-1.5 rounded-full text-xs transition-colors " +
                (level === l ? "bg-gold text-ink font-medium" : "bg-white border border-black/10 hover:border-gold")
              }
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <p className="mt-12 text-center text-sm text-ink/40">没有匹配的院校，换个筛选条件试试。</p>
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((s) => (
            <Link
              key={s.id}
              href={"/schools/" + s.id}
              className="bg-white rounded-2xl p-5 border border-black/5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-bold text-lg">{s.name}</h2>
                <span className="text-xs text-gold bg-gold/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {s.level}
                </span>
              </div>
              <p className="mt-1 text-sm text-ink/50">
                {s.city} · {s.type}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="text-xs bg-paper px-2 py-0.5 rounded-full text-ink/70">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
