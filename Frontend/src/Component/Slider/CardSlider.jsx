import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { api } from "../../../api/backend.axios";

export default function CardSlider() {
  const container = useRef(null);
  const [slidesData, setSlidesData] = useState([]);

  // VIEW & EDIT states
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: ""
  });

  // Fetch activities
  const loadData = async () => {
    const res = await api.get("/administrativeactivities/getactivities");
    setSlidesData(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // GSAP Auto sliding
  useEffect(() => {
    if (slidesData.length === 0) return;

    const el = container.current;
    const slides = el.querySelectorAll(".auto-slide");

    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      el.appendChild(clone);
    });

    gsap.to(el, {
      x: `-50%`,
      duration: 12,
      ease: "linear",
      repeat: -1,
    });
  }, [slidesData]);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open EDIT modal
  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      title: item.title,
      description: item.description,
      duration: item.duration,
    });
  };

  // UPDATE Activity
  const updateActivity = async () => {
    await api.put(
      `/updateactivities/${editItem.id}`,
      form
    );
    setEditItem(null);
    loadData();
  };

  // DELETE Activity
  const deleteActivity = async (id) => {
    await api.delete(`/deleteactivities/${id}`);
    loadData();
  };

  return (
    <div className="w-full py-16 overflow-hidden bg-gray-50">
      <h2 className="text-center text-3xl font-semibold text-gray-700 mb-10">
        Auto-Sliding Activities (View, Edit, Delete)
      </h2>

      {/* SLIDER */}
      <div className="relative w-full overflow-hidden">
        <div ref={container} className="flex gap-6 w-max auto-slider">
          {slidesData.map((item, idx) => (
            <div
              key={idx}
              className="
                auto-slide 
                min-w-[260px] sm:min-w-[300px] md:min-w-[340px]
                bg-white shadow-md rounded-2xl p-6
                border border-gray-200
                relative
              "
            >
              <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-2">
                {item.description}
              </p>
              <p className="text-gray-500 mt-1 text-sm">
                Duration: {item.duration}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setViewItem(item)}
                  className="px-3 py-1 bg-green-500 text-white rounded-md"
                >
                  View
                </button>

                <button
                  onClick={() => openEdit(item)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteActivity(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl w-[90%] max-w-md shadow-xl">

            <h2 className="text-2xl font-bold mb-4">
              {viewItem.title}
            </h2>

            <p className="text-gray-700 mb-2">
              <strong>Description:</strong> {viewItem.description}
            </p>

            <p className="text-gray-700 mb-4">
              <strong>Duration:</strong> {viewItem.duration}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setViewItem(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editItem && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl w-[90%] max-w-md shadow-xl">

            <h2 className="text-xl font-bold mb-4">Edit Activity</h2>

            <div className="flex flex-col gap-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Title"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Description"
              />

              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Duration"
              />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setEditItem(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateActivity}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Update
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
