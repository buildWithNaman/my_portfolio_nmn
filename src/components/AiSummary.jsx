import { motion } from "framer-motion";

export default function AiSummary({ summary, loading, onClose }) {
  if (!summary && !loading) return null;

  return (
    <>
      {/* Background overlay (click to close) */}
      <div
        onClick={onClose}
        className="
          fixed inset-0 
          bg-black/10 backdrop-blur-[3px] 
          dark:bg-black/40 dark:backdrop-blur-[4px] 
          z-40
        "
      />

      {/* Summary box */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.3 }}
        className="
          fixed bottom-20 right-6 w-80 p-4 z-50
          rounded-2xl border shadow-2xl

          /* Light Mode */
          bg-white text-gray-800 border-gray-200

          /* Dark Mode Neon */
          dark:bg-black/70 dark:text-cyan-200 
          dark:border-cyan-400/40 
          dark:shadow-[0_0_28px_rgba(0,255,255,0.25)]
          dark:backdrop-blur-2xl
        "
      >
        <h3 className="
          text-lg font-semibold mb-2 
          text-gray-800 dark:text-cyan-300 
          dark:drop-shadow-[0_0_10px_rgba(0,255,255,0.35)]
        ">
          ✨ AI Summary
        </h3>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-400 italic">Generating…</p>
        ) : (
          <p className="
            text-gray-700 dark:text-gray-200
            whitespace-pre-line leading-relaxed
          ">
            {summary}
          </p>
        )}
      </motion.div>
    </>
  );
}
