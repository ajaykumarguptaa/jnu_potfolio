import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/sendmail`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  }
);

      const data = await response.json();

      if (data.success) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: ""
        });
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-sky-100 flex items-center justify-center"
    >
      <motion.div
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-center text-3xl font-semibold mb-6">
          Contact Us
        </h2>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="mb-1">Name</label>
          <input
            className="p-2 mb-4 border bg-white border-gray-400 rounded"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            className="p-2 mb-4 border bg-white border-gray-400 rounded"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Message</label>
          <textarea
            className="p-2 mb-4 border bg-white border-gray-400 rounded"
            name="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}