import React, { useState } from "react";
import { api } from "../../../api/backend.axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AddAlumniMembers() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    try {
      await api.post("/almember/create", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Member added successfully!");
      navigate("/Alumni");
    } catch (err) {
      console.error("UPLOAD ERROR", err);
      alert("Error adding member");
    }
    setLoading(false);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/60 backdrop-blur-sm focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all outline-none placeholder:text-gray-500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dfe7f3] to-[#eef2f6] pt-24 px-6 sm:px-12 lg:px-24 pb-20">

      {/* PAGE TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-5xl font-extrabold text-slate-900 drop-shadow mb-12"
      >
        Add New Alumni Member
      </motion.h1>

      {/* MAIN CARD */}
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/40 space-y-8"
      >

        {/* GRID INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-slate-700 font-semibold mb-2">Full Name</label>
            <input name="name" required placeholder="Enter full name" className={inputClass} />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="text-slate-700 font-semibold mb-2">Role / Position</label>
            <input name="role" required placeholder="e.g. Assistant Professor" className={inputClass} />
          </div>

        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-slate-700 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            placeholder="Short bio or background..."
            rows={4}
            className={inputClass}
          ></textarea>
        </div>

        {/* IMAGE UPLOAD BOX */}
        <div className="flex flex-col">
          <label className="text-slate-700 font-semibold mb-2">Profile Picture</label>

          <label className="w-full p-6 border-2 border-dashed border-slate-400 rounded-2xl cursor-pointer bg-white/50 hover:bg-white/80 transition flex flex-col items-center justify-center">
            <span className="text-slate-600 font-medium text-lg">Click to Upload Image</span>
            <input
              type="file"
              name="profile_picture"
              accept="image/*"
              hidden
              onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
            />
          </label>

          {preview && (
            <img
              src={preview}
              className="w-32 h-32 mt-6 mx-auto rounded-full object-cover shadow-xl border"
            />
          )}
        </div>

        {/* EXTRA INFORMATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <input name="education" placeholder="Education" className={inputClass} />
          <input name="research_interests" placeholder="Research Interests" className={inputClass} />
          <input name="address" placeholder="Address" className={inputClass} />
          <input name="mobile" placeholder="Mobile Number" className={inputClass} />
          <input name="email" placeholder="Email Address" className={inputClass} />
          <input name="linkedin" placeholder="LinkedIn Profile URL" className={inputClass} />
          <input name="google_scholar" placeholder="Google Scholar URL" className={inputClass} />

        </div>

        {/* BUTTONS */}
        <div className="flex gap-6 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-4 rounded-xl bg-slate-900 text-white text-lg font-semibold hover:bg-slate-700 transition"
          >
            {loading ? "Adding..." : "Add Member"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-4 rounded-xl border border-slate-900 text-slate-900 text-lg font-semibold hover:bg-slate-100 transition"
          >
            Cancel
          </button>
        </div>

      </motion.form>
    </div>
  );
}
