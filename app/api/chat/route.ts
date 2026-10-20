import { NextRequest } from "next/server";
import { ADVISORS } from "@/lib/agents";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  let body: { advisorId?: string; messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "请求体格式错误" }, { status: 400 });
  }

  const advisor = ADVISORS.find((a) => a.id === body.advisorId) ?? ADVISORS[0];
  const history = (body.messages ?? [])
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-20);

  const apiKey = process.env.LLM_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "服务端未配置 LLM_API_KEY" }, { status: 500 });
  }
  const baseUrl = process.env.LLM_BASE_URL ?? "https://dashscope.aliyuncs.com/compatible-mode/v1";
  const model = process.env.LLM_MODEL ?? "qwen-plus";

  const upstream = await fetch(baseUrl + "/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
    },
    body: JSON.stringify({
      model,
      stream: true,
      messages: [{ role: "system", content: advisor.systemPrompt }, ...history],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    return Response.json(
      { error: "上游模型调用失败", status: upstream.status, detail: detail.slice(0, 500) },
      { status: 502 }
    );
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}