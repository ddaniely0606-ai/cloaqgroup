import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const REPO = "ddaniely0606-ai/cloaqgroup";
const BRANCH = "master";

const SYSTEM_PROMPT = `You are the Mythos Agency development agent — Claude Code running remotely via Telegram.

You are talking to Daniel, the founder of Mythos Agency (a premium Hebrew-first marketing agency). He controls this entire project and can tell you to make any changes.

PROJECT CONTEXT:
- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind v4, GSAP 3, Three.js (vanilla), lucide-react
- Design: Emerald green (#059669, #34d399) + black (#050508, #0d0d18) + white text + glassmorphism
- Direction: RTL globally. English islands use .brand-en class
- Fonts: var(--font-syne) for English display, var(--font-heebo) for Hebrew body
- GitHub repo: ${REPO} (master branch)
- Live: cloaqgroup.vercel.app

SECTIONS (page order):
HeroAgent → StatsAgent → ServicesAgent → ProcessAgent → PortfolioAgent → TeamAgent → TestimonialsAgent → ManifestoAgent → FAQAgent → CTAAgent → ContactAgent → Footer

CAPABILITIES:
- You can read any file in the repo using read_file
- You can write/update files and commit using write_file
- You can deploy to Vercel production using deploy
- You can list directory contents using list_files

RULES:
- Be concise — Telegram messages should be short and direct
- When you make a code change, always commit and offer to deploy
- Hebrew copy: keep it authentic Israeli, not translated English
- No purple colors — emerald only
- Always respond in the same language Daniel writes in (Hebrew or English)`;

const tools: Anthropic.Tool[] = [
  {
    name: "read_file",
    description: "Read the contents of a file from the GitHub repository",
    input_schema: {
      type: "object" as const,
      properties: {
        path: { type: "string", description: "File path relative to repo root, e.g. components/agents/HeroAgent.tsx" },
      },
      required: ["path"],
    },
  },
  {
    name: "write_file",
    description: "Write/update a file in the GitHub repository and commit the change",
    input_schema: {
      type: "object" as const,
      properties: {
        path: { type: "string", description: "File path relative to repo root" },
        content: { type: "string", description: "Full file content to write" },
        message: { type: "string", description: "Git commit message" },
      },
      required: ["path", "content", "message"],
    },
  },
  {
    name: "list_files",
    description: "List files and directories in a given path",
    input_schema: {
      type: "object" as const,
      properties: {
        path: { type: "string", description: "Directory path, e.g. components/agents or app" },
      },
      required: ["path"],
    },
  },
  {
    name: "deploy",
    description: "Trigger a Vercel production deployment",
    input_schema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
];

async function readFile(path: string): Promise<string> {
  const url = `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!res.ok) return `Error: could not read ${path} (${res.status})`;
  const data = await res.json();
  return Buffer.from(data.content, "base64").toString("utf-8");
}

async function writeFile(path: string, content: string, message: string): Promise<string> {
  const getUrl = `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`;
  const getRes = await fetch(getUrl, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  let sha: string | undefined;
  if (getRes.ok) {
    const data = await getRes.json();
    sha = data.sha;
  }

  const body: Record<string, string> = {
    message,
    content: Buffer.from(content).toString("base64"),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  const putRes = await fetch(getUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!putRes.ok) {
    const err = await putRes.text();
    return `Error committing ${path}: ${err}`;
  }
  return `✅ Committed ${path}: "${message}"`;
}

async function listFiles(path: string): Promise<string> {
  const url = `https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!res.ok) return `Error listing ${path}`;
  const data = await res.json();
  return (data as Array<{ name: string; type: string }>)
    .map((f) => `${f.type === "dir" ? "📁" : "📄"} ${f.name}`)
    .join("\n");
}

async function deploy(): Promise<string> {
  const token = process.env.VERCEL_TOKEN;
  if (!token) return "Error: VERCEL_TOKEN not set";

  const res = await fetch("https://api.vercel.com/v13/deployments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "cloaqgroup",
      gitSource: { type: "github", repoId: REPO, ref: BRANCH },
      target: "production",
    }),
  });
  if (!res.ok) return `Deploy triggered (check Vercel dashboard)`;
  return "🚀 Deployment triggered → cloaqgroup.vercel.app";
}

async function runTool(name: string, input: Record<string, string>): Promise<string> {
  switch (name) {
    case "read_file": return readFile(input.path);
    case "write_file": return writeFile(input.path, input.content, input.message);
    case "list_files": return listFiles(input.path);
    case "deploy": return deploy();
    default: return "Unknown tool";
  }
}

async function sendTelegram(chatId: number, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN!;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });
}

async function runAgent(userMessage: string): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: userMessage },
  ];

  for (let i = 0; i < 8; i++) {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      tools,
      messages,
    });

    if (response.stop_reason === "end_turn") {
      const text = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === "text")
        .map((b) => b.text)
        .join("");
      return text || "Done.";
    }

    if (response.stop_reason === "tool_use") {
      const toolUses = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
      );

      messages.push({ role: "assistant", content: response.content });

      const toolResults: Anthropic.ToolResultBlockParam[] = await Promise.all(
        toolUses.map(async (tu) => ({
          type: "tool_result" as const,
          tool_use_id: tu.id,
          content: await runTool(tu.name, tu.input as Record<string, string>),
        }))
      );

      messages.push({ role: "user", content: toolResults });
      continue;
    }

    break;
  }

  return "Agent finished.";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message;
    if (!message) return NextResponse.json({ ok: true });

    const chatId: number = message.chat.id;
    const text: string = message.text || "";

    const allowedId = process.env.TELEGRAM_ALLOWED_CHAT_ID;
    if (allowedId && String(chatId) !== allowedId) {
      await sendTelegram(chatId, "⛔ Unauthorized.");
      return NextResponse.json({ ok: true });
    }

    if (!text.trim()) return NextResponse.json({ ok: true });

    await sendTelegram(chatId, "⚡ Working...");

    const reply = await runAgent(text);

    const chunks = reply.match(/[\s\S]{1,4000}/g) || [reply];
    for (const chunk of chunks) {
      await sendTelegram(chatId, chunk);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json({ ok: true });
  }
}
