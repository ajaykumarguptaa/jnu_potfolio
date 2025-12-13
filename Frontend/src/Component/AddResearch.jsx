import React, { useState } from "react";
import { api } from "../../api/backend.axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AddResearch() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const body = {
      research_title: form.get("research_title"),
      field: form.get("field"),
      description: form.get("description"),
    };
    console.log(body)
    try {
      await api.post("/research/AddResearch", body, {
        withCredentials: true,
      });
          
      alert("Research Added Successfully!");
      navigate("/research");
    } catch (err) {
      console.error(err);
      alert("Error adding research. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2f6] pt-20 px-6 sm:px-12 lg:px-24 pb-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl md:text-5xl font-extrabold text-slate-900 mb-10"
      >
        Add Research Work
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl mx-auto border border-gray-200"
      >
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="font-semibold text-slate-700">Research Title</label>
            <input
              name="research_title"
              required
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Field */}
          <div>
            <label className="font-semibold text-slate-700">Field of Study</label>
            <input
              name="field"
              required
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
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
              {loading ? "Adding..." : "Add Research"}
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
