import React, { useRef, useState } from 'react'
import emailjs from 'emailjs-com'

export default function ContactForm({resume}){
  const formRef = useRef()
  const [status, setStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      window.location.href = `mailto:${resume.email}?subject=Contact from portfolio`
      setStatus('mailto')
      return
    }

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => setStatus('sent'))
      .catch(() => setStatus('error'))
  }

  return (
    <section id="contact" className="mt-6">
      <h3 className="text-xl font-semibold">Contact</h3>
      <form ref={formRef} onSubmit={handleSubmit} className="mt-3 max-w-lg space-y-3">
        <input name="from_name" required placeholder="Your name" className="w-full p-2 border rounded"/>
        <input name="reply_to" required placeholder="Your email" className="w-full p-2 border rounded"/>
        <textarea name="message" required placeholder="Message" className="w-full p-2 border rounded"/>
        <div className="flex gap-3">
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Send</button>
          <a className="px-4 py-2 rounded border" href={`tel:${resume.phone}`}>Call</a>
          <a className="px-4 py-2 rounded border" href={`mailto:${resume.email}`}>Email</a>
        </div>
      </form>

      {status === 'sending' && <p className="text-sm text-gray-500 mt-2">Sending…</p>}
      {status === 'sent' && <p className="text-sm text-green-600 mt-2">Message sent — thank you!</p>}
      {status === 'error' && <p className="text-sm text-red-600 mt-2">Error sending message.</p>}
      {status === 'mailto' && <p className="text-sm text-gray-500 mt-2">Opened mail client as fallback.</p>}
    </section>
  )
}
