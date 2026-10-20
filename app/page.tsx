import Link from "next/link";
import { ADVISORS } from "@/lib/agents";

const modules = [
  {
    href: "/schools",
    title: "学校介绍",
    desc: "院校结构化卡片：学科实力、转专业政策、报考避坑点，只讲事实不讲光环。",
    icon: "学校",
  },
  {
    href: "/majors",
    title: "专业定位",
    desc: "拆专业名字背后的真相：名称陷阱排查、四出口地图、适不适合你来判断。",
    icon: "专业",
  },
  {
    href: "/tools",
    title: "择校工具",
    desc: "冲稳保梯度自查、防退档终检清单、专业决策矩阵，把方法变成动作。",
    icon: "工具",
  },
  {
    href: "/insights",
    title: "竞争与就业",
    desc: "各专业方向的红绿灯：竞争态势与就业形势的定性分析，来源公开可查。",
    icon: "洞察",
  },
];

export default function Home() {
  return (
    <div>
      <section className="bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
          <p className="text-gold text-sm tracking-widest mb-4">高考志愿决策平台</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-snug">
            大厂告诉你能上哪些学校，
            <br />
            我们帮你想清楚<span className="text-gold">该上哪个</span>。
          </h1>
          <p className="mt-6 text-paper/70 max-w-2xl leading-relaxed">
            不预测分数线，不承诺录取结果。青选提供择校方法、专业祛魅与家庭调解，
            配三位 AI 顾问，陪你把志愿表从吵成一团填到全票通过。
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              href="/chat"
              className="bg-gold text-ink px-6 py-3 rounded-full font-medium hover:bg-gold-light transition-colors"
            >
              开始咨询顾问
            </Link>
            <Link
              href="/tools"
              className="border border-paper/40 px-6 py-3 rounded-full hover:border-gold hover:text-gold-light transition-colors"
            >
              先用免费工具
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">三位顾问，各管一段</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {ADVISORS.map((a) => (
            <Link
              key={a.id}
              href={"/chat?advisor=" + a.id}
              className="group bg-white rounded-2xl p-6 border border-black/5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold mb-4"
                style={{ background: a.color }}
              >
                {a.name[1]}
              </div>
              <h3 className="font-bold text-lg">
                {a.name} · {a.title}
              </h3>
              <p className="mt-2 text-sm text-ink/60 leading-relaxed">{a.intro}</p>
              <p className="mt-4 text-sm text-jade group-hover:underline">找 TA 聊聊</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-black/5">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold mb-8">四大模块</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="flex gap-4 p-6 rounded-2xl bg-paper hover:bg-gold/10 transition-colors"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-ink text-gold flex items-center justify-center text-sm font-bold">
                  {m.icon}
                </div>
                <div>
                  <h3 className="font-bold">{m.title}</h3>
                  <p className="mt-1 text-sm text-ink/60 leading-relaxed">{m.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="rounded-2xl bg-ink text-paper p-8 md:p-12">
          <h2 className="text-xl md:text-2xl font-bold">为什么我们不给你「智能推荐」？</h2>
          <p className="mt-4 text-paper/70 leading-relaxed max-w-3xl">
            免费工具已经能把你的分数变成一百个志愿，但同一分数在不同平台得到的方案重合率不到三成。
            推荐越多，家庭越乱。青选不加入推荐竞赛：
            我们教你判断的方法、核查的清单和一家人达成一致的路子
            决定是你自己做的，所以不后悔也是你自己的。
          </p>
        </div>
      </section>
    </div>
  );
}