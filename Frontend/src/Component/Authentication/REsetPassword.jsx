import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../../api/backend.axios";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [token, setToken] = useState("");
  const [newPass, setNewPass] = useState("");

  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const flash = (m, e = false) => {
    e ? setErr(m) : setMsg(m);
    setTimeout(() => { setMsg(null); setErr(null); }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/reset-password", {
        admin_email: email,
        reset_token: token,
        new_password: newPass,
      });

      flash(data.message);
      navigate("/");
    } catch (x) {
      flash(x.response?.data?.error || "Reset failed", true);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm space-y-4">

        <h2 className="text-xl font-semibold text-center text-indigo-600">Reset Password</h2>

        <p className="text-sm">Email: <b>{email}</b></p>

        <div className="flex flex-col">
          <label>Reset Token</label>
          <input className="border px-3 py-2 rounded-md"
                 value={token} onChange={(e) => setToken(e.target.value)} required />
        </div>

        <div className="flex flex-col">
          <label>New Password</label>
          <input className="border px-3 py-2 rounded-md"
                 type="password"
                 value={newPass} onChange={(e) => setNewPass(e.target.value)} required />
        </div>

        {msg && <p className="text-green-600 text-sm">{msg}</p>}
        {err && <p className="text-red-600 text-sm">{err}</p>}

        <button className="w-full bg-green-600 text-white p-2 rounded-md">
          Reset Password
        </button>

        <button type="button" onClick={() => navigate("/")}
          className="text-indigo-600 text-sm underline">Back to Login</button>
      </form>
    </div>
  );
}
