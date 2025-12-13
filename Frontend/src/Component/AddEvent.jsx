// src/components/AddEvent.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/backend.axios";
import { motion } from "framer-motion";

export default function AddEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ------------------------------------------------------
  // HANDLE SUBMIT
  // ------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    // Fix time format for MySQL (HH:MM → HH:MM:00)
    let event_time = form.get("event_time");
    if (event_time && event_time.length === 5) {
      event_time += ":00";
    }

    const body = {
      event_title: form.get("event_title"),
      event_description: form.get("event_description"),
      event_venue: form.get("event_venue"),
      event_date: form.get("event_date"),
      event_time: event_time,
      admin_id: null, // your backend works without admin_id
    };

    try {
      await api.post("/events/create", body, {
        withCredentials: true,
      });

      alert("Event created successfully!");
      navigate("/EVENT");
    } catch (err) {
      console.error(err);
      alert("Failed to create event. Check backend console for error.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#eef2f6] pt-20 pb-20 px-6 sm:px-12 lg:px-24">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl md:text-5xl font-extrabold text-slate-900 mb-10"
      >
        Add Event
      </motion.h1>

      {/* FORM CARD */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl mx-auto border border-gray-200"
      >
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Event Title */}
          <div>
            <label className="font-semibold text-slate-700">Event Title</label>
            <input
              name="event_title"
              required
              placeholder="Enter event title"
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-slate-700">Description</label>
            <textarea
              name="event_description"
              required
              placeholder="Enter event description"
              className="w-full mt-2 p-3 border rounded-xl h-32 focus:ring-2 focus:ring-slate-400"
            ></textarea>
          </div>

          {/* Venue */}
          <div>
            <label className="font-semibold text-slate-700">Venue</label>
            <input
              name="event_venue"
              required
              placeholder="Enter event venue"
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Date */}
          <div>
            <label className="font-semibold text-slate-700">Event Date</label>
            <input
              type="date"
              name="event_date"
              required
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Time */}
          <div>
            <label className="font-semibold text-slate-700">Event Time</label>
            <input
              type="time"
              name="event_time"
              required
              className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-700 transition"
            >
              {loading ? "Creating..." : "Create Event"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-3 border border-slate-900 rounded-xl text-slate-900 font-semibold hover:bg-slate-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
