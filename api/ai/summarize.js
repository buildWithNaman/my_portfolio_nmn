export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text is missing" });
    }

    const GROQ_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_KEY) {
      return res.status(500).json({ error: "Missing GROQ_API_KEY" });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `Summarize the following in 2 lines:\n\n${text}`
          }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();

    const summary = data?.choices?.[0]?.message?.content;

    if (!summary) {
      console.error("Groq API error:", data);
      return res.status(500).json({ summary: "Unable to generate summary. Try again." });
    }

    return res.status(200).json({ summary });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ summary: "Unable to generate summary. Try again." });
  }
}
