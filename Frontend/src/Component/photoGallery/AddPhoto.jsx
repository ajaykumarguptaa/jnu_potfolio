import React, { useState } from "react";
import { api } from "../../../api/backend.axios";
import { useNavigate } from "react-router-dom";

export default function AddPhoto() {
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Please select a photo");
      return;
    }

    const formData = new FormData();
    formData.append("photo_gallery", photo); 
    formData.append("caption", caption);

    try {
      setLoading(true); // START LOADING

      await api.post("/photoGallery/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Photo uploaded successfully!");
      navigate("/gallery");
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setLoading(false); // STOP LOADING
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 my-28 mt-10 bg-white shadow-xl rounded-xl">
      <h1 className="text-3xl my-20 font-bold text-center mb-6">Add Photo</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold text-gray-700">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">Select Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {loading ? (
          <button
            disabled
            className="w-full py-2 bg-slate-900 text-gray-300 rounded animate-pulse"
          >
            Uploading...
          </button>
        ) : (
          <button
            type="submit"
            className="w-full py-2 bg-slate-900 text-white rounded hover:bg-slate-700"
          >
            Upload
          </button>
        )}
      </form>
    </div>
  );
}
