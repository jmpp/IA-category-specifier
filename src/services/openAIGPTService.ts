export async function classifyWithGPT(prompt: string) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const apiUrl =
    import.meta.env.VITE_OPENAI_API_BASE_URL ||
    "https://api.openai.com/v1/chat/completions";

  if (!apiKey) throw new Error("OPENAI_API_KEY manquante");

  const body = {
    model: "gpt-4.1",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  };

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Erreur OpenAI: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Réponse vide de ChatGPT");

  // Extraction JSON robuste
  let json;
  try {
    const match = content.match(/\{[\s\S]*\}/);
    json = match ? JSON.parse(match[0]) : JSON.parse(content);
  } catch {
    throw new Error("Impossible de parser la réponse JSON de ChatGPT");
  }
  return json;
}
