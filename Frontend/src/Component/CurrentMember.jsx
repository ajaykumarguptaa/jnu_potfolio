// src/components/Members.jsx
import React, { useEffect, useState, useRef } from "react";
import { api } from "../../api/backend.axios";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Members() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState(null);

  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    api
      .get("/member/allmember", { withCredentials: true })
      .then((res) => {
        console.log("Members Data:", res);
        setMembers(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching members:", err);
        setLoading(false);
      });
  }, []);
  // Smooth Scroll + GSAP
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });

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
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        });
      });

      return () => ctx.revert();
    }
  }, [loading, members]);

  // Delete Member
  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await api.delete(`/member/${id}`, { withCredentials: true });

      setMembers((prev) => prev.filter((m) => m.member_id !== id));
      alert("Member deleted!");
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  // 3D Tilt
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
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  const Skeleton = () => (
    <div className="animate-pulse bg-white rounded-3xl p-8 shadow-md `min-h-[320px]`" />
  );

  return (
    <div className="min-h-screen bg-[#eef2f6] pt-2 px-6 sm:px-10 lg:px-16 pb-18">

      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
      >
        Members
      </motion.h1>

      {/* ADD MEMBER BUTTON */}
      {/* <button
        onClick={() => navigate("/addMember")}
        className="fixed top-30 right-10 bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl hover:bg-slate-700"
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
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {members.map((item, index) => (
            <div
              key={item.member_id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="member-card bg-white rounded-3xl p-8 shadow-xl border border-gray-200 overflow-hidden"
              style={{ transformStyle: "preserve-3d", minHeight: 350 }}
              onPointerMove={(e) => handlePointerMove(e, index)}
              onPointerLeave={() => handlePointerLeave(index)}
            >
              {/* IMAGE */}
              <img
                src={item.profile_picture}
                alt="profile"
                className="w-28 h-28 object-cover rounded-full border mx-auto mb-4 shadow"
              />

              {/* NAME */}
              <h3 className="text-2xl font-bold text-slate-900 text-center">
                {item.member_name}
              </h3>

              {/* ROLE */}
              <p className="text-center text-slate-700 mb-3">
                <strong>Role:</strong> {item.role}
              </p>

              {/* DESCRIPTION */}
              <p className="text-slate-600 text-sm line-clamp-3 text-center">
                {item.description}
              </p>

              {/* BUTTONS */}
              <div className="mt-8 flex gap-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewItem(item)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-700"
                >
                  View
                </motion.button>

                {/* <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/editMember/${item.member_id}`)}
                  className="px-4 py-2 rounded-xl border border-slate-900 text-slate-900 hover:bg-slate-100"
                >
                  Edit
                </motion.button> */}

                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteMember(item.member_id)}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                >
                  X
                </motion.button> */}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODAL */}
      <AnimatePresence>
        {viewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewItem(null)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-[92%] max-w-lg p-10"
            >
              <img
                src={viewItem.profile_picture}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />

              <h2 className="text-3xl text-center font-bold text-slate-900">
                {viewItem.member_name}
              </h2>

              <p className="text-center text-slate-700 mt-2">
                <strong>Role:</strong> {viewItem.role}
              </p>

              <p className="text-slate-600 mt-4 text-center">{viewItem.description}</p>

              <button
                onClick={() => setViewItem(null)}
                className="mt-6 w-full py-3 rounded-xl bg-slate-900 text-white"
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
