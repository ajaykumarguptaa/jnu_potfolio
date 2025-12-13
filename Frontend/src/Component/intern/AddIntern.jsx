import React, { useState } from "react";
import { api } from "../../../api/backend.axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AddIntern() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    try {
      await api.post("/interns/create", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Intern Added Successfully!");
      navigate("/Interns");
    } catch (err) {
      console.error(err);
      alert("Error creating intern");
    }
    setLoading(false);
  };

  const inputStyle =
    "w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

  return (
    <div className="min-h-screen bg-[#eef2f6] pt-24 px-6 pb-20">
      <motion.h1 className="text-center text-4xl font-bold mb-10">
        Add Intern
      </motion.h1>

      <form
        onSubmit={submit}
        className="bg-white p-10 rounded-3xl shadow-xl max-w-3xl mx-auto space-y-6"
      >
        <input name="name" placeholder="Intern Name" className={inputStyle} required />

        <input name="role" placeholder="Role" className={inputStyle} required />

        <textarea
          name="description"
          placeholder="Description"
          className={`${inputStyle} h-28`}
        />

        {/* Image Upload */}
        <input
          type="file"
          name="profile_picture"
          accept="image/*"
          onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))}
          className={inputStyle}
        />

        {preview && (
          <img
            src={preview}
            className="w-32 h-32 rounded-full border object-cover mx-auto"
          />
        )}

        <input name="address" placeholder="Address" className={inputStyle} />

        <input name="mobile" placeholder="Mobile" className={inputStyle} />

        <input name="email" placeholder="Email" className={inputStyle} />

        <input
          name="google_scholar"
          placeholder="Google Scholar URL"
          className={inputStyle}
        />

       <div className="flex gap-2">
         <button
          className="w-full bg-slate-700 hover:bg-slate-900 text-white py-3 rounded-xl  transition shadow"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Intern"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full bg-gray-300 py-3 rounded-xl hover:bg-gray-400 transition"
        >
          Cancel
        </button>
       </div>
      </form>
    </div>
  );
}
