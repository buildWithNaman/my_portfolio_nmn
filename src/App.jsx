import React, { useState } from "react";
import resume from "./data/resume.json";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";
import Skills from "./components/Skills";
import AiSummary from "./components/AiSummary";
import FloatingAIBtn from "./components/FloatingAIBtn";
import axios from "axios";

export default function App() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleAI() {
    setLoading(true);
    setSummary(null);

    try {
      const resp = await axios.post("/api/ai/summarize", {
        text: `${resume.about}\n\nProjects:\n${resume.projects
          .map((p) => p.title + ": " + p.description)
          .join("\n")}`,
      });
      setSummary(resp.data.summary);
    } catch (e) {
      setSummary("Error generating summary.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{resume.name}</h1>
            <p className="text-sm text-gray-500">{resume.title}</p>
          </div>
          <nav className="space-x-4">
            <a href={resume.github} target="_blank" rel="noreferrer" className="text-sm">GitHub</a>
            <a href={resume.linkedin} target="_blank" rel="noreferrer" className="text-sm">LinkedIn</a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 space-y-12">

        <Hero resume={resume} />

        <section>
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="mt-4 text-gray-700">{resume.about}</p>
        </section>

        <Skills skills={resume.skills} />
        <Projects projects={resume.projects} />
        <ContactForm resume={resume} />
      </main>

      {/* Floating Button ALWAYS visible */}
      <FloatingAIBtn 
        onGenerate={handleAI} 
        loading={loading} 
        resumePdf={resume.resume_pdf}
        onResetSummary={() => setSummary(null)}
      />

      {/* Summary Popup */}
      <AiSummary
        summary={summary}
        loading={loading}
        onClose={() => setSummary(null)}
      />

      <footer className="text-center py-8 text-sm text-gray-500">
        © {new Date().getFullYear()} {resume.name}
      </footer>
    </div>
  );
}
