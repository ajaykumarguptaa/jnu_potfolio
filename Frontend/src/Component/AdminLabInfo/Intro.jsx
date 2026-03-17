import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { api } from "../../../api/backend.axios";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/admininfo/")
      .then((res) => {
        // console.log("Admin Info:", res.data);
        setAdmin(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !admin) {
    return (
      <div className="text-center py-20 text-xl animate-pulse">Loading…</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-auto mt-16"
    >
      {/* MAIN CARD */}
      <div className="flex flex-wrap justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            relative
            m-4 w-[95%] 
            bg-gradient-to-r from-blue-50 via-cyan-50 to-purple-50 
            rounded-2xl shadow-[5px_5px_15px] border-2 border-black
            hover:scale-[1.03] hover:shadow-[0px_10px_24px_rgba(144,194,247,1)] hover:border-black
            transition-all duration-300
            flex flex-row gap-8 items-center p-6

            max-[1024px]:gap-4
            max-[768px]:flex-col max-[768px]:items-center max-[768px]:text-center
          "
        >

          {/*  EDIT BUTTON  */}
          {/* <button
            onClick={() => navigate(`/admininfo/edit/${admin.adminIndo_id}`)}
            className="
              absolute top-4 right-4
              bg-purple-500 text-white px-4 py-2 rounded-xl
              shadow-lg font-semibold
              hover:bg-purple-600 hover:scale-105 transition-all
            "
          >
            Edit
          </button> */}

           {/* <button
            onClick={() => navigate(`/admininfo/create`)}
            className="
              absolute top-4 right-24
              bg-purple-500 text-white px-4 py-2 rounded-xl
              shadow-lg font-semibold
              hover:bg-purple-600 hover:scale-105 transition-all
            "
          >
            Create
          </button> */}

          {/* IMAGE */}
          <motion.img
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src={admin.profile_picture}
            alt={admin.name}
            className="
              w-52 h-60 object-cover rounded-2xl border-2 border-[#90c2f7]

              max-[1024px]:w-48 max-[1024px]:h-56
              max-[768px]:w-40 max-[768px]:h-48
              max-[480px]:w-32 max-[480px]:h-40
              max-[280px]:w-24 max-[280px]:h-32
            "
          />

          {/* TEXT SECTION */}
          <div className="w-[70%] max-[768px]:w-[90%] max-[480px]:w-full">
            <h1
              className="
                text-4xl font-bold text-black mb-2
                max-[768px]:text-3xl
                max-[480px]:text-2xl
              "
            >
              {admin.name}
            </h1>

            <h2
              className="
                text-2xl text-black mb-3
                max-[768px]:text-xl
                max-[480px]:text-lg
              "
            >
              {admin.role}
            </h2>

            <p
              className="
                text-base leading-relaxed text-gray-800
                max-[1024px]:text-lg 
                max-[768px]:text-base
                max-[480px]:text-sm
              "
            >
              {admin.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* LAB INFO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mx-3"
      >
        <p
          className="
            bg-gradient-to-r from-blue-50 to-purple-50 
            border-2 border-black rounded-2xl shadow-[0px_4px_12px_rgba(142,68,173,0.2)]
            py-5 px-6 my-8 w-[90%]  mx-auto
            leading-7 text-gray-900 text-base
            transition-all duration-300 
            hover:scale-105 hover:shadow-lg hover:border-blue-300

            max-[768px]:text-sm
            max-[480px]:py-3 max-[480px]:px-3
          "
        >
          <strong className="font-bold text-black">Bio-computational Lab — </strong>
          {admin.labInfo}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Intro;
