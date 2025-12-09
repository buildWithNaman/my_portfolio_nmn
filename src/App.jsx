import { useState, useEffect } from "react";
import resume from "./data/resume.json";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ContactForm from "./components/ContactForm";
import Skills from "./components/Skills";
import AiSummary from "./components/AiSummary";
import FloatingAIBtn from "./components/FloatingAIBtn";
import ThemeSwitcher from "./components/ThemeSwitcher";
import axios from "axios";

export default function App() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  async function handleAI(type, project) {
    setLoading(true);
    setSummary(null);

    let baseText = "";
    if (type === "resume") {
      baseText = resume.about;
    } else if (type === "project" && project) {
      baseText = `${project.title}: ${project.description}`;
    }

    const prompt = `
  Create a highly polished and refined summary.
  Use strong, confident language.
  Focus on achievements and strengths.
  Avoid generic phrases like “I am passionate” or “I love to”.
  Keep sentences well-structured and engaging.

  Base Details:
  ${baseText}
  `;

    try {
      const resp = await axios.post("/api/ai/summarize", { text: prompt });
      setSummary(resp.data.summary);
    } catch (err) {
      console.error("AI Summary Error:", err);
      setSummary("⚠️ Error generating summary.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen 
      text-gray-900 dark:text-[#e2e8f0]
      bg-white dark:bg-black
      transition-colors duration-500"
    >
      {/* Header */}
      <header
        className="
        bg-white dark:bg-black/60 
        backdrop-blur-md 
        border-b border-gray-200/20 dark:border-cyan-500/20
        shadow-lg transition-all duration-500"
      >
        <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{resume.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {resume.title}
            </p>
          </div>

          <nav className="space-x-4 flex items-center gap-3">
            <a
              href={resume.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm"
            >
              GitHub
            </a>
            <a
              href={resume.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-sm"
            >
              LinkedIn
            </a>

            <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-6 space-y-12">
        <Hero resume={resume} />

        <section>
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            {resume.about}
          </p>
        </section>

        <Skills skills={resume.skills} />
        <Projects projects={resume.projects} />
        <ContactForm resume={resume} />
      </main>

      {/* AI Floating Button */}
      <FloatingAIBtn
        onGenerate={() => handleAI("resume")}
        onGenerateProject={(proj) => handleAI("project", proj)}
        loading={loading}
        resumePdf={resume.resume_pdf}
        projects={resume.projects}
        onCloseSummary={() => setSummary(null)}
      />

      {/* Summary Popup */}
      <AiSummary
        summary={summary}
        loading={loading}
        onClose={() => setSummary(null)}
      />

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} {resume.name}
      </footer>
    </div>
  );
}
