import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/backend.axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // const emailData=form.email
  // console.log(emailData)
  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post(
        "/auth/register",
        {
          admin_user_name: form.name,
          admin_email: form.email,
          admin_password: form.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("Registration Success:", res.data);

        alert(`Welcome, ${form.name}! Your account has been created.`);

        setForm({ name: "", email: "", password: "" });

        navigate("/otpverify", { state: { email: form.email } }); // optional
      })
      .catch((err) => {
        console.error("Registration Error:", err.response?.data || err.message);
        alert("Registration failed. Please check your details.");
      });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-200/60 via-purple-200/50 to-pink-200/60 backdrop-blur-lg relative overflow-hidden">
      <motion.div
        className="absolute w-[550px] h-[550px] bg-purple-300/40 rounded-full blur-3xl top-[-120px] left-[-100px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-[450px] h-[450px] bg-blue-300/30 rounded-full blur-3xl bottom-[80px] right-[80px]"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 rounded-xl bg-white/75 shadow-lg backdrop-blur-md"
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-purple-600">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 focus:ring focus:ring-purple-300 outline-none"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
              placeholder="example@mail.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 focus:ring focus:ring-green-300 outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 p-3 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-700">
          Already have an account?{" "}
          <button
            onClick={() => navigate(`/login`)}
            className="text-purple-600 hover:underline"
          >
            Login
          </button>
        </p>
      </motion.div>
    </div>
  );
}
