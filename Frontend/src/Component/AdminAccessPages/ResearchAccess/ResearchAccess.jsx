import React, { useEffect, useState, useRef } from "react";
import { api } from "../../../../api/backend.axios";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function ResearchAccess() {
  const navigate = useNavigate();

  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState(null);

  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, research.length);
  }, [research]);

  // ✅ FIXED FETCH RESEARCH
  useEffect(() => {
    api
      .get("/research/GetResearch", { withCredentials: true })
      .then((res) => {
        console.log("RESEARCH API RESPONSE:", res.data);

        let result = res.data;
        let list = [];

        if (Array.isArray(result)) {
          list = result;
        } else if (Array.isArray(result?.data)) {
          list = result.data;
        } else if (Array.isArray(result?.research)) {
          list = result.research;
        }

        setResearch(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // LENIS + GSAP
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });

    const raf = (t) => {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    if (!loading && research.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(".research-card", {
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
  }, [loading, research]);

  // DELETE
  const deleteResearchItem = async (id) => {
    if (!window.confirm("Delete this research?")) return;

    try {
      await api.delete(`/research/DeleteResearch/${id}`);

      setResearch((prev) => prev.filter((r) => r.research_id !== id));

      alert("Research deleted successfully!");
    } catch (err) {
      alert("Delete failed.");
    }
  };

  // PARALLAX
  const handlePointerMove = (e, index) => {
    const el = cardRefs.current[index];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 10}deg) rotateY(${x - 0.5} * 12deg)`;
  };

  const handlePointerLeave = (index) => {
    const el = cardRefs.current[index];
    if (el) {
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    }
  };

  const Skeleton = () => (
    <div className="animate-pulse bg-white rounded-3xl p-8 shadow-md min-h-[320px]" />
  );

  return (
    <div className="min-h-screen bg-[#eef2f6] pt-20 px-6 sm:px-10 lg:px-16 pb-28">

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
      >
        Research Work
      </motion.h1>

      <button
        onClick={() => navigate("/AddResearch")}
        className="fixed bottom-10 right-10 bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl hover:bg-slate-700"
      >
        + Add Research
      </button>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-10">
          <Skeleton /> <Skeleton /> <Skeleton />
          <Skeleton /> <Skeleton /> <Skeleton />
        </div>
      ) : research.length === 0 ? (
        <div className="text-center py-20 text-slate-600 text-xl">
          No research records found.
        </div>
      ) : (
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-10"
        >
          {research.map((item, index) => (
            <div
              key={item.research_id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="research-card bg-white rounded-3xl p-8 shadow-xl border border-gray-200 overflow-hidden"
              style={{ minHeight: 320, transformStyle: "preserve-3d" }}
              onPointerMove={(e) => handlePointerMove(e, index)}
              onPointerLeave={() => handlePointerLeave(index)}
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                {item.research_title}
              </h3>

              <p className="text-sm text-slate-700 mb-1">
                <strong>Field:</strong> {item.field}
              </p>
              <p className="text-sm text-slate-700 mb-3">
                <strong>Researcher:</strong> {item.admin_user_name}
              </p>

              <p className="text-slate-600 text-sm line-clamp-3">
                {item.description}
              </p>

              <div className="mt-10 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewItem(item)}
                  className="w-20 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-700"
                >
                  View
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/EditResearch/${item.research_id}`)}
                  className="px-4 py-3 rounded-xl border border-slate-900 text-slate-900 hover:bg-slate-100"
                >
                  Edit
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteResearchItem(item.research_id)}
                  className="px-4 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600"
                >
                  X
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      )}

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
              transition={{ type: "spring", stiffness: 130 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-[92%] max-w-xl p-10"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {viewItem.research_title}
              </h2>

              <p className="text-slate-700 mb-2">
                <strong>Field:</strong> {viewItem.field}
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Researcher:</strong> {viewItem.admin_user_name}
              </p>

              <p className="text-slate-600 mb-4">
                {viewItem.description}
              </p>

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
