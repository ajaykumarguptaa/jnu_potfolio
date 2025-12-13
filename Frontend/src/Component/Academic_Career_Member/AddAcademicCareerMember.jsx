import React, { useState } from "react";
import { api } from "../../../api/backend.axios";
import { useNavigate } from "react-router-dom";

const AddAcademicCareerMember = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    organisation: "",
    duration: "",
    role: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("/academicCareer/AddAcademicCareer", form)
      .then(() => {
        alert("Academic Career Added!");
        navigate("/careermember");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Academic Career</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="font-semibold">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleInput}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Organisation</label>
          <input
            name="organisation"
            value={form.organisation}
            onChange={handleInput}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Duration</label>
          <input
            name="duration"
            value={form.duration}
            onChange={handleInput}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Role</label>
          <input
            name="role"
            value={form.role}
            onChange={handleInput}
            className="w-full p-2 border rounded"
          />
        </div>

        <button className="px-4 py-2 bg-green-600 text-white rounded-md">
          Add Career
        </button>

      </form>
    </div>
  );
};

export default AddAcademicCareerMember;
