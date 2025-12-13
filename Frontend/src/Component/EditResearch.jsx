import React, { useEffect, useState } from "react";
import { api } from "../../api/backend.axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function EditResearch() {
  const  id  = useParams(); // URL param
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [research, setResearch] = useState(null);

  // -----------------------------------------------------
  // Fetch research details by ID on page load
  // -----------------------------------------------------
  useEffect(() => {
    api
      .get(`/research/GetResearchbyid/${id.Id}`, { withCredentials: true })
      .then((res) => {
        setResearch(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert("Failed to load research details.");
      });
  }, [id]);

  // -----------------------------------------------------
  // Update research
  // -----------------------------------------------------
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const body = {
      research_title: form.get("research_title"),
      field: form.get("field"),
      description: form.get("description"),
    };

    try {
      await api.put(`/research/UpdateResearch/${id.Id}`, body, {
        withCredentials: true,
      });

      alert("Research updated successfully!");
      navigate("/research");
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  // -----------------------------------------------------
  // Loading placeholder
  // -----------------------------------------------------
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600 text-lg">
        Loading research details...
      </div>
    );

  if (!research)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Research not found.
      </div>
    );

  // -----------------------------------------------------
  // UI
  // -----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#eef2f6] pt-20 px-6 sm:px-12 lg:px-24 pb-20">

      {/* PAGE TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl md:text-5xl font-extrabold text-slate-900 mb-10"
      >
        Edit Research
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl mx-auto border border-gray-200"
      >
        <form onSubmit={handleUpdate} className="space-y-6">

          {/* Research Title */}
          <div>
            <label className="font-semibold text-slate-700">
              Research Title
            </label>
            <input
              name="research_title"
              defaultValue={research.research_title}
              required
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Field */}
          <div>
            <label className="font-semibold text-slate-700">Field</label>
            <input
              name="field"
              defaultValue={research.field}
              required
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={research.description}
              className="w-full mt-2 p-3 border rounded-xl h-28 focus:ring-2 focus:ring-slate-400"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-700 transition"
            >
              Update Research
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
