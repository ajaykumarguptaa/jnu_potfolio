// src/components/EditProject.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/backend.axios";
import { motion } from "framer-motion";

export default function EditProject() {
  const { Id } = useParams(); // URL param (same name as your route)
  const navigate = useNavigate();
  // console.log(Id)
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // FETCH PROJECT DETAILS

  useEffect(() => {
    api
      .get(`/project/getproject/${Id}`, { withCredentials: true })
      .then((res) => {
        setProject(res.data); // backend returns project object directly
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert("Failed to load project.");
      });
  }, [Id]);
  // console.log(project)

  // UPDATE PROJECT

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updateBody = {
      project_title: formData.get("project_title"),
      organization: formData.get("organization"),
      description: formData.get("description"),
      project_date: formData.get("project_date"),
    };

    try {
      await api.put(`/project/updateproject/${Id}`, updateBody, {
        withCredentials: true,
      });

      alert("Project updated successfully!");
      navigate("/project");
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  // ---------------------------------------------
  // LOADING UI
  // ---------------------------------------------
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600 text-lg">
        Loading project...
      </div>
    );

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Project not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#eef2f6] pt-20 px-6 sm:px-12 lg:px-24 pb-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl md:text-5xl font-extrabold text-slate-900 mb-10"
      >
        Edit Project
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl mx-auto border border-gray-200"
      >
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title */}
          <div>
            <label className="font-semibold text-slate-700">
              Project Title
            </label>
            <input
              name="project_title"
              defaultValue={project.data.project_title}
              required
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Organization */}
          <div>
            <label className="font-semibold text-slate-700">Organization</label>
            <input
              name="organization"
              defaultValue={project.data.organization}
              required
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Date */}
          <div>
            <label className="font-semibold text-slate-700">Project Date</label>
            <input
              type="date"
              name="project_date"
              defaultValue={project.data.project_date}
              required
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-slate-700">Description</label>
            <textarea
              name="description"
              defaultValue={project.data.description}
              className="w-full mt-2 p-3 border rounded-xl h-28 focus:ring-2 focus:ring-slate-400"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-700 transition"
            >
              Update Project
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
