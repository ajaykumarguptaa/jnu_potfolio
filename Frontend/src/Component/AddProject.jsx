import React, { useState } from "react";
import { api } from "../../api/backend.axios";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    project_title: "",
    organization: "",
    description: "",
    project_date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitProject = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/project/createproject", form, { withCredentials: true });

      alert("Project created successfully!");
      navigate("/Project"); // redirect to project list
    } catch (err) {
      console.error(err);
      alert("Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 px-6 sm:px-10 lg:px-16 pb-20">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-10">

        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Add New Project
        </h1>

        <form onSubmit={submitProject} className="space-y-6">

          {/* PROJECT TITLE */}
          <div>
            <label className="text-gray-800 font-medium">Project Title</label>
            <input
              type="text"
              name="project_title"
              value={form.project_title}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 border rounded-xl"
              placeholder="Enter project title"
            />
          </div>

          {/* ORGANIZATION */}
          <div>
            <label className="text-gray-800 font-medium">Organization</label>
            <input
              type="text"
              name="organization"
              value={form.organization}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 border rounded-xl"
              placeholder="IIT Kanpur / JNU / etc."
            />
          </div>

          {/* PROJECT DATE */}
          <div>
            <label className="text-gray-800 font-medium">Project Date</label>
            <input
              type="date"
              name="project_date"
              value={form.project_date}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 border rounded-xl"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-gray-800 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows="5"
              className="w-full mt-1 px-4 py-3 border rounded-xl"
              placeholder="Enter project description"
            ></textarea>
          </div>

          {/* ADMIN ID */}
          {/* <div>
            <label className="text-gray-800 font-medium">Admin ID</label>
            <input
              type="text"
              name="admin_id"
              value={form.admin_id}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 border rounded-xl"
              placeholder="Enter admin ID"
            />
          </div> */}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-all"
          >
            {loading ? "Submitting..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
