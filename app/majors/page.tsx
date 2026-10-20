import Link from "next/link";
import { MAJORS, TRAP_LABEL } from "@/lib/data/majors";

export default function MajorsPage() {
  const traps = MAJORS.filter((m) => m.isTrap).length;
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">专业定位</h1>
      <p className="mt-2 text-ink/60">
        每个专业讲清四件事：学什么、四个出口、适合谁、坑在哪。已收录 {traps} 个名称陷阱专业，报前先祛魅。
      </p>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MAJORS.map((m) => (
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
                {TRAP_LABEL}：{m.trapNote.slice(0, 24)}...
              </p>
            )}
            <p className="mt-3 text-sm text-ink/60 line-clamp-2">{m.what}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}