import React, { useEffect, useState } from "react";
import { api } from "../../../api/backend.axios";
import { useParams, useNavigate } from "react-router-dom";

const EditOtherActivity = () => {
  const id  = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    organisation: "",
    duration: "",
    description: "",
  });

  useEffect(() => {
    api.get("/otherActivities/getallactivities").then((res) => {
      const activity = res.data.find((a) => a.activity_id === id.Id);
      if (activity) {
        setForm({
          organisation: activity.organisation,
          duration: activity.duration,
          description: activity.description,
        });
      }
    });
  }, [id]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .put(`/otherActivities/updateactivities/${id.Id}`, form)
      .then(() => {
        alert("Activity updated successfully!");
        navigate("/otherActivities");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-8 py-20 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Activity</h1>

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
          Update Activity
        </button>

      </form>
    </div>
  );
};

export default EditOtherActivity;
