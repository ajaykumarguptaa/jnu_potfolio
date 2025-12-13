import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../../api/backend.axios";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const flash = (m, isError = false) => {
    isError ? setErr(m) : setMsg(m);
    setTimeout(() => {
      setMsg(null);
      setErr(null);
    }, 3000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // adjust URL according to your backend
      const { data } = await api.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      flash(data.message || "Signup successful!");

      setForm({ name: "", email: "", password: "" });
      navigate("/"); // go back to login
    } catch (x) {
      flash(x.response?.data?.message || "Signup failed", true);
    }
  };

  const Input = ({ label, ...props }) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-700">{label}</label>
      <input
        {...props}
        className="border px-3 py-2 rounded-md focus:ring focus:ring-indigo-300 outline-none"
      />
    </div>
  );

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-purple-600">
          Create an Account
        </h2>

        <Input
          label="Full Name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {msg && <p className="text-green-600 text-sm">{msg}</p>}
        {err && <p className="text-red-600 text-sm">{err}</p>}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/" className="text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
