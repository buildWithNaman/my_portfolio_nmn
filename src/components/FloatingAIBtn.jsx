import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function FloatingAIBtn({
  onGenerate,
  onGenerateProject,
  projects = [],
  resumePdf,
  onCloseSummary,
}) {
  const [open, setOpen] = useState(false);
  const [selectProject, setSelectProject] = useState(false);
  const openMenu = () => {
    if (onCloseSummary) onCloseSummary();
    setSelectProject(false);
    setOpen(true);
  };
  const closeMenu = () => {
    setOpen(false);
    setSelectProject(false);
  };
  return (
    <>
      {" "}
      {/* DESKTOP Floating Button */}{" "}
      <motion.button
        onClick={openMenu}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className=" fixed bottom-6 right-6 z-50 hidden md:flex items-center justify-center text-white text-xl font-bold px-5 py-4 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 hover:scale-110 transition-all shadow-lg dark:shadow-[0_0_15px_cyan] "
      >
        {" "}
        ✨{" "}
      </motion.button>
      {/* MOBILE Floating Button */}{" "}
      {!open && (
        <motion.button
          onClick={openMenu}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className=" fixed bottom-6 right-6 z-50 md:hidden text-white text-xl p-4 rounded-full bg-indigo-600 hover:scale-105 transition-all shadow-lg dark:shadow-[0_0_15px_cyan] "
        >
          {" "}
          ✨{" "}
        </motion.button>
      )}{" "}
      {/* Fullscreen backdrop */}{" "}
      <AnimatePresence>
        {" "}
        {open && (
          <motion.div
            onClick={closeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" fixed inset-0 bg-black/40 backdrop-blur-sm z-40 pointer-events-auto "
          />
        )}{" "}
      </AnimatePresence>{" "}
      {/* DESKTOP Popover Menu */}{" "}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="
        hidden md:flex flex-col gap-3
        fixed bottom-[100px] right-[30px]
        w-80 max-h-[350px] overflow-y-auto
        p-5 rounded-2xl z-[80]

        /* Light Mode */
        bg-white/85 backdrop-blur-xl border border-gray-300 shadow-[0_4px_18px_rgba(0,0,0,0.1)]
        text-gray-900

        /* Dark Mode Neon */
        dark:bg-black/70 dark:text-cyan-300
        dark:border-cyan-400/50 dark:shadow-[0_0_25px_cyan]
      "
          >
            {!selectProject ? (
              <>
                <button
                  className="
              w-full py-3 rounded-xl font-medium transition
              bg-indigo-600 text-white hover:bg-indigo-700
              dark:bg-cyan-600 dark:hover:bg-cyan-400 dark:text-black
              shadow-md hover:shadow-lg
            "
                  onClick={() => {
                    if (onCloseSummary) onCloseSummary();
                    closeMenu();
                    onGenerate();
                  }}
                >
                  🧠 Generate AI Summary
                </button>

                <button
                  className="
              w-full py-3 rounded-xl font-medium transition
              bg-purple-600 text-white hover:bg-purple-700
              dark:bg-cyan-500/70 dark:hover:bg-cyan-400 dark:text-black
              shadow-md hover:shadow-lg
            "
                  onClick={() => setSelectProject(true)}
                >
                  📌 Select a Project
                </button>
              </>
            ) : (
              <>
                {projects.map((p, idx) => (
                  <button
                    key={idx}
                    className="
                block w-full text-left py-3 px-3 rounded-xl
                bg-gray-100 hover:bg-gray-200
                dark:bg-black dark:hover:bg-gray-900
                border border-gray-200 dark:border-cyan-500/40
                transition font-medium
              "
                    onClick={() => {
                      if (onCloseSummary) onCloseSummary();
                      closeMenu();
                      onGenerateProject(p);
                    }}
                  >
                    {p.title}
                  </button>
                ))}
                <button
                  className="
              w-full py-3 mt-1 rounded-xl text-sm font-semibold
              bg-gray-800 text-white hover:bg-black
              dark:bg-cyan-600 dark:text-black dark:hover:bg-cyan-500
              transition
            "
                  onClick={() => setSelectProject(false)}
                >
                  ◀ Back
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* MOBILE Bottom Sheet */}{" "}
      <AnimatePresence>
        {" "}
        {open && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.35 }}
            className=" md:hidden fixed bottom-0 left-0 w-full p-5 rounded-t-3xl z-[60] pointer-events-auto bg-white dark:bg-black/90 text-gray-900 dark:text-cyan-300 border-t border-gray-300 dark:border-cyan-500/40 dark:shadow-[0_-3px_18px_cyan] "
            onClick={(e) => e.stopPropagation()}
          >
            {" "}
            {!selectProject ? (
              <>
                {" "}
                <button
                  onClick={() => {
                    if (onCloseSummary) onCloseSummary();
                    closeMenu();
                    onGenerate();
                  }}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg mb-3 active:scale-[0.97] transition"
                >
                  {" "}
                  🧠 Generate AI Summary{" "}
                </button>{" "}
                <button
                  onClick={() => setSelectProject(true)}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg mb-3 active:scale-[0.97] transition"
                >
                  {" "}
                  📌 Select a Project{" "}
                </button>{" "}
                <a
                  href={resumePdf}
                  target="_blank"
                  onClick={closeMenu}
                  className="block w-full text-center bg-gray-900 text-white py-3 rounded-lg active:scale-[0.97] transition"
                >
                  {" "}
                  📄 Download CV{" "}
                </a>{" "}
              </>
            ) : (
              <>
                {" "}
                {projects.map((p, idx) => (
                  <button
                    key={idx}
                    className="block w-full text-left p-3 mb-2 bg-gray-100 dark:bg-black/70 border border-gray-200 dark:border-cyan-500/40 rounded-lg"
                    onClick={() => {
                      if (onCloseSummary) onCloseSummary();
                      closeMenu();
                      onGenerateProject(p);
                    }}
                  >
                    {" "}
                    {p.title}{" "}
                  </button>
                ))}{" "}
                <button
                  className="w-full py-3 mt-3 rounded-lg bg-black text-white dark:bg-cyan-500 dark:text-black"
                  onClick={() => setSelectProject(false)}
                >
                  {" "}
                  ◀ Back{" "}
                </button>{" "}
              </>
            )}{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>{" "}
    </>
  );
}
