import React, { useEffect, useState, useRef } from "react";
import { api } from "../../api/backend.axios";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Project() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState(null);

  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  // RESET cardRefs when project count changes
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, projects.length);
  }, [projects]);

   
  // FETCH ALL PROJECTS
 
  useEffect(() => {
    api
      .get("/project/getallproject", { withCredentials: true })
      .then((res) => {
        console.log("pROJECT",res.data.data)
        const d = res.data;
        const list =
          Array.isArray(d) ? d :
          Array.isArray(d.data) ? d.data :
          Array.isArray(d.projects) ? d.projects :
          Array.isArray(d.project) ? d.project : [];

        setProjects(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

   
  // LENIS SMOOTH SCROLL + GSAP animations
  
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(t) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (!loading && projects.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(gsap.utils.toArray(".project-card"), {
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

  
  // DELETE PROJECT
  
  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await api.delete(`/project/deleteproject/${id}`);

      // Remove from UI instantly
      setProjects((prev) => prev.filter((p) => p.project_id !== id));

      alert("Project deleted successfully!");
    } catch (err) {
      alert("Delete failed.");
    }
  };

  
  // PARALLAX EFFECT
  
  const handlePointerMove = (e, index) => {
    const el = cardRefs.current[index];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const tiltX = (0.5 - y) * 10;
    const tiltY = (x - 0.5) * 12;

    el.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const handlePointerLeave = (index) => {
    const el = cardRefs.current[index];
    if (el) {
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    }
  };


  // SKELETON LOADER
  
  const Skeleton = () => (
    <div className="animate-pulse bg-white rounded-3xl p-8 shadow-md min-h-[360px]" />
  );

  return (
    <div className="min-h-screen bg-[#eef2f6] pt-20 px-6 sm:px-10 lg:px-16 pb-28">

      {/* PAGE TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
      >
        Projects
      </motion.h1>
       <button
        onClick={() => navigate("/AddProject")}
        className="fixed bottom-10 right-10 bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl hover:bg-slate-700"
      >
        + Add Project
      </button>

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-10 ">
          <Skeleton /> <Skeleton /> <Skeleton />
          <Skeleton /> <Skeleton /> <Skeleton />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-slate-600 text-xl">
          No projects found.
        </div>
      ) : (
        <div
          ref={gridRef}
          className=" grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-10"
        >
          {projects.map((item, index) => (
            <div
              key={item.project_id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="project-card bg-white rounded-3xl p-8 shadow-xl border border-gray-400 relative overflow-hidden"
              style={{ transformStyle: "preserve-3d", minHeight: 360 }}
              onPointerMove={(e) => handlePointerMove(e, index)}
              onPointerLeave={() => handlePointerLeave(index)}
            >
            
              {/* TITLE */}
             <div className=" flex justify-between">
               <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {item.project_title}
              </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteProject(item.project_id)}
                  className="px-[18px]  py-[10px] text-sm rounded-full  bg-red-100 transition-all duration-500 text-white hover:bg-red-400"
                >
                  X
                </motion.button>
             </div>

              {/* META */}
              <p className="text-sm text-slate-700">
                <strong>Organization:</strong> {item.organization}
              </p>
              <p className="text-sm text-slate-700">
                <strong>Admin:</strong> {item.admin_user_name}
              </p>
              <p className="text-sm text-slate-700 mb-4">
                <strong>Date:</strong> {item.project_date}
              </p>

              {/* DESCRIPTION */}
              <p className="text-slate-600 text-sm line-clamp-3">
                {item.description}
              </p>

              {/* ACTION BUTTONS */}
              <div className="mt-20 flex gap-3">
                {/* VIEW */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewItem(item)}
                  className="w-20 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-700"
                >
                  View
                </motion.button>

                {/* EDIT */}
                {/* <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/editProject/${item.project_id}`)}
                  className="px-4 py-3 rounded-xl border border-slate-900 text-slate-900 font-semibold hover:bg-slate-100"
                >
                  Edit
                </motion.button> */}

                {/* DELETE */}
                
              </div>
            </div>
          ))}
        </div>
      )}

      {/*
          VIEW MODAL
   */}
      <AnimatePresence>
        {viewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
            onClick={() => setViewItem(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-[92%] max-w-xl p-10"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {viewItem.project_title}
              </h2>

              <p className="text-slate-700 mb-2">
                <strong>Organization:</strong> {viewItem.organization}
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Admin:</strong> {viewItem.admin_user_name}
              </p>
              <p className="text-slate-700 mb-4">
                <strong>Date:</strong> {viewItem.project_date}
              </p>

              <p className="text-slate-600">{viewItem.description}</p>

              <button
                onClick={() => setViewItem(null)}
                className="mt-8 w-full py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-700"
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
