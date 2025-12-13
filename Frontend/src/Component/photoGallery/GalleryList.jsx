import React, { useEffect, useState } from "react";
import { api } from "../../../api/backend.axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function GalleryList() {
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/photoGallery/all").then((res) => setPhotos(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this photo?")) return;

    await api.delete(`/photoGallery/delete/${id}`);
    setPhotos(photos.filter((p) => p.photo_id !== id));
  };

  return (
    <div className="w-full py-20 px-4">
      {/* Top Header + Add Button */}
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Photo Gallery</h1>

        <motion.button
          onClick={() => navigate("/gallery/addPhoto")}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-blue-600 text-white text-lg rounded-xl shadow-md 
                     hover:bg-blue-700 transition-all duration-300"
        >
          + Add Photo
        </motion.button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {photos.map((p) => (
          <motion.div
            key={p.photo_id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Image */}
            <img
              src={p.photo_url}
              alt={p.caption}
              className="w-full h-64 object-cover hover:scale-105 transition duration-300"
            />

            {/* Caption */}
            <div className="p-3">
              <p className="font-semibold text-gray-700">{p.caption}</p>
            </div>

            {/* Edit/Delete Buttons */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => navigate(`/gallery/edit/${p.photo_id}`)}
                className="px-3 py-1 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p.photo_id)}
                className="px-3 py-1 bg-red-600 text-white rounded-md shadow hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
