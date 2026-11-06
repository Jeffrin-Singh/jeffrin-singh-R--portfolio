const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

// Tried in order; falls through on errors or a slow model (per-call timeout).
const MODELS = ["gemini-3.5-flash-lite", "gemini-flash-lite-latest", "gemini-flash-latest"];
const MODEL_TIMEOUT_MS = 20000;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the assistant on Jeffrin Singh R's portfolio website. Answer visitors' questions about Jeffrin's experience, skills and projects, speaking about Jeffrin in the third person. Be friendly, professional and concise (2-5 sentences unless more detail is asked for). If something is not covered below, say you don't know and suggest emailing Jeffrin. Do not invent facts.

ABOUT
Jeffrin Singh R is an Applied AI Engineer and full stack developer based in Bengaluru, India. Current focus: Python Document AI and OCR (invoice data extraction, GSTIN and PAN identification, OCR benchmarking). Earlier work: real-time computer vision pipelines, including number-plate tracking and face recognition.

EXPERIENCE
- Exalca, Bengaluru: Python Trainee Developer (Sep 2026 - present). Document AI and OCR: invoice extraction, GSTIN/PAN identification, OCR benchmarking.
- Invendoi AI Solutions: Applied AI Engineer (Feb - Apr 2026). AI systems and ML pipelines.
- Silvia Softwares: Software Engineer Intern (Jun - Jul 2025). Real-time computer vision, number-plate tracking, face recognition.

HIGHLIGHTS
~20 FPS real-time inference on 720p live streams; ~30% lower per-frame latency after optimisation.

SKILLS
Frontend: HTML, CSS, JavaScript, React, WebGL.
Backend: Python, FastAPI, Flask, Django.
AI/ML: Document AI, OCR, computer vision, OpenCV, ONNX.
Databases: PostgreSQL.
DevOps: Docker, Git, Vercel.

CONTACT
Email: jeffrinsingh854@gmail.com
GitHub: https://github.com/Jeffrin-Singh
LinkedIn: https://www.linkedin.com/in/jeffrin-singh-r-6721792a3/`;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  if (!GEMINI_API_KEY) return json({ error: "API key not configured" }, 500);

  let message: unknown;
  try {
    ({ message } = await req.json());
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  if (typeof message !== "string" || !message.trim()) {
    return json({ error: "Message is required" }, 400);
  }

  const payload = JSON.stringify({
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ role: "user", parts: [{ text: message.slice(0, 1000) }] }],
    generationConfig: { maxOutputTokens: 500, temperature: 0.7 },
  });

  let lastError = "";
  for (const model of MODELS) {
    let res: Response;
    try {
      res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
          body: payload,
          signal: AbortSignal.timeout(MODEL_TIMEOUT_MS),
        },
      );
    } catch (err) {
      lastError = `${model}: ${err}`;
      console.error("Gemini fetch failed", lastError);
      continue;
    }

    if (res.ok) {
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text ?? "")
        .join("")
        .trim();
      return json({ response: text || "Sorry, I could not generate a response." });
    }

    lastError = `${model}: ${res.status} ${await res.text()}`;
    console.error("Gemini error", lastError);
    if (![404, 429, 500, 503, 504].includes(res.status)) break;
  }

  return json({ error: "The assistant is busy right now. Please try again shortly." }, 502);
});
