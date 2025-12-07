import { motion } from 'framer-motion'

export default function Projects({ projects }) {
  return (
    <section>
      <h3 className="text-xl font-semibold">
        Projects
      </h3>

      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        {projects.map((p, idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="
              p-4 rounded-lg shadow-sm
              bg-white dark:bg-gray-900/80 
              border border-gray-200/50 dark:border-cyan-500/10
              transition-all duration-300
              hover:shadow-lg hover:scale-[1.01]
              dark:hover:border-cyan-400/40
            "
          >
            <h4 className="font-semibold 
                           text-gray-900 dark:text-cyan-300">
              {p.title}
            </h4>

            <p className="mt-2 
                          text-gray-600 dark:text-gray-300">
              {p.description}
            </p>

            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="
                  mt-3 inline-block text-sm underline 
                  text-indigo-600 dark:text-cyan-400
                  hover:text-indigo-800 dark:hover:text-cyan-300
                "
              >
                View →
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  )
}
