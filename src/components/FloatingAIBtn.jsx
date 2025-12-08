import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function FloatingAIBtn({
  onGenerate,
  onGenerateAbout,
  onGenerateProject,
  projects = [],
  loading,
  resumePdf,
}) {
  const [open, setOpen] = useState(false);
  const [selectProject, setSelectProject] = useState(false);
  const openMenu = () => {
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
      {!open && (
        <motion.button
          onClick={openMenu}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className=" fixed bottom-6 right-6 z-50 hidden md:flex items-center justify-center text-white text-xl font-bold px-5 py-4 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 hover:scale-110 transition-all shadow-lg dark:shadow-[0_0_15px_cyan] "
        >
          {" "}
          ✨{" "}
        </motion.button>
      )}{" "}
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
        {" "}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="
    hidden md:block
    fixed bottom-[90px] right-[90px] 
    w-72 p-5 rounded-xl
    z-[80] pointer-events-auto
    bg-white dark:bg-black/90
    text-gray-900 dark:text-cyan-300
    border border-gray-300 dark:border-cyan-500/40
    shadow-xl dark:shadow-[0_0_18px_cyan]
  "
          >
            {" "}
            {!selectProject ? (
              <>
                {" "}
                <button
                  className="w-full py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 dark:hover:bg-cyan-500 transition mb-3"
                  onClick={() => {
                    closeMenu();
                    onGenerate();
                  }}
                >
                  {" "}
                  🧠 Generate AI Summary{" "}
                </button>{" "}
                <button
                  className="w-full py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 dark:hover:bg-cyan-400 transition mb-3"
                  onClick={() => setSelectProject(true)}
                >
                  {" "}
                  📌 Select a Project{" "}
                </button>{" "}
              </>
            ) : (
              <>
                {" "}
                {projects.map((p, idx) => (
                  <button
                    key={idx}
                    className="block w-full text-left p-3 mb-2 bg-gray-100 hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-900 rounded-lg border border-gray-300 dark:border-cyan-400 dark:text-cyan-300"
                    onClick={() => {
                      closeMenu();
                      onGenerateProject(p);
                    }}
                  >
                    {" "}
                    {p.title}{" "}
                  </button>
                ))}{" "}
                <button
                  className="w-full py-3 text-sm mt-2 bg-black text-white rounded-lg dark:bg-cyan-500 dark:text-black"
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
