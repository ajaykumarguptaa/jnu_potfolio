import React, { useState } from "react";
import { api } from "../../api/backend.axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AddMember() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Get admin ID (from login)


  const [preview, setPreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    // form.append("admin_id", "1fad4e05-d025-11f0-a450-0a002700000a"); // required by backend

    try {
      await api.post("/member/", form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Member added successfully!");
      navigate("/CurrentMember");

    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("Failed to add member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2f6] pt-20 px-6 sm:px-12 lg:px-24 pb-20">
      
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl md:text-5xl font-extrabold text-slate-900 mb-10"
      >
        Add Member
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl mx-auto border border-gray-200"
      >
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Member Name */}
          <div>
            <label className="font-semibold text-slate-700">Member Name</label>
            <input
              name="member_name"
              required
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Role */}
          <div>
            <label className="font-semibold text-slate-700">Role</label>
            <input
              name="role"
              required
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="font-semibold text-slate-700">Profile Picture</label>
            <input
              type="file"
              name="member_photo"  
              accept="image/*"
              required
              className="w-full mt-2 p-3 border rounded-xl bg-white"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
            />

            {preview && (
              <img
                src={preview}
                className="w-32 h-32 mt-4 rounded-full object-cover border shadow"
                alt="Preview"
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-slate-700">Description</label>
            <textarea
              name="description"
              required
              className="w-full mt-2 p-3 border rounded-xl h-28 focus:ring-2 focus:ring-slate-400"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 rounded-xl text-white font-semibold transition 
                ${loading ? "bg-slate-500" : "bg-slate-900 hover:bg-slate-700"}`}
            >
              {loading ? "Adding..." : "Add Member"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-3 border rounded-xl text-slate-900 font-semibold hover:bg-slate-100 transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}
