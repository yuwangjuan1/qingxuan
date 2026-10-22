import Link from "next/link";
import { ADVISORS } from "@/lib/agents";

const modules = [
  { href: "/schools", n: "01", title: "学校介绍", desc: "34 所院校结构化卡片：学科实力、转专业政策、报考避坑点，支持搜索筛选。", accent: "text-gold-dark" },
  { href: "/majors", n: "02", title: "专业定位", desc: "24 个专业拆名字背后的真相：名称陷阱排查、四出口地图、适不适合你来判断。", accent: "text-jade" },
  { href: "/tools", n: "03", title: "择校工具", desc: "位次换算、冲稳保梯度自查、防退档终检清单、志愿清单与决策矩阵。", accent: "text-blue" },
  { href: "/guide", n: "04", title: "填报指南", desc: "名词词典、八大经典坑位、填报日历与高频问答，一站式补齐规则知识。", accent: "text-gold-dark" },
  { href: "/insights", n: "05", title: "竞争与就业", desc: "12 条行业红绿灯：竞争态势与就业形势的定性分析，来源公开可查。", accent: "text-jade" },
];
const stats = [
  { num: "34", label: "所院校卡" },
  { num: "24", label: "个专业祛魅" },
  { num: "12", label: "条行业红绿灯" },
  { num: "5", label: "个决策工具" },
  { num: "3", label: "位 AI 顾问" },
];

const steps = [
  { n: "01", title: "报省份和位次", desc: "只有分数？先去一分一段表换成位次。位次才是所有判断的锚点。", href: "/tools", label: "去换算位次" },
  { n: "02", title: "看你的候选区间", desc: "冲、稳、保三档大致落在哪一段，先有区间，再谈具体学校。", href: "/schools", label: "圈定候选院校" },
  { n: "03", title: "把纠结聊清楚", desc: "策略、专业、家庭分歧，三个顾问各管一段，想不清楚的部分交给对话。", href: "/chat", label: "找顾问聊" },
];
export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="banner-deep text-white">
        <div className="relative max-w-[1200px] mx-auto px-4 py-24 md:py-32">
          <p className="banner-rise flex items-center gap-3 text-sm text-gold-light/90 mb-6">
            <span className="w-8 h-px bg-gold-light/70" />
            高考志愿决策平台
          </p>
          <h1 className="banner-rise text-4xl md:text-6xl font-bold leading-tight md:leading-snug max-w-3xl" style={{ animationDelay: "90ms" }}>
            大厂告诉你能上哪些学校，
            <br />
            我们帮你想清楚<span className="text-gold-light">该上哪个</span>。
          </h1>
          <p className="banner-rise mt-7 text-white/75 max-w-2xl leading-loose text-base md:text-lg" style={{ animationDelay: "180ms" }}>
            不预测分数线，不承诺录取结果。青选提供择校方法、专业祛魅与家庭调解，
            配三位 AI 顾问，陪你把志愿表从吵成一团填到全票通过。
          </p>
          <div className="banner-rise mt-10 flex gap-4 flex-wrap" style={{ animationDelay: "270ms" }}>
            <Link href="/chat" className="bg-white text-[#003AA8] px-8 py-3.5 rounded-full font-medium hover:bg-blue-pale transition-colors">
              开始咨询顾问 &rarr;
            </Link>
            <Link href="/tools" className="px-8 py-3.5 rounded-full border border-white/35 text-white/90 hover:bg-white/10 transition-colors">
              先用免费工具
            </Link>
          </div>
          <div className="banner-rise mt-14 flex gap-x-8 gap-y-4 flex-wrap" style={{ animationDelay: "360ms" }}>
            {stats.map((s) => (
              <div key={s.label} className="pl-4 border-l border-white/25">
                <p className="text-3xl font-bold">{s.num}</p>
                <p className="text-sm text-white/60 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 三步开始 */}
      <section className="relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 -mt-14 md:-mt-16">
          <div className="card p-6 md:p-8 shadow-[0_18px_50px_-16px_rgba(0,27,74,0.25)]">
            <div className="flex items-end justify-between flex-wrap gap-3 mb-6">
              <div>
                <p className="text-sm font-medium text-blue mb-1.5">第一次来？</p>
                <h2 className="text-xl md:text-2xl font-bold">三步，从「我这分能报哪」走到「我该报哪个」</h2>
              </div>
              <p className="text-sm text-ink/45">不用先搞懂规则，跟着走一遍就知道自己该干什么。</p>
            </div>
            <div className="grid md:grid-cols-3 gap-3 md:gap-4">
              {steps.map((s, i) => (
                <Link key={s.n} href={s.href} className="group rounded-xl border border-ink/8 bg-paper/40 hover:bg-white hover:border-blue/35 hover:shadow-card transition-all p-5 flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gold/60">{s.n}</span>
                    <h3 className="font-bold text-base">{s.title}</h3>
                    {i < steps.length - 1 && (
                      <span className="hidden md:block ml-auto text-ink/20">&rarr;</span>
                    )}
                  </div>
                  <p className="mt-2.5 text-sm text-ink/55 leading-relaxed flex-1">{s.desc}</p>
                  <span className="mt-3 text-sm font-medium text-blue inline-flex items-center gap-1">
                    {s.label} <span>&rarr;</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* 顾问 */}
      <section className="max-w-[1200px] mx-auto px-4 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="section-line" />
            <h2 className="text-3xl font-bold mt-3">三位顾问，各管一段</h2>
            <p className="mt-2 text-ink/50 text-sm">策略、专业、家庭调解，分工明确，不互相越界。</p>
          </div>
          <Link href="/chat" className="text-sm text-blue hover:text-blue-deep transition-colors">直接开聊 &rarr;</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {ADVISORS.map((a) => (
            <Link key={a.id} href={"/chat?advisor=" + a.id} className="card card-hover group p-7">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold mb-5" style={{ background: a.color }}>
                {a.name[1]}
              </div>
              <h3 className="font-bold text-lg">
                {a.name}
                <span className="text-ink/40 text-sm font-normal ml-2">{a.title}</span>
              </h3>
              <p className="mt-2.5 text-sm text-ink/60 leading-relaxed">{a.intro}</p>
              <p className="mt-5 text-sm font-medium inline-flex items-center gap-1" style={{ color: a.color }}>
                找 TA 聊聊 <span>&rarr;</span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 模块 */}
      <section className="bg-blue-pale/60 border-y border-blue/10">
        <div className="max-w-[1200px] mx-auto px-4 py-20">
          <div className="mb-10">
            <span className="section-line" />
            <h2 className="text-3xl font-bold mt-3">五大模块</h2>
            <p className="mt-2 text-ink/50 text-sm">从查资料到做决定，填报全流程的工具箱。</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((m) => (
              <Link key={m.href} href={m.href} className="card card-hover group p-6 flex gap-4">
                <div
                  className={
                    "shrink-0 w-11 h-11 rounded-lg border border-ink/10 bg-paper flex items-center justify-center text-sm font-bold " +
                    m.accent
                  }
                >
                  {m.n}
                </div>
                <div>
                  <h3 className="font-bold group-hover:text-blue transition-colors">{m.title}</h3>
                  <p className="mt-1.5 text-sm text-ink/55 leading-relaxed">{m.desc}</p>
                </div>
              </Link>
            ))}
            <div className="rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br from-blue-deep to-blue text-paper">
              <div>
                <p className="text-sm text-gold-light font-medium">我们的立场</p>
                <p className="text-lg font-bold leading-relaxed mt-3">
                  不做一键推荐，
                  <br />
                  只帮你把决定做对。
                </p>
              </div>
              <Link href="/guide" className="mt-4 text-xs text-paper/70 hover:text-gold-light transition-colors">
                先去补齐规则知识 &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 理念 */}
      <section className="max-w-[1200px] mx-auto px-4 py-20">
        <div className="banner-deep theme-blue rounded-3xl text-paper p-10 md:p-16">
          <div className="max-w-3xl">
            <span className="section-line" />
            <h2 className="text-2xl md:text-3xl font-bold mt-4 leading-snug">
              为什么我们不给你「智能推荐」？
            </h2>
            <p className="mt-5 text-paper/60 leading-loose">
              免费工具已经能把你的分数变成一百个志愿，但同一分数在不同平台得到的方案重合率不到三成。
              推荐越多，家庭越乱。青选不加入推荐竞赛：我们教你判断的方法、核查的清单和一家人达成一致的路子。
              决定是你自己做的，所以不后悔也是你自己的。
            </p>
            <div className="mt-8 flex gap-3 flex-wrap text-xs">
              {["位次思维", "梯度结构", "防退档清单", "家庭共识"].map((t) => (
                <span key={t} className="border border-white/15 bg-white/5 rounded-full px-4 py-1.5 text-paper/70">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}