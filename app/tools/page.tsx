"use client";

import { useMemo, useState } from "react";

const TABS = ["冲稳保梯度自查", "防退档终检清单", "专业二选一矩阵"] as const;

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

  const totals = useMemo(
    () => options.map((o) => o.scores.reduce((acc, s, i) => acc + s * weights[i], 0)),
    [options, weights]
  );
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">择校工具</h1>
      <p className="mt-2 text-ink/60">把方法论变成可勾选的动作。所有结果只在你本地浏览器里计算，不收集任何信息。</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={"px-4 py-2 rounded-full text-sm transition-colors " + (tab === t ? "bg-ink text-gold font-medium" : "bg-white border border-black/10 hover:border-gold")}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "冲稳保梯度自查" && (
        <div className="mt-6 bg-white rounded-2xl p-6 border border-black/5">
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
        <div className="mt-6 bg-white rounded-2xl p-6 border border-black/5">
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

      {tab === "专业二选一矩阵" && (
        <div className="mt-6 bg-white rounded-2xl p-6 border border-black/5">
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