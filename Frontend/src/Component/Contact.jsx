import React, { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_vfe7lvr",   
      "template_9re4ngi",   
      formData,
      "au-RyA8yVRmdSjHmL"     
    ).then(
      () => {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      },
      (error) => {
        console.error("Error:", error);
        alert("Failed to send message. Please try again.");
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    className="h-156 bg-gradient-to-r from-blue-100 via-purple-50 to-sky-100">
      <motion.div
        className="max-w-125 mx-[30%] mt-[4%] p-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-center text-3xl mb-5">Contact Us</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="mb-1.25">Name</label>
          <input
            className="p-2 mb-4 border bg-white border-gray-600 rounded-[5px]"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            className="p-2 mb-4 border bg-white border-gray-600 rounded-[5px]"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Message</label>
          <textarea
            className="p-2 mb-4 border bg-white border-gray-600 rounded-[5px]"
            name="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
          ></textarea>

          <button
            className="p-2.5 bg-blue-600 text-white border-none rounded-[5px] cursor-pointer text-[16px] hover:bg-blue-600"
            type="submit"
          >
            Submit
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
