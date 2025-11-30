import React, { useState } from 'react'
import axios from 'axios'

export default function AiSummary({resumeText}){
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState(null)

  async function handleGenerate(){
    setLoading(true)
    setSummary(null)
    try {
      const resp = await axios.post('/api/ai/summarize', { text: resumeText })
      setSummary(resp.data.summary || resp.data.choices?.[0]?.message?.content || JSON.stringify(resp.data))
    } catch (e) {
      setSummary('Error generating summary (no backend configured).')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="text-right">
      <button onClick={handleGenerate} className="px-3 py-1 rounded border text-sm">
        {loading ? 'Generating…' : 'Generate Summary'}
      </button>
      {summary && <div className="mt-2 p-3 bg-white rounded shadow-sm text-sm"><strong>AI Summary:</strong><p className="mt-1">{summary}</p></div>}
    </div>
  )
}
