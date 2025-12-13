import React, { useEffect, useState } from "react";
import { api } from "../../api/backend.axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function EditMember() {
  const navigate = useNavigate();
  const  id  = useParams();

  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState(null);

  // IMAGE PREVIEW (new upload)
  const [preview, setPreview] = useState(null);


  // FETCH EXISTING MEMBER

  useEffect(() => {
    api
      .get(`/member/${id.Id}`, { withCredentials: true })
      .then((res) => {
        setMember(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading member:", err);
        setLoading(false);
      });
  }, [id]);

 
  // UPDATE MEMBER
 
  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    try {
      await api.put(`/member/${id.Id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      navigate("/Member/CurrentMember");
      alert("Member updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Update failed. Check console.");
    }
  };

 
  // LOADING UI

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-slate-600 text-lg">
        Loading member...
      </div>
    );

  if (!member)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-lg">
        Member not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#eef2f6] pt-20 px-6 sm:px-12 lg:px-24 pb-20">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl md:text-5xl font-extrabold text-slate-900 mb-10"
      >
        Edit Member
      </motion.h1>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl mx-auto border border-gray-200"
      >
        <form onSubmit={handleUpdate} className="space-y-6">

          {/* Member Name */}
          <div>
            <label className="font-semibold text-slate-700">Member Name</label>
            <input
              name="member_name"
              defaultValue={member.member_name}
              required
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Role */}
          <div>
            <label className="font-semibold text-slate-700">Role / Position</label>
            <input
              name="role"
              defaultValue={member.role}
              required
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="font-semibold text-slate-700">Profile Picture</label>

            <input
              type="file"
              name="member_photo"
              accept="image/*"
              className="w-full mt-2 p-3 border rounded-xl"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
            />

            {/* OLD IMAGE */}
            <p className="mt-3 text-slate-600 text-sm">Current Image:</p>
            <img
              src={member.profile_picture}
              alt="Current"
              className="w-24 h-24 rounded-full object-cover mt-2 border shadow"
            />

            {/* NEW IMAGE PREVIEW */}
            {preview && (
              <>
                <p className="mt-3 text-slate-600 text-sm">New Image Preview:</p>
                <img
                  src={preview}
                  alt="preview"
                  className="w-24 h-24 rounded-full object-cover mt-2 border shadow"
                />
              </>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-slate-700">Short Bio</label>
            <textarea
              name="description"
              defaultValue={member.description}
              required
              className="w-full mt-2 p-3 border rounded-xl h-28 focus:ring-2 focus:ring-slate-400"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-700"
            >
              Update Member
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-3 border rounded-xl text-slate-900 font-semibold hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}
