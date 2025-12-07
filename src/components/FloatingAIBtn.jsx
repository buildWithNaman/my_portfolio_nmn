import React, { useState } from "react";
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
      {/* Desktop Floating AI Button */}
      {!open && (
        <motion.button
          onClick={onGenerate}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="
            fixed bottom-6 right-6 z-50
            bg-gradient-to-br from-indigo-600 to-purple-600 
            text-white p-4 rounded-full shadow-xl
            hover:shadow-2xl hover:scale-105 transition-all
            hidden md:flex
          "
        >
          {loading ? "…" : "✨"}
        </motion.button>
      )}

      {/* Mobile Floating Menu Trigger */}
      {!open && (
        <motion.button
          onClick={openSheet}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="
            fixed bottom-6 right-6 z-50
            bg-indigo-600 text-white p-4 rounded-full shadow-xl
            hover:shadow-2xl hover:scale-105 transition-all
            md:hidden
          "
        >
          ☰
        </motion.button>
      )}

      {/* Bottom Sheet */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dimmed Background */}
            <motion.div
              onClick={closeSheet}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Action Menu */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                duration: 0.35,
                ease: [0.25, 0.46, 0.45, 0.94], // iOS smooth curve
              }}
              className="fixed bottom-0 left-0 w-full p-5 
                         bg-white rounded-t-2xl shadow-2xl z-50
                         md:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-lg font-semibold text-gray-900 text-center">
                What would you like to do?
              </h4>

              <div className="mt-4 space-y-3">
                <button
                  onClick={() => {
                    closeSheet();
                    onGenerate();
                  }}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium
                             active:scale-[0.97] transition"
                >
                  ✨ Generate Summary
                </button>

                <a
                  href={resumePdf}
                  target="_blank"
                  onClick={closeSheet}
                  className="block w-full text-center bg-gray-900 text-white py-3 rounded-lg font-medium
                             active:scale-[0.97] transition"
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
