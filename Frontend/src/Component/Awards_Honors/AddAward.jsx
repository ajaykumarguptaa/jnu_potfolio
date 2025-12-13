import React, { useState } from "react";
import { api } from "../../../api/backend.axios";
import { useNavigate } from "react-router-dom";

const AddAward = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    organisation: "",
    department: "",
    duration: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("/awards/AddAward", form)
      .then(() => {
        alert("Award added successfully!");
        navigate("/awards/honors");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-8 py-20 max-w-lg mx-auto">

      <h1 className="text-3xl font-bold mb-6">Add Award</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="font-semibold">Organisation</label>
          <input
            type="text"
            name="organisation"
            value={form.organisation}
            onChange={handleInput}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Department</label>
          <input
            type="text"
            name="department"
            value={form.department}
            onChange={handleInput}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Duration</label>
          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleInput}
            className="w-full p-2 border rounded"
          />
        </div>

        <button className="px-4 py-2 bg-slate-900 text-white rounded-md">
          Add Award
        </button>

      </form>

    </div>
  );
};

export default AddAward;
