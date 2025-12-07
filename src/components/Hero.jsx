import { motion } from "framer-motion";

export default function Hero({ resume }) {
  return (
    <section className="grid md:grid-cols-2 gap-10 items-center">
      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col"
      >
        <h2
          className="
          text-3xl md:text-4xl font-extrabold 
          text-gray-900 
          dark:text-cyan-300
          dark:drop-shadow-[0_0_15px_rgba(0,255,255,0.25)]
        "
        >
          Hi — I'm {resume.name}
        </h2>

        <p
          className="
          mt-4 
          text-gray-700 
          dark:text-gray-300
          max-w-lg leading-relaxed
        "
        >
          {resume.summary}
        </p>

        {/* Desktop CV Button */}
        <div className="mt-6 flex justify-center md:justify-start hidden md:flex">
          <a
            href={resume.resume_pdf}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="
    group relative overflow-hidden
    px-6 py-3 
    rounded-full 
    text-white text-sm font-semibold
    bg-gradient-to-r from-indigo-500 to-purple-600
    shadow-lg 
    transition-all duration-300 
    inline-flex items-center gap-2
    active:scale-95
    focus:ring-2 focus:ring-purple-400 focus:ring-offset-2

    /* 🟡 Light mode hover effect restored */
    hover:brightness-110 hover:shadow-2xl

    /* 🌙 Dark Mode — No gradient, cyber neon only */
    dark:bg-black dark:text-cyan-300 
    dark:border dark:border-cyan-400/50
    dark:shadow-[0_0_20px_rgba(0,255,255,0.4)]
    dark:hover:shadow-[0_0_35px_rgba(0,255,255,0.6)]
  "
          >
            <span
              className="absolute inset-0 bg-white/20 group-hover:translate-x-[200%] transition-transform duration-700 skew-x-12
                   dark:hidden"
            />
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              📄
            </span>
            Download CV
          </a>
        </div>
      </motion.div>

      {/* RIGHT SIDE — AVATAR BOX */}
      <motion.div
        initial={{ scale: 0.97 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full flex justify-center md:justify-end"
      >
        <motion.div
          whileHover={{ scale: 1.07 }}
          transition={{ type: "spring", stiffness: 220 }}
          className="
            w-48 h-48 md:w-56 md:h-56 rounded-2xl flex items-center justify-center
            text-5xl font-bold

            /* Light Mode */
            bg-gradient-to-br from-indigo-300 to-pink-300 text-white shadow-lg

            /* Dark Mode Neon */
            dark:bg-black/70 dark:border dark:border-cyan-400/40
            dark:text-cyan-300 
            dark:shadow-[0_0_40px_rgba(0,255,255,0.4)]
            dark:hover:shadow-[0_0_55px_rgba(255,0,255,0.4)]
            dark:backdrop-blur-xl
          "
        >
          {resume.name.charAt(0)}
        </motion.div>
      </motion.div>
    </section>
  );
}
