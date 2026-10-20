import Link from "next/link";
import { SCHOOLS } from "@/lib/data/schools";

export default function SchoolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">学校介绍</h1>
      <p className="mt-2 text-ink/60">
        结构化院校卡片：实力在哪、政策如何、坑在哪。信息来自公开资料整理，报考前请核对当年招生章程。
      </p>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SCHOOLS.map((s) => (
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
    </div>
  );
}