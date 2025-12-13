import React, { useEffect, useState } from "react";
import { api } from "../../../api/backend.axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function InternList() {
  const navigate = useNavigate();
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState(null);

  useEffect(() => {
    api
      .get("/interns/")
      .then((res) => {
        setInterns(res.data || []);
        console.log("Intern Data:", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  const deleteIntern = async (id) => {
    if (!window.confirm("Delete this Intern?")) return;

    try {
      await api.delete(`/intern/delete/${id}`);
      setInterns((prev) => prev.filter((i) => i.intern_id !== id));
      alert("Intern deleted");
    } catch (err) {
      console.error(err);
    }
  };

  // Card animation
  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#eef2f6] pt-28 px-6 pb-20"
    >
      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl font-bold mb-8"
      >
        Interns
      </motion.h1>

      {/* ADD INTERN BUTTON */}
      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-10 right-10 bg-black text-white px-6 py-3 rounded-full shadow-xl"
        onClick={() => navigate("/Interns/create")}
      >
        + Add Intern
      </motion.button> */}

      {/* LOADING */}
      {loading ? (
        <div className="text-center pt-20 text-xl">Loading...</div>
      ) : interns.length === 0 ? (
        <p className="text-center mt-20 text-lg">No Interns Found</p>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {interns.map((i, index) => (
            <motion.div
              key={i.intern_id}
              variants={cardVariant}
              custom={index}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 30px rgba(0,0,0,0.15)",
              }}
              transition={{ type: "spring", stiffness: 170 }}
              className="bg-white p-8 rounded-3xl shadow-lg text-center border border-gray-200 cursor-pointer"
            >
              {/* IMAGE */}
              <motion.img
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                src={i.profile_picture}
                className="w-28 h-28  rounded-full overflow-hidden border-slate-950 transition-all duration-500 hover:shadow-xl shadow-slate-700 hover:border-0 object-cover  mx-auto mb-4 shadow"
              />
              <div className="space-y-2 text-left mt-4">
                <p className="text-sm font-semibold text-slate-900">
                  Name:{" "}
                  <span className="font-normal text-slate-700">{i.name}</span>
                </p>

                <p className="text-sm font-semibold text-slate-900">
                  Role:{" "}
                  <span className="font-normal text-slate-700">{i.role}</span>
                </p>

                <p className="text-sm font-semibold text-slate-900">
                  Mobile:{" "}
                  <span className="font-normal text-slate-700">{i.mobile}</span>
                </p>

                <p className="text-sm font-semibold text-slate-900">
                  Email:{" "}
                  <span className="font-normal text-slate-700">{i.email}</span>
                </p>

                <p className="text-sm font-semibold text-slate-900">
                  Google Scholar:{" "}
                  <span className="font-normal text-slate-700">
                    {i.google_scholar ? (
                      <a
                        href={i.google_scholar}
                        target="_blank"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        View Profile
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </span>
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 justify-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setViewItem(i)}
                  className="px-4 py-2 bg-black text-white rounded-xl"
                >
                  View
                </motion.button>

                {/* <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => navigate(`/Interns/edit/${i.intern_id}`)}
                  className="px-4 py-2 border border-black rounded-xl"
                >
                  Edit
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => deleteIntern(i.intern_id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl"
                >
                  X
                </motion.button> */}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {viewItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setViewItem(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-white p-10 rounded-3xl max-w-lg w-[90%] shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={viewItem.profile_picture}
                className="w-32 h-32 mx-auto rounded-full mb-4 shadow"
              />

              <h2 className="text-3xl text-center font-bold">
                {viewItem.name}
              </h2>
              <p className="text-center mt-1 text-slate-700">{viewItem.role}</p>

              {/* FULL DETAILS */}
              <div className="mt-6 text-center text-slate-800 space-y-2">
                <p>
                  <strong>Email:</strong> {viewItem.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {viewItem.mobile}
                </p>
                <p>
                  <strong>Address:</strong> {viewItem.address}
                </p>

                {viewItem.google_scholar && (
                  <p>
                    <strong>Google Scholar:</strong>
                    <a
                      className="text-blue-600 underline ml-1"
                      href={viewItem.google_scholar}
                    >
                      Profile
                    </a>
                  </p>
                )}

                <p className="mt-4">{viewItem.description}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-6 w-full py-3 bg-black text-white rounded-xl"
                onClick={() => setViewItem(null)}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
