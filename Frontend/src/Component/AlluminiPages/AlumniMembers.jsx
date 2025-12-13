import React, { useEffect, useState, useRef } from "react";
import { api } from "../../../api/backend.axios";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function AlumniMembers() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState(null);

  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  // Fetch all members
  useEffect(() => {
    api
      .get("/almember/get", { withCredentials: true })
      .then((res) => {
        console.log(res.data )
        setMembers(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  // Smooth scroll + GSAP
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

    function raf(t) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (!loading && members.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(".member-card", {
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
  }, [loading, members]);

  // Delete member
  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await api.delete(`/almember/delete/${id}`, { withCredentials: true });
      setMembers((prev) => prev.filter((m) => m.Alunni_id !== id));
      alert("Member deleted successfully!");
    } catch (err) {
      alert("Delete failed.");
    }
  };

  // 3D hover effect
  const handleMove = (e, index) => {
    const el = cardRefs.current[index];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 12}deg) rotateY(${(x - 0.5) * 14}deg)`;
  };

  const handleLeave = (index) => {
    const el = cardRefs.current[index];
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  const Skeleton = () => (
    <div className="animate-pulse bg-white rounded-3xl p-8 shadow-md min-h-[330px]" />
  );

  return (
    <div className="min-h-screen bg-[#eef2f6] pt-24 px-6 sm:px-10 lg:px-16 pb-28">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
      >
       Alumni
      </motion.h1>

      {/* ADD BTN */}
      {/* <button
        onClick={() => navigate("/Alumni/create")}
        className="fixed bottom-10 right-10 bg-slate-900 text-white px-6 py-4 rounded-full shadow-xl hover:bg-slate-700 text-lg"
      >
        + Add Member
      </button> */}

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <Skeleton /> <Skeleton /> <Skeleton />
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-20 text-slate-600 text-xl">No members found.</div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {members.map((m, index) => (
            <div
              key={m.Alunni_id}
              ref={(el) => (cardRefs.current[index] = el)}
              onPointerMove={(e) => handleMove(e, index)}
              onPointerLeave={() => handleLeave(index)}
              className="member-card bg-white rounded-3xl p-8 shadow-xl border border-gray-200 overflow-hidden"
              style={{ minHeight: 360, transformStyle: "preserve-3d" }}
            >
              <div className="flex justify-end">
               {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => deleteMember(m.Alunni_id)}
                  className="px-4 py-2 bg-red-200 text-white rounded-full hover:bg-red-400 transition-all duration-300 border-[1px] border-slate-400 hover:shadow-black "
                >X</motion.button> */}
              </div>
              <img
                src={m.profile_picture}
                className="w-28 h-28 rounded-full object-cover border mx-auto mb-4 shadow"
              />

              <h3 className="text-2xl font-bold text-center text-slate-900">{m.name}</h3>

              <p className="text-center text-slate-700 mb-3"><strong>Role:</strong> {m.role}</p>

              <p className="text-slate-600 text-sm line-clamp-2 text-center">{m.description}</p>

              <div className="mt-8 flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setViewItem(m)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl"
                >View</motion.button>

                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate(`/Alumni/edit/${m.Alunni_id}`)}
                  className="px-4 py-2 border border-slate-900 text-slate-900 rounded-xl"
                >Edit</motion.button> */}

                
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODAL */}
      <AnimatePresence>
        {viewItem && (
          <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[999]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setViewItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-10 max-w-lg w-[90%] shadow-2xl"
            >
              <img src={viewItem.profile_picture} className="w-32 h-32 rounded-full mx-auto mb-4" />

              <h2 className="text-3xl text-center font-bold">{viewItem.name}</h2>
              <p className="text-center text-slate-700"><strong>Role:</strong> {viewItem.role}</p>
              <p className="text-slate-600 mt-4 text-center">{viewItem.description}</p>

              <button
                className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl"
                onClick={() => setViewItem(null)}
              >Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
