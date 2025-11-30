// File: api/ai/summarize.js

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" })
    }

    const { text } = req.body
    if (!text) {
      return res.status(400).json({ error: "Missing text field" })
    }

    const OPENAI_KEY = process.env.OPENAI_API_KEY
    if (!OPENAI_KEY) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY in server" })
    }

    // Call OpenAI
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
            content: `Summarize this resume in 2 professional sentences:\n\n${text}`
          }
        ],
        max_tokens: 120
      })
    })

    const data = await response.json()

    const summary =
      data?.choices?.[0]?.message?.content ||
      "Unable to generate summary. Try again."

    return res.status(200).json({ summary })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Server error", details: err.message })
  }
}