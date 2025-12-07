import React from 'react'
import { motion } from 'framer-motion'

export default function Hero({ resume }) {
  return (
    <section className="grid md:grid-cols-2 gap-6 items-center">

      {/* Left Column */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Hi — I'm {resume.name}
        </h2>
        <p className="mt-4 text-gray-700">{resume.summary}</p>

        {/* Download CV button */}
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
              animate-fadeIn
            "
          >
            <span className="absolute inset-0 bg-white/20 group-hover:translate-x-[200%] transition-transform duration-700 skew-x-12" />
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              📄
            </span>
            Download CV
          </a>
        </div>
      </motion.div>

      {/* Right Column */}
      <motion.div
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        className="w-full flex justify-center md:justify-end"
      >
        <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-indigo-300 to-pink-300 flex items-center justify-center text-white text-4xl font-bold">
          N
        </div>
      </motion.div>

    </section>
  )
}
