import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../../api/backend.axios";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Email passed from Register Page → navigate("/verify-otp", { state: { email } })
  const email = location.state?.email;
  console.log(email)
  const showFlash = (text, isError = false) => {
    isError ? setErr(text) : setMsg(text);
    setTimeout(() => {
      setErr(null);
      setMsg(null);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //  API Call to Backend
      const { data } = await api.post("/auth/verify-otp", {
        admin_email: email,
        otp_code: otp,
      });

      showFlash(data.message);
      console.log("OTP Verified:", data);

      // Redirect after success
      navigate("/dashboard");
    } catch (error) {
      console.log("OTP Error:", error.response?.data);

      showFlash(error.response?.data?.error || "Invalid OTP", true);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-indigo-600">
          Verify OTP
        </h2>

        <p className="text-sm text-gray-600">
          OTP sent to: <b>{email}</b>
        </p>

        <div className="flex flex-col">
          <label>OTP Code</label>
          <input
            type="text"
            className="border px-3 py-2 rounded-md"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        {msg && <p className="text-green-600 text-sm">{msg}</p>}
        {err && <p className="text-red-600 text-sm">{err}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-md"
        >
          Verify OTP
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-indigo-600 text-sm underline"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
