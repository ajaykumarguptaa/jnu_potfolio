import React, { useEffect, useState, useRef } from "react";
import { api } from "../../../../api/backend.axios";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectAccess() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState(null);

  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, projects.length);
  }, [projects]);

  // FETCH
  useEffect(() => {
    api
      .get("/project/getallproject", { withCredentials: true })
      .then((res) => {
        const list = res?.data?.data || [];
        setProjects(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // LENIS + GSAP
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });

    function raf(t) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (!loading && projects.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(".project-card", {
          opacity: 0,
          y: 40,
          duration: 0.8,
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
  }, [loading, projects]);

  // DELETE
  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await api.delete(`/project/deleteproject/${id}`);
      setProjects((prev) => prev.filter((p) => p.project_id !== id));
      alert("Deleted!");
    } catch {
      alert("Delete failed");
    }
  };

  // PARALLAX
  const handlePointerMove = (e, index) => {
    const el = cardRefs.current[index];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 12}deg)`;
  };

  const handlePointerLeave = (index) => {
    const el = cardRefs.current[index];
    if (el) {
      el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    }
  };

  const Skeleton = () => (
    <div className="animate-pulse bg-white rounded-3xl p-8 shadow-md min-h-[360px]" />
  );

  return (
    <div className="min-h-screen bg-[#eef2f6] pt-20 px-6 sm:px-10 lg:px-16 pb-28">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl font-extrabold mb-6"
      >
        Projects
      </motion.h1>

      {/* ADD PROJECT BUTTON */}
      <button
        onClick={() => navigate("/AddProject")}
        className="fixed bottom-10 right-10 bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl hover:bg-slate-700 transition"
      >
        + Add Project
      </button>

      {/* CONTENT */}
      {loading ? (
        <div className="grid grid-cols-1 gap-10">
          {[...Array(6)].map((_, i) => <Skeleton key={i} />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-xl">
          No projects found.
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 gap-10">
          {projects.map((item, index) => (
            <div
              key={item.project_id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="project-card bg-white rounded-3xl p-8 shadow-xl border"
              onPointerMove={(e) => handlePointerMove(e, index)}
              onPointerLeave={() => handlePointerLeave(index)}
            >
              <div className="flex justify-between">
                <h3 className="text-2xl font-bold">
                  {item.project_title}
                </h3>

                <button
                  onClick={() => deleteProject(item.project_id)}
                  className="bg-red-500 text-white px-3 rounded"
                >
                  X
                </button>
              </div>

              <p><b>Org:</b> {item.organization}</p>
              <p><b>Admin:</b> {item.admin_user_name}</p>
              <p><b>Date:</b> {item.project_date}</p>

              <p className="mt-2 text-gray-600">
                {item.description}
              </p>

              <div className="mt-4">
                <button
                  onClick={() => setViewItem(item)}
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {viewItem && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center"
            onClick={() => setViewItem(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-8 rounded-xl"
            >
              <h2 className="text-2xl font-bold">
                {viewItem.project_title}
              </h2>
              <p>{viewItem.description}</p>

              <button
                onClick={() => setViewItem(null)}
                className="mt-4 bg-black text-white px-4 py-2 rounded"
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