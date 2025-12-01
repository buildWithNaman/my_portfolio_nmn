import { motion } from "framer-motion";

export default function SuccessPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-2xl shadow-2xl text-center w-72"
      >
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-lg font-bold text-gray-800">Message Sent!</h2>
        <p className="text-gray-600 mt-1">
          Thanks for reaching out. I’ll get back to you soon.
        </p>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          OK
        </button>
      </motion.div>
    </div>
  );
}