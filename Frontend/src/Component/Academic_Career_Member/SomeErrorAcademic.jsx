import React, { useEffect, useState } from "react";
import { api } from "../../../api/backend.axios";
import { useParams, useNavigate } from "react-router-dom";

const SomeErrorAcademic = () => {
  const  id  = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    organisation: "",
    duration: "",
    role: "",
  });

  useEffect(() => {
    api.get("/academicCareer/GetAcademicCareers").then((res) => {
      const found = res.data.find((c) => c.academic_id === id.Id);
      if (found) {
        setForm({
          title: found.title,
          organisation: found.organisation,
          duration: found.duration,
          role: found.role,
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
      .put(`/academicCareer/UpdateAcademicCareer/${id.Id}`, form)
      .then(() => {
        alert("Updated Successfully!");
        navigate("/careermember");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-8 py-20 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Academic Career Member</h1>

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

        <button className="px-4 py-2 bg-slate-900 text-white rounded-md">
          Update Career
        </button>

      </form>
    </div>
  );
};

export default SomeErrorAcademic;
