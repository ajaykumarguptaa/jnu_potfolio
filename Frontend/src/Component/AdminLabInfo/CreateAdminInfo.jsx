import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api/backend.axios";

const CreateAdminInfo = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    name: "",
    role: "",
    description: "",
    labInfo: "",
    address: "",
    mobile: "",
    email: "",
    google_scholar: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleInput = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    Object.keys(admin).forEach((key) => {
      formData.append(key, admin[key]);
    });

    if (profilePic) {
      formData.append("profile_picture", profilePic);
    }

    api
      .post("/admininfo/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Admin created successfully!");
        navigate("/HOME");
      })
      .catch((err) => console.error("Create Error:", err));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-auto py-16 px-4"
    >
      <h1 className="text-center text-4xl font-bold text-slate-900 mb-10">
        Add New Admin
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
          max-w-4xl mx-auto p-8 rounded-2xl border-2 border-black 
          bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 
          shadow-[5px_5px_15px] hover:shadow-[0px_10px_24px_rgba(144,194,247,1)]
          transition-all duration-300
        "
      >
        {/* IMAGE PREVIEW + UPLOAD */}
        <div className="flex flex-col items-center mb-6">
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-48 h-52 rounded-xl object-cover border-2 border-purple-400 shadow-md mb-4"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="block text-sm text-gray-700"
          />
        </div>

        {/* INPUT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NAME */}
          <div className="flex flex-col">
            <label className="font-bold">Name:</label>
            <input
              type="text"
              name="name"
              value={admin.name}
              onChange={handleInput}
              className="px-3 py-2 rounded-lg border border-gray-400"
            />
          </div>

          {/* ROLE */}
          <div className="flex flex-col">
            <label className="font-bold">Role:</label>
            <input
              type="text"
              name="role"
              value={admin.role}
              onChange={handleInput}
              className="px-3 py-2 rounded-lg border border-gray-400"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-bold">Description:</label>
            <textarea
              name="description"
              rows="4"
              value={admin.description}
              onChange={handleInput}
              className="px-3 py-2 rounded-lg border border-gray-400"
            ></textarea>
          </div>

          {/* LAB INFO */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-bold">Lab Info:</label>
            <textarea
              name="labInfo"
              rows="4"
              value={admin.labInfo}
              onChange={handleInput}
              className="px-3 py-2 rounded-lg border border-gray-400"
            ></textarea>
          </div>

          {/* MOBILE */}
          <div className="flex flex-col">
            <label className="font-bold">Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={admin.mobile}
              onChange={handleInput}
              className="px-3 py-2 rounded-lg border border-gray-400"
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col">
            <label className="font-bold">Email:</label>
            <input
              type="email"
              name="email"
              value={admin.email}
              onChange={handleInput}
              className="px-3 py-2 rounded-lg border border-gray-400"
            />
          </div>

          {/* GOOGLE SCHOLAR */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-bold">Google Scholar:</label>
            <input
              type="text"
              name="google_scholar"
              value={admin.google_scholar}
              onChange={handleInput}
              className="px-3 py-2 rounded-lg border border-gray-400"
            />
          </div>

          {/* ADDRESS */}
          <div className="flex flex-col md:col-span-2">
            <label className="font-bold">Address:</label>
            <input
              type="text"
              name="address"
              value={admin.address}
              onChange={handleInput}
              className="px-3 py-2 rounded-lg border border-gray-400"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="
            mt-8 w-full py-3 rounded-xl font-bold text-white 
            bg-purple-500 hover:bg-purple-600 hover:scale-[1.02]
            transition-all shadow-lg
          "
        >
          Create Admin
        </button>
      </form>
    </motion.div>
  );
};

export default CreateAdminInfo;
