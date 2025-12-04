import React from "react";
import { motion } from "framer-motion";

export default function AiSummary({ summary, loading, onClose }) {
  if (!summary && !loading) return null;

  return (
    <>
      {/* Background overlay (click to close) */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/5 backdrop-blur-[3px] z-40"
      />

      {/* Summary box */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-20 right-6 w-80 p-4 
                   rounded-2xl shadow-2xl 
                   bg-white/80 backdrop-blur-xl 
                   border border-gray-200 
                   z-50"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2">✨ AI Summary</h3>

        {loading ? (
          <p className="text-gray-600 italic">Generating…</p>
        ) : (
          <p className="text-gray-700 whitespace-pre-line">{summary}</p>
        )}
      </motion.div>
    </>
  );
}