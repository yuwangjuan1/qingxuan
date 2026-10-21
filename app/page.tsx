import Link from "next/link";
import { ADVISORS } from "@/lib/agents";

const modules = [
  {
    href: "/schools",
    title: "学校介绍",
    desc: "34 所院校结构化卡片：学科实力、转专业政策、报考避坑点，支持搜索筛选。",
    icon: "校",
    accent: "from-gold/15 to-gold/5 text-gold",
  },
  {
    href: "/majors",
    title: "专业定位",
    desc: "24 个专业拆名字背后的真相：名称陷阱排查、四出口地图、适不适合你来判断。",
    icon: "专",
    accent: "from-jade/15 to-jade/5 text-jade",
  },
  {
    href: "/tools",
    title: "择校工具",
    desc: "位次换算、冲稳保梯度自查、防退档终检清单、志愿清单与决策矩阵。",
    icon: "具",
    accent: "from-ink/10 to-ink/5 text-ink",
  },
  {
    href: "/guide",
    title: "填报指南",
    desc: "名词词典、八大经典坑位、填报日历与高频问答，一站式补齐规则知识。",
    icon: "南",
    accent: "from-gold/15 to-gold/5 text-gold",
  },
  {
    href: "/insights",
    title: "竞争与就业",
    desc: "12 条行业红绿灯：竞争态势与就业形势的定性分析，来源公开可查。",
    icon: "势",
    accent: "from-jade/15 to-jade/5 text-jade",
  },
];

const stats = [
  { num: "34", label: "所院校卡" },
  { num: "24", label: "个专业祛魅" },
  { num: "12", label: "条行业红绿灯" },
  { num: "5", label: "个决策工具" },
  { num: "3", label: "位 AI 顾问" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="banner-deep text-white">
        <div className="banner-orb banner-orb-a" />
        <div className="banner-orb banner-orb-b" />
        <div className="banner-orb banner-orb-c" />
        <div className="banner-grid" />
        <div className="relative max-w-[1200px] mx-auto px-4 py-28 md:py-40">
          <p className="banner-rise inline-flex items-center gap-2 text-[#CFE3FF] text-xs tracking-[0.3em] mb-6 border border-white/25 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-light animate-pulse" />
            高考志愿决策平台
          </p>
          <h1 className="banner-rise text-4xl md:text-6xl font-bold leading-tight md:leading-snug max-w-3xl" style={{ animationDelay: "90ms" }}>
            大厂告诉你能上哪些学校，
            <br />
            我们帮你想清楚
            <span className="relative inline-block text-gold-light">
              该上哪个
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-gradient-to-r from-gold to-transparent rounded-full" />
            </span>
            。
          </h1>
          <p className="banner-rise mt-7 text-white/75 max-w-2xl leading-loose text-base md:text-lg" style={{ animationDelay: "180ms" }}>
            不预测分数线，不承诺录取结果。青选提供择校方法、专业祛魅与家庭调解，
            配三位 AI 顾问，陪你把志愿表从吵成一团填到全票通过。
          </p>
          <div className="banner-rise mt-10 flex gap-4 flex-wrap" style={{ animationDelay: "270ms" }}>
            <Link
              href="/chat"
              className="bg-white text-[#003AA8] px-8 py-3.5 rounded-full font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              开始咨询顾问 →
            </Link>
            <Link
              href="/tools"
              className="px-8 py-3.5 rounded-full border border-white/40 text-white/90 hover:bg-white/10 hover:border-white transition-colors"
            >
              先用免费工具
            </Link>
          </div>
          <div className="banner-rise mt-14 flex gap-x-10 gap-y-4 flex-wrap" style={{ animationDelay: "360ms" }}>
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white">
                  {s.num}
                </span>
                <span className="text-sm text-white/60">{s.label}</span>
              </div>
            ))}
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
          <Link href="/chat" className="text-sm text-jade hover:text-gold transition-colors">
            直接开聊 →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {ADVISORS.map((a) => (
            <Link
              key={a.id}
              href={"/chat?advisor=" + a.id}
              className="card card-hover group p-7 relative overflow-hidden"
            >
              <div
                className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-[0.07] group-hover:opacity-[0.14] transition-opacity"
                style={{ background: a.color }}
              />
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg mb-5 group-hover:scale-105 transition-transform"
                style={{ background: a.color }}
              >
                {a.name[1]}
              </div>
              <h3 className="font-bold text-lg">
                {a.name}
                <span className="text-ink/40 text-sm font-normal ml-2">{a.title}</span>
              </h3>
              <p className="mt-2.5 text-sm text-ink/60 leading-relaxed">{a.intro}</p>
              <p className="mt-5 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1" style={{ color: a.color }}>
                找 TA 聊聊 <span>→</span>
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
              <Link
                key={m.href}
                href={m.href}
                className="card card-hover group p-6 flex gap-5"
              >
                <div
                  className={
                    "shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-lg font-bold border border-ink/5 " +
                    m.accent
                  }
                >
                  {m.icon}
                </div>
                <div>
                  <h3 className="font-bold group-hover:text-gold transition-colors">{m.title}</h3>
                  <p className="mt-1.5 text-sm text-ink/55 leading-relaxed">{m.desc}</p>
                </div>
              </Link>
            ))}
            {/* 理念卡占位，撑满网格 */}
            <div className="rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br from-blue-deep to-blue text-paper">
              <p className="text-sm text-gold-light font-medium tracking-widest">我们的立场</p>
              <p className="text-lg font-bold leading-relaxed mt-3">
                不做一键推荐，
                <br />
                只帮你把决定做对。
              </p>
              <Link href="/guide" className="mt-4 text-xs text-paper/60 hover:text-gold-light transition-colors">
                先去补齐规则知识 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 理念 */}
      <section className="max-w-[1200px] mx-auto px-4 py-20">
        <div className="hero-blue rounded-3xl text-paper p-10 md:p-16 relative">
          <div className="relative max-w-3xl">
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
