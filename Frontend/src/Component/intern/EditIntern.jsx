import React, { useEffect, useState } from "react";
import { api } from "../../../api/backend.axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function EditIntern() {
  const { Id } = useParams();
  const navigate = useNavigate();

  const [intern, setIntern] = useState(null);
  const [preview, setPreview] = useState(null);

  const inputStyle =
    "w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition";

  useEffect(() => {
    api
      .get(`/interns/${Id}`)
      .then((res) => setIntern(res.data))
      .catch((err) => console.error(err));
  }, [Id]);

  if (!intern)
    return <div className="text-center mt-20 text-xl">Loading...</div>;

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    try {
      await api.put(`/interns/update/${Id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Intern updated!");
      navigate("/Interns");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2f6] pt-24 px-6 pb-20">
      <motion.h1 className="text-center text-4xl font-bold mb-10">
        Edit Intern
      </motion.h1>

      <form
        onSubmit={submit}
        className="bg-white p-10 rounded-3xl shadow-xl max-w-3xl mx-auto space-y-6"
      >
        <input
          name="name"
          defaultValue={intern.name}
          className={inputStyle}
          placeholder="Intern Name"
        />

        <input
          name="role"
          defaultValue={intern.role}
          className={inputStyle}
          placeholder="Role"
        />

        <textarea
          name="description"
          defaultValue={intern.description}
          className={`${inputStyle} h-28`}
          placeholder="Description"
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          name="profile_picture"
          className={inputStyle}
          onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
        />

        <img
          src={preview || intern.profile_picture}
          className="w-32 h-32 rounded-full mx-auto border object-cover"
        />

        <input
          name="address"
          defaultValue={intern.address}
          className={inputStyle}
          placeholder="Address"
        />

        <input
          name="mobile"
          defaultValue={intern.mobile}
          className={inputStyle}
          placeholder="Mobile Number"
        />

        <input
          name="email"
          defaultValue={intern.email}
          className={inputStyle}
          placeholder="Email"
        />

        <input
          name="google_scholar"
          defaultValue={intern.google_scholar}
          className={inputStyle}
          placeholder="Google Scholar URL"
        />

        <div className="flex gap-2">

          <button className="btn-primary w-full bg-slate-800 hover:bg-slate-900 transform-all duration-300 py-3 rounded-xl text-white">Update Intern</button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-secondary w-full py-3   border-2 rounded-xl text-black "
        >
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
}
