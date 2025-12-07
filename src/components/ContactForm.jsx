import React, { useRef, useState } from "react";
import SuccessPopup from "./SuccessPopup";

export default function ContactForm({ resume }) {
  const formRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/contact/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (data.success) {
      setName("");
      setEmail("");
      setMessage("");
      setShowPopup(true);
    } else {
      alert("Failed to send message.");
    }
  };

  return (
    <section id="contact" className="mt-10">
      <h3 className="text-xl font-semibold">
        Contact Me
      </h3>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-4 max-w-lg space-y-4"
      >
        {/* INPUT STYLES */}
        <input
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full p-3 rounded-lg bg-white dark:bg-gray-900/70
            border border-gray-300 dark:border-cyan-500/20
            focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400
            text-gray-900 dark:text-gray-100
            transition-all outline-none
          "
        />

        <input
          required
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full p-3 rounded-lg bg-white dark:bg-gray-900/70
            border border-gray-300 dark:border-cyan-500/20
            focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400
            text-gray-900 dark:text-gray-100
            transition-all outline-none
          "
        />

        <textarea
          required
          placeholder="Message"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="
            w-full p-3 rounded-lg
            bg-white dark:bg-gray-900/70
            border border-gray-300 dark:border-cyan-500/20
            focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-400
            text-gray-900 dark:text-gray-100
            transition-all outline-none
          "
        />

        {/* BUTTON GROUP */}
        <div className="flex gap-3 flex-wrap">
          <button
            type="submit"
            className="
              px-5 py-3 rounded-lg font-medium text-white 
              bg-indigo-600 hover:bg-indigo-700
              dark:bg-cyan-500 dark:hover:bg-cyan-400
              shadow-md dark:shadow-cyan-500/20
              transition-all active:scale-95
            "
          >
            Send ✉️
          </button>

          <a
            className="
              px-5 py-3 rounded-lg font-medium
              bg-gray-200 text-gray-900
              hover:bg-gray-300 transition
              dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700
              border border-gray-300 dark:border-gray-700
              active:scale-95
            "
            href={`tel:${resume.phone}`}
          >
            Call 📞
          </a>

          <a
            className="
              px-5 py-3 rounded-lg font-medium
              bg-gray-200 text-gray-900
              hover:bg-gray-300 transition
              dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700
              border border-gray-300 dark:border-gray-700
              active:scale-95
            "
            href={`mailto:${resume.email}?subject=Contact from Portfolio`}
          >
            Email 📧
          </a>
        </div>
      </form>

      {/* SUCCESS POPUP */}
      {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} />}
    </section>
  );
}
