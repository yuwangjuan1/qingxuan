"use client";

import { useEffect, useMemo, useState } from "react";

const TABS = [
  "冲稳保定位计算器",
  "冲稳保梯度自查",
  "防退档终检清单",
  "我的志愿清单",
  "专业二选一矩阵",
] as const;

const gradientChecks = [
  "我已把自己的分数换算成全省位次（看一分一段表），而不是只看分数",
  "冲的志愿：接受它们的绝大多数专业组，而不是只冲校名",
  "稳的志愿：位次区间与我近两年等效位次的中位匹配",
  "保的志愿：数量足够，且我能接受其中全部专业",
  "最后的保底一定是本批次里录取位次最宽的那一档",
  "我检查了目标专业组的选科要求与我完全一致",
];

const finalChecks = [
  "体检：色盲色弱、视力等限报专业我已逐条核对",
  "单科成绩要求：外语/数学等单科线我已确认达标",
  "外语语种：只招英语的专业我已确认无误",
  "学费：中外合作等高收费专业家庭已明确接受",
  "专业组内没有我完全不能接受的专业（调剂也兜得住）",
  "招生章程原文我已读过，而不是只看了APP摘要",
];

type Wish = { id: number; school: string; group: string; tier: "冲" | "稳" | "保"; note: string };

const WISH_KEY = "qingxuan-wishlist-v1";

function classify(myRank: number, schoolRank: number): "冲" | "稳" | "保" {
  const ratio = schoolRank / myRank;
  if (ratio < 1) return "冲";
  if (ratio <= 1.15) return "稳";
  return "保";
}

const tierColor: Record<string, string> = {
  冲: "text-red-500 bg-red-50 border-red-200",
  稳: "text-amber-600 bg-amber-50 border-amber-200",
  保: "text-jade bg-jade/10 border-jade/20",
};

type Option = { name: string; scores: number[] };

export default function ToolsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>(TABS[0]);
  const [gradChecked, setGradChecked] = useState<boolean[]>(Array(gradientChecks.length).fill(false));
  const [finalChecked, setFinalChecked] = useState<boolean[]>(Array(finalChecks.length).fill(false));

  const [options, setOptions] = useState<Option[]>([
    { name: "选项A", scores: [3, 3, 3] },
    { name: "选项B", scores: [3, 3, 3] },
  ]);
  const [weights, setWeights] = useState<number[]>([40, 35, 25]);
  const dims = ["兴趣与日常感受", "出口（就业/深造/考公）", "家庭现实（费用/距离/资源）"];

  // 定位计算器
  const [myRank, setMyRank] = useState("");
  const [rows, setRows] = useState([
    { name: "", ranks: ["", "", ""] },
    { name: "", ranks: ["", "", ""] },
    { name: "", ranks: ["", "", ""] },
  ]);

  // 志愿清单
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(WISH_KEY);
      if (raw) setWishes(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(WISH_KEY, JSON.stringify(wishes));
      } catch {}
    }
  }, [wishes, loaded]);

  const totals = useMemo(
    () => options.map((o) => o.scores.reduce((acc, s, i) => acc + s * weights[i], 0)),
    [options, weights]
  );

  const myRankNum = Number(myRank) || 0;

  const wishCounts = useMemo(() => {
    const c = { 冲: 0, 稳: 0, 保: 0 };
    wishes.forEach((w) => (c[w.tier] += 1));
    return c;
  }, [wishes]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <div className="page-banner rounded-3xl px-8 py-10 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold">择校工具</h1>
        <p className="mt-3 text-ink/60 max-w-2xl leading-relaxed text-sm md:text-base">
          把方法论变成可勾选的动作。所有结果只在你本地浏览器里计算，不收集任何信息。
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-5 py-2.5 rounded-full text-sm transition-all " +
              (tab === t
                ? "bg-ink text-gold font-medium shadow-card"
                : "bg-white border border-ink/10 text-ink/60 hover:border-gold hover:text-gold")
            }
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "冲稳保定位计算器" && (
        <div className="card mt-6 p-7">
          <h2 className="font-bold mb-1">用位次给候选院校分档</h2>
          <p className="text-sm text-ink/50 mb-4">
            输入你的全省位次，再填候选院校近三年录取位次（在省考试院或院校官网查），自动给出冲/稳/保分档。口径：录取位次小于你的=冲；差距 15% 以内=稳；更大=保。
          </p>
          <div className="flex items-center gap-3">
            <label className="text-sm shrink-0 font-medium">我的全省位次</label>
            <input
              value={myRank}
              onChange={(e) => setMyRank(e.target.value.replace(/\D/g, ""))}
              placeholder="如 18500"
              inputMode="numeric"
              className="field w-40 rounded-xl px-4 py-2 text-sm"
            />
          </div>
          <div className="mt-5 space-y-3">
            {rows.map((r, ri) => {
              const nums = r.ranks.map((x) => Number(x) || 0);
              const valid = myRankNum > 0 && nums.some((n) => n > 0);
              const grades = nums.filter((n) => n > 0).map((n) => classify(myRankNum, n));
              const avg = grades.length ? grades.reduce((c, g) => c + (g === "冲" ? 0 : g === "稳" ? 1 : 2), 0) / grades.length : -1;
              const final = avg < 0 ? "" : avg < 0.5 ? "冲" : avg <= 1.4 ? "稳" : "保";
              return (
                <div key={ri} className="flex flex-wrap items-center gap-2 p-3.5 rounded-xl bg-paper-dark/50 border border-ink/5">
                  <input
                    value={r.name}
                    onChange={(e) => setRows((a) => a.map((x, i) => (i === ri ? { ...x, name: e.target.value } : x)))}
                    placeholder={"院校/专业组 " + (ri + 1)}
                    className="field w-44 rounded-lg px-3 py-1.5 text-sm"
                  />
                  {r.ranks.map((rank, qi) => (
                    <input
                      key={qi}
                      value={rank}
                      onChange={(e) =>
                        setRows((a) =>
                          a.map((x, i) =>
                            i === ri ? { ...x, ranks: x.ranks.map((y, j) => (j === qi ? e.target.value.replace(/\D/g, "") : y)) } : x
                          )
                        )
                      }
                      placeholder={["前年位次", "去年位次", "今年位次"][qi]}
                      inputMode="numeric"
                      className="field w-24 rounded-lg px-3 py-1.5 text-sm"
                    />
                  ))}
                  {valid && (
                    <span className={"text-xs font-bold px-3 py-1.5 rounded-full border " + tierColor[final]}>
                      综合：{final}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {myRankNum > 0 && (
            <p className="mt-4 text-xs text-ink/40 leading-relaxed">
              提示：分档只看位次差，不考虑当年招生计划增减与冷热波动。相邻档院校建议自行调整顺序——最想去的永远放最前面。
            </p>
          )}
        </div>
      )}

      {tab === "冲稳保梯度自查" && (
        <div className="card mt-6 p-7">
          <h2 className="font-bold mb-1">梯度健康自查</h2>
          <p className="text-sm text-ink/50 mb-4">逐条自问。少于 5 条勾选 = 你的志愿表梯度可能有问题。</p>
          <div className="space-y-3">
            {gradientChecks.map((c, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={gradChecked[i]}
                  onChange={() => setGradChecked((a) => a.map((v, j) => (j === i ? !v : v)))}
                  className="mt-1 w-4 h-4 accent-gold"
                />
                <span className="text-sm leading-relaxed group-hover:text-ink">{c}</span>
              </label>
            ))}
          </div>
          <div className="mt-5 p-4 rounded-xl bg-paper text-sm">
            已勾选 {gradChecked.filter(Boolean).length} / {gradientChecks.length}
            {gradChecked.filter(Boolean).length >= 5 ? "：梯度健康，继续保持。" : "：还有明显漏项，建议找青杏把梯度重新排一遍。"}
          </div>
        </div>
      )}

      {tab === "防退档终检清单" && (
        <div className="card mt-6 p-7">
          <h2 className="font-bold mb-1">提交前最后一道闸</h2>
          <p className="text-sm text-ink/50 mb-4">退档=本批次直接出局。6 条全勾才允许自己点提交。</p>
          <div className="space-y-3">
            {finalChecks.map((c, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={finalChecked[i]}
                  onChange={() => setFinalChecked((a) => a.map((v, j) => (j === i ? !v : v)))}
                  className="mt-1 w-4 h-4 accent-gold"
                />
                <span className="text-sm leading-relaxed group-hover:text-ink">{c}</span>
              </label>
            ))}
          </div>
          <div className="mt-5 p-4 rounded-xl bg-paper text-sm">
            {finalChecked.every(Boolean) ? "六项全过：这份志愿表可以提交了。" : "未全过：任何一条没核对，都有退档风险，别急着提交。"}
          </div>
        </div>
      )}

      {tab === "我的志愿清单" && (
        <div className="card mt-6 p-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-bold">志愿表草稿（自动保存在本机）</h2>
              <p className="text-sm text-ink/50 mt-1">把讨论结果记下来，按冲稳保归类，实时看梯度结构。</p>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full border border-red-200 bg-red-50 text-red-500">冲 {wishCounts.冲}</span>
              <span className="px-2.5 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-600">稳 {wishCounts.稳}</span>
              <span className="px-2.5 py-1 rounded-full border border-jade/20 bg-jade/10 text-jade">保 {wishCounts.保}</span>
            </div>
          </div>

          {wishes.length >= 6 && wishCounts.保 / wishes.length < 0.2 && (
            <p className="mt-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
              预警：保底占比不足两成。保底是「有学上」的底线，建议至少补 2 个位次冗余大的选项。
            </p>
          )}
          {wishes.length > 0 && wishCounts.保 === 0 && (
            <p className="mt-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
              预警：还没有任何保底志愿。没有保底的志愿表等于裸奔，先补保底再谈别的。
            </p>
          )}

          <button
            onClick={() =>
              setWishes((w) => [...w, { id: Date.now(), school: "", group: "", tier: "稳", note: "" }])
            }
            className="btn-gold mt-4 text-sm text-ink px-5 py-2.5 rounded-full font-medium"
          >
            + 添加一个志愿
          </button>

          <div className="mt-4 space-y-3">
            {wishes.length === 0 && (
              <p className="text-sm text-ink/40 py-6 text-center">
                还没有志愿。跟家人讨论出一个候选院校，就随手加进来。
              </p>
            )}
            {wishes.map((w, i) => (
              <div key={w.id} className="flex flex-wrap items-center gap-2 p-3.5 rounded-xl bg-paper-dark/50 border border-ink/5">
                <span className="text-xs text-ink/40 w-6 text-center">{i + 1}</span>
                <input
                  value={w.school}
                  onChange={(e) => setWishes((a) => a.map((x) => (x.id === w.id ? { ...x, school: e.target.value } : x)))}
                  placeholder="院校名称"
                  className="field flex-1 min-w-36 rounded-lg px-3 py-1.5 text-sm"
                />
                <input
                  value={w.group}
                  onChange={(e) => setWishes((a) => a.map((x) => (x.id === w.id ? { ...x, group: e.target.value } : x)))}
                  placeholder="专业组/代码"
                  className="field w-32 rounded-lg px-3 py-1.5 text-sm"
                />
                <select
                  value={w.tier}
                  onChange={(e) =>
                    setWishes((a) => a.map((x) => (x.id === w.id ? { ...x, tier: e.target.value as Wish["tier"] } : x)))
                  }
                  className="field rounded-lg px-2 py-1.5 text-sm"
                >
                  <option value="冲">冲</option>
                  <option value="稳">稳</option>
                  <option value="保">保</option>
                </select>
                <input
                  value={w.note}
                  onChange={(e) => setWishes((a) => a.map((x) => (x.id === w.id ? { ...x, note: e.target.value } : x)))}
                  placeholder="备注（可接受的专业组？）"
                  className="field flex-1 min-w-40 rounded-lg px-3 py-1.5 text-sm"
                />
                <button
                  onClick={() => setWishes((a) => a.filter((x) => x.id !== w.id))}
                  className="text-xs text-red-400 hover:text-red-600 px-2"
                >
                  删除
                </button>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-ink/40 leading-relaxed">
            数据仅保存在你自己的浏览器（localStorage），不上传服务器。清空浏览器缓存会丢失，重要结论建议同步给家人。
          </p>
        </div>
      )}

      {tab === "专业二选一矩阵" && (
        <div className="card mt-6 p-7">
          <h2 className="font-bold mb-1">纠结终结器</h2>
          <p className="text-sm text-ink/50 mb-4">先定权重（合计100），再给两个选项在三个维度打分（1-5），分数不代表对错，代表你认真想过。</p>
          <div className="space-y-4">
            {dims.map((d, i) => (
              <div key={d} className="flex items-center gap-3">
                <span className="text-sm w-44 shrink-0">{d}</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={weights[i]}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setWeights((w) => {
                      const next = [...w];
                      next[i] = v;
                      const others = next.reduce((s, x, j) => (j === i ? s : s + x), 0);
                      if (others + v > 100) return w;
                      return next;
                    });
                  }}
                  className="flex-1 accent-gold"
                />
                <span className="text-sm w-12 text-right">{weights[i]}%</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {options.map((o, oi) => (
              <div key={oi} className="p-4 rounded-xl bg-paper">
                <input
                  value={o.name}
                  onChange={(e) => setOptions((a) => a.map((x, i) => (i === oi ? { ...x, name: e.target.value } : x)))}
                  className="w-full bg-transparent font-bold text-sm border-b border-black/10 focus:border-gold outline-none pb-1"
                />
                {dims.map((d, di) => (
                  <div key={di} className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-ink/50 w-28">{d.slice(0, 8)}</span>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => setOptions((a) => a.map((x, i) => (i === oi ? { ...x, scores: x.scores.map((s, j) => (j === di ? n : s)) } : x)))}
                        className={"w-6 h-6 rounded-full text-xs " + (o.scores[di] >= n ? "bg-gold text-ink" : "bg-black/5 text-ink/40")}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                ))}
                <p className="mt-3 text-sm font-bold text-jade">加权得分：{totals[oi]}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl bg-ink text-paper text-sm leading-relaxed">
            {totals[0] === totals[1]
              ? "平分秋色：说明两个都行，真正的分歧可能在更高一层（城市/学校档次），去找青棠聊聊。"
              : "矩阵上 " + (totals[0] > totals[1] ? options[0].name : options[1].name) + " 胜出。但记住：这是你的矩阵，别人改不了你的权重这正是它有用的原因。"}
          </div>
        </div>
      )}
    </div>
  );
}
