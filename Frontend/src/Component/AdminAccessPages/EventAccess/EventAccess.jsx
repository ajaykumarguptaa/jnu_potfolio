// src/components/EventList.jsx
import React, { useEffect, useState, useRef } from "react";
import { api } from "../../../../api/backend.axios";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function EventAccess() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewEvent, setViewEvent] = useState(null);

  const gridRef = useRef(null);

  // GET ALL EVENTS
  useEffect(() => {
    api
      .get("/events/allevent")
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Smooth scroll + GSAP
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(t) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (!loading && events.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(".event-card", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        });
      });
      return () => ctx.revert();
    }
  }, [loading, events]);

  // 3D hover effect
  const handlePointerMove = (e, ref) => {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;

    el.style.transform = `perspective(900px) rotateX(${
      (0.5 - y) * 10
    }deg) rotateY(${(x - 0.5) * 10}deg)`;
  };

  const handlePointerLeave = (ref) => {
    
    const el = ref.current;
    if (el)
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  // Delete Event
  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await api.delete(`/events/delete/${id}`);
      setEvents((prev) => prev.filter((e) => e.event_id !== id));
      alert("Event deleted");
    } catch (err) {
      alert("Delete failed");
    }
  };

  // Skeleton card
  const Skeleton = () => (
    <div className="animate-pulse bg-white rounded-3xl p-8 shadow-md min-h-[360px]" />
  );

  return (
    <div className="min-h-screen bg-[#eef2f6] pt-20 px-6 sm:px-10 lg:px-16 pb-28">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
      >
        Events
      </motion.h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/createevent")}
          className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-700 shadow-md"
        >
          + Add Event
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-10">
          <Skeleton /> <Skeleton /> <Skeleton />
        </div>
      ) : (
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-10"
        >
          {events.map((event) => {
            const ref = React.createRef();
            return (
              <div
                key={event.event_id}
                ref={ref}
                className="event-card bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
                style={{ transformStyle: "preserve-3d", minHeight: 360 }}
                onPointerMove={(e) => handlePointerMove(e, ref)}
                onPointerLeave={() => handlePointerLeave(ref)}
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {event.event_title}
                </h3>

                <p className="text-slate-700 text-sm">
                  <strong>Venue:</strong> {event.event_venue}
                </p>
                <p className="text-slate-700 text-sm">
                  <strong>Date:</strong> {event.event_date}
                </p>
                <p className="text-slate-700 text-sm">
                  <strong>Time:</strong> {event.event_time}
                </p>

                <p className="text-slate-600 text-sm mt-3 line-clamp-3">
                  {event.event_description}
                </p>

                <div className="onAdminregister w-xl">
                  <div className="mt-14 flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewEvent(event)}
                      className="w-20 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-700"
                    >
                      View
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/editevent/${event.event_id}`)}
                      className="px-4 py-3 rounded-xl border border-slate-900 text-slate-900 hover:bg-slate-100"
                    >
                      Edit
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteEvent(event.event_id)}
                      className="px-4 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600"
                    >
                      X
                    </motion.button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODAL */}
      <AnimatePresence>
        {viewEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
            onClick={() => setViewEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-[92%] max-w-xl p-10"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {viewEvent.event_title}
              </h2>

              <p>
                <strong>Venue:</strong> {viewEvent.event_venue}
              </p>
              <p>
                <strong>Date:</strong> {viewEvent.event_date}
              </p>
              <p>
                <strong>Time:</strong> {viewEvent.event_time}
              </p>

              <p className="mt-4 text-slate-700">
                {viewEvent.event_description}
              </p>

              <button
                onClick={() => setViewEvent(null)}
                className="mt-8 w-full py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-700"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
