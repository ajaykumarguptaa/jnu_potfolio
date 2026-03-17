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
  const [error, setError] = useState("");

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SIMPLE VALIDATION
  const validateForm = () => {
    if (!form.project_title.trim()) return "Project title is required";
    if (!form.organization.trim()) return "Organization is required";
    if (!form.project_date) return "Project date is required";
    if (!form.description.trim()) return "Description is required";
    return null;
  };

  // SUBMIT
  const submitProject = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      await api.post("/project/createproject", form, {
        withCredentials: true,
      });

      // Reset form (optional)
      setForm({
        project_title: "",
        organization: "",
        description: "",
        project_date: "",
      });

      alert("Project created successfully!");

      navigate("/Project");
    } catch (err) {
      console.error(err);
      setError("Failed to create project. Please try again.");
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
   

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={submitProject} className="space-y-6">

          {/* PROJECT TITLE */}
          <div>
            <label className="text-gray-800 font-medium">
              Project Title
            </label>
            <input
              type="text"
              name="project_title"
              value={form.project_title}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter project title"
            />
          </div>

          {/* ORGANIZATION */}
          <div>
            <label className="text-gray-800 font-medium">
              Organization
            </label>
            <input
              type="text"
              name="organization"
              value={form.organization}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="IIT / JNU / Company name"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="text-gray-800 font-medium">
              Project Date
            </label>
            <input
              type="date"
              name="project_date"
              value={form.project_date}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-gray-800 font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="5"
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter project description"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-all disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}




