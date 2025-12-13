// src/components/EditEvent.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/backend.axios";
import { motion } from "framer-motion";

export default function EditEvent() {
  const  id  = useParams(); // event id from URL
  const navigate = useNavigate();

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------------------------------------------------------
  // FETCH EVENT BY ID
  // ------------------------------------------------------

  useEffect(() => {
    api
      .get(`/events/${id.Id}`, { withCredentials: true })
      .then((res) => {
        setEventData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load event details.");
        setLoading(false);
      });
  }, [id]);

  // ------------------------------------------------------
  // HANDLE UPDATE
  // ------------------------------------------------------
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const updatedEvent = {
      event_title: form.get("event_title"),
      event_description: form.get("event_description"),
      event_venue: form.get("event_venue"),
    };
    // console.log(updatedEvent)

    try {
      await api.put(`/events/update/${id.Id}`, updatedEvent, {
        withCredentials: true,
      });

      alert("Event updated successfully!");
      navigate("/Event"); // redirect to event list
    } catch (err) {
      console.error(err);
      alert("Event update failed.");
    }
  };

  // ------------------------------------------------------
  // LOADING UI
  // ------------------------------------------------------
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600 text-xl">
        Loading event details...
      </div>
    );

  if (!eventData)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Event not found.
      </div>
    );

  // ------------------------------------------------------
  // MAIN UI
  // ------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#eef2f6] pt-20 pb-20 px-6 sm:px-12 lg:px-24">
      <motion.h1
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl md:text-5xl font-extrabold text-slate-900 mb-10"
      >
        Edit Event
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-3xl p-10 max-w-3xl mx-auto border border-gray-200"
      >
        {/* FORM */}
        <form onSubmit={handleUpdate} className="space-y-6">

          {/* Event Title */}
          <div>
            <label className="font-semibold text-slate-700">Event Title</label>
            <input
              name="event_title"
              defaultValue={eventData.event_title}
              required
              className="mt-2 w-full p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* Event Description */}
          <div>
            <label className="font-semibold text-slate-700">Description</label>
            <textarea
              name="event_description"
              defaultValue={eventData.event_description}
              required
              className="mt-2 w-full p-3 border rounded-xl h-32 focus:ring-2 focus:ring-slate-400"
            ></textarea>
          </div>

          {/* Venue */}
          <div>
            <label className="font-semibold text-slate-700">Venue</label>
            <input
              name="event_venue"
              defaultValue={eventData.event_venue}
              required
              className="mt-2 w-full p-3 border rounded-xl focus:ring-2 focus:ring-slate-400"
            />
          </div>

          {/* READ-ONLY Date */}
          <div>
            <label className="font-semibold text-slate-700">Event Date</label>
            <input
              type="date"
              value={eventData.event_date}
              readOnly
              className="mt-2 w-full p-3 border rounded-xl bg-slate-100 cursor-not-allowed"
            />
          </div>

          {/* READ-ONLY Time */}
          <div>
            <label className="font-semibold text-slate-700">Event Time</label>
            <input
              type="time"
              value={eventData.event_time}
              readOnly
              className="mt-2 w-full p-3 border rounded-xl bg-slate-100 cursor-not-allowed"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-700 transition"
            >
              Update Event
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
