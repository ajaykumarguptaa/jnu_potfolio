import React, { useEffect, useState } from "react";
import { api } from "../../../api/backend.axios";
import { useParams, useNavigate } from "react-router-dom";

const EditAcademicCareer = () => {
  const { Id } = useParams();   // <-- EXTRACT ID CORRECTLY
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    organisation: "",
    duration: "",
    description: "",
  });

  useEffect(() => {
    api
      .get("/administrativeactivities/getactivities")
      .then((res) => {
        console.log("All Activities:", res.data);

        const activity = res.data.find(
          (item) => item.administrative_id === Id
        );

        if (activity) {
          setForm({
            title: activity.title || "",
            organisation: activity.organisation || "",
            duration: activity.duration || "",
            description: activity.description || "",
          });
        }
      })
      .catch((err) => console.error(err));
  }, [Id]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .put(`/administrativeactivities/updateactivities/${Id}`, form)
      .then((res) => {
        console.log("Update Response:", res.data);
        alert("Updated successfully!");
        navigate("/activity/position");
      })
      .catch((err) => console.log("Update Error:", err));
  };

  return (
    <div className="p-8 py-20 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Administrative Activity</h1>

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

        {/* <div>
          <label className="font-semibold">Organisation</label>
          <input
            name="organisation"
            value={form.organisation}
            onChange={handleInput}
            className="w-full p-2 border rounded"
          />
        </div> */}

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
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInput}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        <button className="px-4 py-2 bg-slate-900 text-white rounded">
          Update
        </button>

      </form>
    </div>
  );
};

export default EditAcademicCareer;
