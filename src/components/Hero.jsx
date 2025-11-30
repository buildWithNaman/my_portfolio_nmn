import React from 'react'
import { motion } from 'framer-motion'

export default function Hero({resume}) {
  return (
    <section className="grid md:grid-cols-2 gap-6 items-center">
      <motion.div initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
        <h2 className="text-3xl md:text-4xl font-extrabold">Hi — I'm {resume.name}</h2>
        <p className="mt-4 text-gray-700">{resume.summary}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="px-4 py-2 rounded bg-primary text-white" href={`mailto:${resume.email}`}>Email</a>
          <a className="px-4 py-2 rounded border" href={resume.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="px-4 py-2 rounded border" href={resume.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </motion.div>

      <motion.div initial={{scale:0.98}} animate={{scale:1}} className="w-full md:w-80 mx-auto">
        <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-indigo-300 to-pink-300 flex items-center justify-center text-white text-4xl font-bold">
          N
        </div>
      </motion.div>
    </section>
  )
}
