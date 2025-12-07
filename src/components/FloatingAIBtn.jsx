import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingAIBtn({
  onGenerate,
  onResetSummary,
  loading,
  resumePdf,
}) {
  const [open, setOpen] = useState(false);

  const openSheet = () => {
    onResetSummary();
    setOpen(true);
  };
  const closeSheet = () => setOpen(false);

  return (
    <>
      {/* Desktop AI Button */}
      {!open && (
        <motion.button
          onClick={onGenerate}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="
            fixed bottom-6 right-6 z-50
            p-4 rounded-full shadow-lg transition-all

            /* Light Mode */
            bg-indigo-600 text-white hover:shadow-xl

            /* Dark Mode Neon */
            dark:bg-black dark:text-cyan-300 
            dark:border dark:border-cyan-400/50 
            dark:shadow-[0_0_15px_rgba(0,255,255,0.3)]
            dark:hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]

            hidden md:flex
          "
        >
          {loading ? "…" : "✨"}
        </motion.button>
      )}

      {/* Mobile Floating Trigger */}
      {!open && (
        <motion.button
          onClick={openSheet}
          className="
            fixed bottom-6 right-6 z-50
            p-4 rounded-full shadow-lg
            transition-all md:hidden

            bg-indigo-600 text-white 
            dark:bg-black dark:text-cyan-300
            dark:border dark:border-cyan-400/50
            dark:shadow-[0_0_15px_rgba(0,255,255,0.3)]
          "
        >
          ✨
        </motion.button>
      )}

      {/* Bottom Sheet */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              onClick={closeSheet}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed inset-0 z-40 md:hidden
                bg-black/20 backdrop-blur-sm
                dark:bg-black/50 dark:backdrop-blur
              "
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3 }}
              className="
                fixed bottom-0 left-0 w-full z-50 md:hidden
                p-6 rounded-t-2xl shadow-xl

                /* LIGHT MODE */
                bg-white text-gray-900

                /* DARK MODE NEON */
                dark:bg-black/90 dark:text-cyan-200
                dark:border-t dark:border-cyan-400/40
                dark:shadow-[0_-5px_20px_rgba(0,255,255,0.3)]
                dark:backdrop-blur-xl
              "
            >
              <h4 className="text-center font-bold text-lg">
                Actions
              </h4>

              <div className="mt-4 space-y-3">
                <button
                  onClick={() => {
                    closeSheet();
                    onGenerate();
                  }}
                  className="
                    w-full py-3 rounded-lg font-medium

                    /* Light */
                    bg-indigo-600 text-white

                    /* Dark */
                    dark:bg-black dark:text-cyan-300
                    dark:border dark:border-cyan-400/40
                    dark:shadow-[0_0_15px_rgba(0,255,255,0.25)]
                  "
                >
                  ✨ Generate Summary
                </button>

                <a
                  href={resumePdf}
                  target="_blank"
                  onClick={closeSheet}
                  className="
                    block w-full text-center py-3 rounded-lg font-medium

                    /* Light */
                    bg-gray-900 text-white

                    /* Dark */
                    dark:bg-black dark:text-cyan-300
                    dark:border dark:border-cyan-400/40
                  "
                >
                  📄 Download CV
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
