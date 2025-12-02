import React from "react";
import { motion } from "framer-motion";

export default function AiSummary({ summary, loading }) {
  if (!summary && !loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed bottom-20 right-6 
                 w-80 p-4 rounded-2xl shadow-2xl 
                 bg-white/80 backdrop-blur-xl 
                 border border-gray-200 z-50"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        ✨ AI Summary
      </h3>

      {loading ? (
        <p className="text-gray-600 italic">Generating…</p>
      ) : (
        <p className="text-gray-700 whitespace-pre-line">
          {summary}
        </p>
      )}
    </motion.div>
  );
}
