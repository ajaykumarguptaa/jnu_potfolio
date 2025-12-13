import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/backend.axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const flash = (m, e = false) => {
    e ? setErr(m) : setMsg(m);
    setTimeout(() => { setMsg(null); setErr(null); }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { admin_email: email, admin_password: password },{withCredentials:true});
      flash(data.message);
      navigate("/otpverify", { state: { email } });
    } catch (x) {
      flash(x.response?.data?.error || "Login failed", true);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm space-y-4">

        <h2 className="text-xl font-semibold text-center text-indigo-600">Admin Login</h2>

        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input className="border px-3 py-2 rounded-md" type="email"
                 value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="flex flex-col gap-1">
          <label>Password</label>
          <input className="border px-3 py-2 rounded-md" type="password"
                 value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {msg && <p className="text-green-600 text-sm">{msg}</p>}
        {err && <p className="text-red-600 text-sm">{err}</p>}

        <button className="w-full bg-indigo-600 text-white p-2 rounded-md">Login</button>

        <button
          type="button"
          className="text-indigo-600 text-sm underline"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </button>
      </form>
    </div>
  );
}
