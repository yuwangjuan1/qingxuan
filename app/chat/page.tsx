"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ADVISORS, AdvisorId } from "@/lib/agents";

type Msg = { role: "user" | "assistant"; content: string };

const OPENERS: Record<AdvisorId, string> = {
  qingxing: "你好，我是青杏。把你的省份和全省位次告诉我（只有分数的话，先去一分一段表查位次），我们从定位开始。",
  qingtang: "你好，我是青棠。说说你现在纠结的专业，或者讲讲你平时做什么事最投入，我们从证据开始。",
  qingwu: "你好，我是青梧。说说你们家现在在吵什么：谁想报什么、谁反对、反对的理由是什么，我来帮你们把话捋顺。",
};

const QUICKS: Record<AdvisorId, string[]> = {
  qingxing: [
    "平行志愿的投档规则讲一下，为什么会有退档？",
    "冲稳保到底怎么排比例？保底怎么选才算真的保得住？",
    "我的位次在两所院校之间摇摆，怎么定先后顺序？",
  ],
  qingtang: [
    "信息管理与信息系统是学编程的吗？名字像计算机的区别在哪？",
    "想学计算机但分数差几分，软件工程值不值得报？",
    "孩子想学人工智能，这个专业本科毕业好找工作吗？",
  ],
  qingwu: [
    "爸爸坚持考公、孩子想学设计，聊崩了怎么办？",
    "家里觉得师范稳，孩子死活不想当老师，怎么开这个家庭会？",
    "临近提交还谈不拢，有没有先保底的折中办法？",
  ],
};

function ChatInner() {
  const params = useSearchParams();
  const initial = (params.get("advisor") as AdvisorId) || "qingxing";
  const [advisorId, setAdvisorId] = useState<AdvisorId>(ADVISORS.some((a) => a.id === initial) ? initial : "qingxing");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const advisor = ADVISORS.find((a) => a.id === advisorId)!;

  useEffect(() => {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
    setBusy(false);
  }, [advisorId]);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);
    const ac = new AbortController();
    abortRef.current = ac;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advisorId, messages: next }),
        signal: ac.signal,
      });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: "服务暂不可用" }));
        const detail = err as { error?: string; detail?: string; status?: number };
        const msg =
          "出错了：" + (detail.error || res.status) +
          (detail.detail ? "\n[详情] " + String(detail.detail).slice(0, 300) : "") +
          (detail.status === 401 ? "\n（疑似 API Key 无效）" : "") +
          (detail.status === 404 ? "\n（疑似 BASE_URL 或模型名不对）" : "");
        setMessages((m) => [...m, { role: "assistant", content: msg }]);
        setBusy(false);
        return;
      }
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = TextDecoder ? new TextDecoder() : null;
      let buf = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder!.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() || "";
        for (const line of lines) {
          const t = line.trim();
          if (!t.startsWith("data:")) continue;
          const payload = t.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload);
            const delta = json.choices?.[0]?.delta?.content || "";
            if (delta) {
              setMessages((m) => {
                const copy = [...m];
                const last = copy[copy.length - 1];
                if (last && last.role === "assistant") copy[copy.length - 1] = { ...last, content: last.content + delta };
                return copy;
              });
            }
          } catch {}
        }
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        setMessages((m) => [...m, { role: "assistant", content: "网络异常，请稍后重试。" }]);
      }
    }
    setBusy(false);
  }

  function stop() {
    abortRef.current?.abort();
    setBusy(false);
  }

  function retry() {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser) {
      setMessages((m) => {
        const idx = m.map((x) => x.role).lastIndexOf("user");
        return m.slice(0, idx);
      });
      setInput(lastUser.content);
      setTimeout(send, 50);
      setTimeout(() => setInput(""), 100);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-6 pb-4 h-[calc(100vh-76px)] flex flex-col">
      {/* 顾问切换 */}
      <div className="flex gap-2.5 overflow-x-auto pb-3">
        {ADVISORS.map((a) => {
          const active = advisorId === a.id;
          return (
            <button
              key={a.id}
              onClick={() => setAdvisorId(a.id)}
              aria-pressed={active}
              className={
                "shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all " +
                (active
                  ? "text-white shadow-md"
                  : "bg-white border border-ink/10 text-ink/65 hover:border-ink/30 hover:text-ink")
              }
              style={active ? { background: a.color } : undefined}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: active ? "rgba(255,255,255,0.9)" : a.color }}
              />
              {a.name}
              <span className={active ? "text-white/80" : "text-ink/40"}>· {a.title}</span>
            </button>
          );
        })}
      </div>

      {/* 顾问介绍条 */}
      <div
        className="rounded-xl px-4 py-2.5 mb-3 text-sm text-ink/75 border-l-4 flex items-center gap-3"
        style={{ background: advisor.color + "10", borderColor: advisor.color }}
      >
        <span className="text-ink/60 leading-relaxed flex-1">{advisor.intro}</span>
      </div>

      {/* 消息区 */}
      <div ref={boxRef} className="card flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 && (
          <div className="text-sm text-ink/55 leading-relaxed">
            <p className="whitespace-pre-wrap">{OPENERS[advisorId]}</p>
            <div className="mt-4 flex flex-col gap-2">
              {QUICKS[advisorId].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="text-left text-sm text-ink/70 bg-paper border border-ink/8 rounded-xl px-4 py-2.5 hover:border-blue/50 hover:text-blue transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={"flex gap-2.5 " + (m.role === "user" ? "justify-end" : "justify-start")}>
            {m.role === "assistant" && (
              <div
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm"
                style={{ background: advisor.color }}
              >
                {advisor.name[1]}
              </div>
            )}
            <div
              className={
                "max-w-[82%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed whitespace-pre-wrap " +
                (m.role === "user" ? "bg-blue text-white rounded-br-sm" : "bg-paper border border-ink/5 rounded-bl-sm")
              }
            >
              {m.content || "..."}
            </div>
          </div>
        ))}
        {busy && messages[messages.length - 1]?.role === "assistant" && !messages[messages.length - 1]?.content && (
          <div className="flex gap-2.5 items-center">
            <div
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm"
              style={{ background: advisor.color }}
            >
              {advisor.name[1]}
            </div>
            <div className="flex gap-1.5 px-4 py-3 bg-paper border border-ink/5 rounded-2xl rounded-bl-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-ink/30 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* 输入区 */}
      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
          placeholder={"向" + advisor.name + "提问，Enter 发送"}
          className="field flex-1 rounded-full px-5 py-3 text-base"
          disabled={busy}
        />
        {busy ? (
          <button
            onClick={stop}
            className="border border-ink/15 text-ink/70 px-6 rounded-full text-sm font-medium hover:border-red-300 hover:text-red-500 transition-colors"
          >
            停止
          </button>
        ) : (
          <>
            {messages.some((m) => m.role === "user") && (
              <button
                onClick={retry}
                className="border border-ink/15 text-ink/60 px-5 rounded-full text-sm hover:border-blue/50 hover:text-blue transition-colors"
              >
                重问
              </button>
            )}
            <button
              onClick={send}
              disabled={!input.trim()}
              className="btn-blue text-white px-7 rounded-full text-sm font-medium disabled:opacity-40"
            >
              发送
            </button>
          </>
        )}
      </div>
      <p className="mt-2 text-xs text-ink/40 text-center">
        顾问只提供决策方法参考，不提供分数线与录取预测；最终以各省考试院与院校官方信息为准。
      </p>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-10 text-sm text-ink/50">加载中...</div>}>
      <ChatInner />
    </Suspense>
  );
}
