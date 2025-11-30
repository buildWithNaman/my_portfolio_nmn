import React from 'react'

export default function Skills({skills}){
  return (
    <section>
      <h3 className="text-xl font-semibold">Skills</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((s,i)=>(
          <span key={i} className="px-3 py-1 rounded-full border text-sm">{s}</span>
        ))}
      </div>
    </section>
  )
}
