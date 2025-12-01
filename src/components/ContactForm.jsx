import React, { useState } from "react";
import SuccessPopup from "./SuccessPopup";

export default function ContactForm({ resume }) {
  const [showPopup, setShowPopup] = useState(false);

  // Add proper form states
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
      // Clear form
      setName("");
      setEmail("");
      setMessage("");

      // Show popup
      setShowPopup(true);
    } else {
      alert("Failed to send message.");
    }
  };

  return (
    <section id="contact" className="mt-6">
      <h3 className="text-xl font-semibold">Contact</h3>

      <form onSubmit={handleSubmit} className="mt-3 max-w-lg space-y-3">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your name"
          className="w-full p-2 border rounded"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Your email"
          className="w-full p-2 border rounded"
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Message"
          className="w-full p-2 border rounded"
        />

        <div className="flex gap-3">
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
            Send
          </button>

          <a className="px-4 py-2 rounded border" href={`tel:${resume.phone}`}>
            Call
          </a>

          <a className="px-4 py-2 rounded border" href={`mailto:${resume.email}`}>
            Email
          </a>
        </div>
      </form>

      {/* Success Popup */}
      {showPopup && <SuccessPopup onClose={() => setShowPopup(false)} />}
    </section>
  );
}