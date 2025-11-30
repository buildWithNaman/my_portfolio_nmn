import React from 'react'
import { motion } from 'framer-motion'

export default function Projects({projects}){
  return (
    <section>
      <h3 className="text-xl font-semibold">Projects</h3>
      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        {projects.map((p, idx) => (
          <motion.article key={idx} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay: idx*0.05}} className="p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold">{p.title}</h4>
            <p className="mt-2 text-gray-600">{p.description}</p>
            {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm underline">View</a>}
          </motion.article>
        ))}
      </div>
    </section>
  )
}
