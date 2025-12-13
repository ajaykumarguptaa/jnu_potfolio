import React, { useState } from "react";
import { api } from "../../../api/backend.axios";
import { useNavigate } from "react-router-dom";

const AddOtherActivity = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    organisation: "",
    duration: "",
    description: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("/otherActivities/addactivities", form)
      .then(() => {
        alert("Activity created successfully!");
        navigate("/otherActivities");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Other Activity</h1>

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
          <label className="font-semibold">Duration</label>
          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleInput}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            rows="3"
            value={form.description}
            onChange={handleInput}
            className="w-full p-2 border rounded"
          />
        </div>

        <button className="px-4 py-2 bg-slate-900 text-white rounded-md">
          Add Activity
        </button>

      </form>
    </div>
  );
};

export default AddOtherActivity;
