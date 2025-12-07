import { motion } from "framer-motion";

export default function ThemeSwitcher({ theme, toggleTheme }) {
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={toggleTheme}
      className="text-xl p-2 rounded-full bg-gray-200 dark:bg-gray-700 
                 transition-colors duration-300"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </motion.button>
  );
}
