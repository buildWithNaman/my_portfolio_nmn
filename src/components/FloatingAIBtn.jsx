import React from "react";
import { motion } from "framer-motion";

export default function FloatingAIBtn({ onClick, loading }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="
        fixed bottom-6 right-6 
        bg-gradient-to-br from-indigo-600 to-purple-600 
        text-white p-4 rounded-full shadow-xl 
        hover:shadow-2xl hover:scale-105 
        transition-all
        z-50
      "
    >
      {loading ? "…" : "✨"}
    </motion.button>
  );
}
