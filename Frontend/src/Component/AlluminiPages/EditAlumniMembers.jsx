import React, { useEffect, useState } from "react";
import { api } from "../../../api/backend.axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditAlumniMembers() {
  const { Id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await api.get(`/almember/${Id}`);
        setMember(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch member data");
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [Id]);

  if (loading)
    return (
      <div className="text-center pt-24 text-xl text-gray-600 animate-pulse">
        Loading Alumni Info...
      </div>
    );

  if (!member)
    return (
      <div className="text-center pt-24 text-xl text-red-500">
        No Data Found
      </div>
    );

  // Submit Handler
  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    try {
      setSaving(true);
      await api.put(`/almember/update/${Id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Alumni updated successfully!");
      navigate("/alumni");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20 px-4">
      <h1 className="text-center text-4xl font-bold mb-12 text-gray-800">
        Edit Alumni Member
      </h1>

      <form
        onSubmit={submit}
        className="bg-white p-10 rounded-3xl shadow-xl max-w-5xl mx-auto space-y-12"
      >
        {/* PROFILE INFO */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Profile Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="name"
              defaultValue={member.name}
              placeholder="Full Name"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              name="role"
              defaultValue={member.role}
              placeholder="Role"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              name="description"
              defaultValue={member.description}
              placeholder="Description"
              className="w-full px-4 py-3 border rounded-xl h-32 md:col-span-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </section>

        {/* PROFILE PICTURE */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Profile Picture
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <img
                src={preview || member.profile_picture}
                className="w-40 h-40 rounded-full shadow-md border object-cover transition group-hover:opacity-75"
              />

              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs bg-black text-white py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition">
                Change Photo
              </span>
            </div>

            <input
              type="file"
              name="profile_picture"
              className="w-full border rounded-xl px-4 py-3 cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
              onChange={(e) => {
                if (e.target.files?.length > 0) {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </div>
        </section>

        {/* ACADEMIC INFO */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Academic Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="education"
              defaultValue={member.education}
              placeholder="Education"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              name="research_interests"
              defaultValue={member.research_interests}
              placeholder="Research Interests"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </section>

        {/* CONTACT DETAILS */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Contact Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "address", label: "Address" },
              { name: "mobile", label: "Mobile Number" },
              { name: "email", label: "Email Address" },
              { name: "linkedin", label: "LinkedIn URL" },
              { name: "google_scholar", label: "Google Scholar URL" },
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                defaultValue={member[field.name]}
                placeholder={field.label}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none md:col-span-1"
              />
            ))}
          </div>
        </section>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl  text-white bg-slate-900 transition shadow-md flex items-center gap-2"
          >
            {saving && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {saving ? "Saving..." : "Update Member"}
          </button>
        </div>
      </form>
    </div>
  );
}
