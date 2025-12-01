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

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) {
      return res.status(500).json({ error: "Missing OpenAI key" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Summarize the following in 2 lines:\n\n${text}`
          }
        ],
        max_tokens: 120
      })
    });

    const data = await response.json();

    const summary = data?.choices?.[0]?.message?.content;

    if (!summary) {
      console.error("OpenAI response error:", data);
      return res.status(500).json({ summary: "Unable to generate summary. Try again." });
    }

    return res.status(200).json({ summary });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ summary: "Unable to generate summary. Try again." });
  }
}
