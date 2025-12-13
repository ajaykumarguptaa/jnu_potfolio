import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const dashboardButtons = [
    { label: "Administrative Positions / Activities", to: "/activity/position" },
    { label: "Awards / Honors", to: "/awards/honors" },
    { label: "Academic Career / Member", to: "/careermember" },
    { label: "Other Activities", to: "/otherActivities" },
    { label: "Add Photos to Gallery", to: "/gallery" },
    { label: "Add Project", to: "projectAccess" },
    { label: "Reacerch", to: "researchAccess" },
    { label: "Alumni  ", to: "memberAccess" },
    { label: "Current Member  ", to: "CurrentMember" },
    { label: "Interns  ", to: "InternAccess" },
    { label: "Event", to: "EventAccess" },
    { label: "Admin Info", to: "AdminInfoAccess" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-4">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl mb-10"
      >
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage all website activities from one place.
        </p>
      </motion.div>

      {/* GRID BUTTONS */}
      <div
        className="
          w-full max-w-5xl
          grid grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-6
        "
      >
        {dashboardButtons.map((btn, idx) => (
          <motion.button
            key={idx}
            onClick={() => navigate(btn.to)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              w-full py-6 px-6
              rounded-2xl
              bg-white 
              shadow-md 
              hover:shadow-xl 
              transition-all 
              text-gray-700
              font-semibold
              border border-gray-200
            "
          >
            {btn.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
