import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../api/backend.axios";

const AdminInfoEdit = () => {
  const id = useParams();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  // FETCH ADMIN INFO
  useEffect(() => {
    api
      .get(`/admininfo/${id.Id}`)
      .then((res) => {
        setAdmin(res.data);
        setPreview(res.data.profile_picture);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [id]);

  // HANDLE INPUT FIELDS
  const handleInput = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  // HANDLE IMAGE SELECTION
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdmin({ ...admin, profile_picture: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // SUBMIT UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("name", admin.name);
    fd.append("role", admin.role);
    fd.append("description", admin.description);
    fd.append("labInfo", admin.labInfo);
    fd.append("address", admin.address);
    fd.append("mobile", admin.mobile);
    fd.append("email", admin.email);
    fd.append("google_scholar", admin.google_scholar);

    if (admin.profile_picture instanceof File) {
      fd.append("profile_picture", admin.profile_picture);
    }

    api
      .put(`/admininfo/update/${id.Id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Admin updated successfully!");
        navigate("/HOME");
      })
      .catch((err) => {
        console.error("Update Error:", err);
      });
  };

  if (loading || !admin)
    return (
      <div className="text-center py-20 text-xl animate-pulse">Loading…</div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-auto py-16 px-4"
    >
      <h1 className="text-center text-4xl font-bold text-slate-900 mb-10">
        Edit Admin Information
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
          max-w-4xl mx-auto p-8 rounded-2xl border-2 border-black 
          bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 
          shadow-xl hover:shadow-2xl transition-all duration-300
        "
      >
        {/* IMAGE */}
        <div className="flex flex-col items-center mb-6">
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-48 h-52 rounded-xl object-cover 
                         border-2 border-purple-400 shadow-md mb-4"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="block text-sm text-gray-700"
          />
        </div>

        {/* GRID FIELDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="font-bold">Name</label>
            <input
              type="text"
              name="name"
              value={admin.name}
              onChange={handleInput}
              className="px-3 py-2 rounded-lg border border-gray-400"
            />
          </div>

          <div>
            <label className="font-bold">Role</label>
            <input
              type="text"
              name="role"
              value={admin.role}
              onChange={handleInput}
              className="px-3 py-2 rounded-lg border border-gray-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-bold">Description</label>
            <textarea
              name="description"
              rows="3"
              value={admin.description}
              onChange={handleInput}
              className="px-3 py-2 rounded-lg border border-gray-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-bold">Lab Info</label>
            <textarea
              name="labInfo"
              rows="3"
              value={admin.labInfo}
              onChange={handleInput}
              className="px-3 py-2 rounded-lg border border-gray-400"
            />
          </div>

          <div>
            <label className="font-bold">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={admin.mobile}
              onChange={handleInput}
              className="px-3 py-2 rounded-lg border border-gray-400"
            />
          </div>

          <div>
            <label className="font-bold">Email</label>
            <input
              type="email"
              name="email"
              value={admin.email}
              onChange={handleInput}
              className="px-3 py-2 rounded-lg border border-gray-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-bold">Google Scholar</label>
            <input
              type="text"
              name="google_scholar"
              value={admin.google_scholar}
              onChange={handleInput}
              className="px-3 py-2 rounded-lg border border-gray-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-bold">Address</label>
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
          Update Admin
        </button>
      </form>
    </motion.div>
  );
};

export default AdminInfoEdit;
