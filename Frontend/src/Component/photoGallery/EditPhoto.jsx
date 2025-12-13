import React, { useEffect, useState } from "react";
import { api } from "../../../api/backend.axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function EditPhoto() {
  const id = useParams();
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/photoGallery/${id.Id}`).then((res) => {
      setCaption(res.data.caption);
      setPreview(res.data.photo_url);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) formData.append("photo_gallery", file);
    formData.append("caption", caption);

    await api.put(`/photoGallery/update/${id.Id}`, formData);
    alert("Photo updated!");
    navigate("/gallery");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex justify-center py-12"
    >
      <form
        onSubmit={handleSubmit}
        className="w-[90%] max-w-xl bg-white p-6 rounded-2xl shadow-xl"
      >
        <h1 className="text-2xl font-bold mb-5 text-center text-yellow-600">
          Edit Photo
        </h1>

        {/* Preview */}
        <div className="w-full h-64 rounded-xl mb-4 bg-gray-200 flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <span className="text-gray-500">Loading image…</span>
          )}
        </div>

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]) || "hello");
          }}
          className="w-full mb-4"
        />

        {/* Caption */}
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <button
          type="submit"
          className="w-full py-3 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-slate-600 transition"
        >
          Update Photo
        </button>
      </form>
    </motion.div>
  );
}
