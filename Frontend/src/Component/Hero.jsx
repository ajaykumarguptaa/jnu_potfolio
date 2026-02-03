import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Welcome to Health Informatics",
    line: (
      <>
        <span className="text-blue-600 font-semibold">Advancing</span> Bioinformatics &{" "}
        <span className="text-lime-500 font-semibold">Computational Biology</span>
      </>
    ),
    gradient: "from-blue-50 via-sky-50 to-cyan-50",
  },
  {
    title: "We Believe We Can Always Do More",
    line: (
      <>
        <span className="text-purple-600 font-semibold">Transforming</span> Biological Research through{" "}
        <span className="text-green-500 font-semibold">Computational Excellence</span>
      </>
    ),
    gradient: "from-purple-50 via-pink-50 to-cyan-50",
  },
  {
    title: "Going Beyond is Our Purpose",
    line: (
      <>
        <span className="text-pink-500 font-semibold">Transforming</span> Healthcare with{" "}
        <span className="text-blue-500 font-semibold">Computational Research</span>
      </>
    ),
    gradient: "from-pink-50 via-blue-50 to-cyan-50",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  // Auto-slide
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timerRef.current);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div
      className={`w-full min-h-[500px] md:min-h-[650px] pt-24 relative overflow-hidden
        bg-gradient-to-br ${slides[index].gradient} 
        flex items-center justify-center`}
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={() => {
        timerRef.current = setInterval(() => {
          setIndex((prev) => (prev + 1) % slides.length);
        }, 4500);
      }}
    >

      {/* --- Animated Glow Behind Content (Premium Effect) --- */}
      <motion.div
        className="absolute inset-0 blur-3xl opacity-40"
        animate={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.5), transparent 70%)",
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      {/* SLIDE CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.9 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-20 text-center px-6 max-w-4xl"
        >
          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-gray-900 drop-shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {slides[index].title}
          </motion.h1>

          {/* Subline */}
          <motion.p
            className="mt-5 text-lg md:text-2xl font-medium text-gray-800"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            {slides[index].line}
          </motion.p>

          {/* Floating bottom shimmer */}
          <motion.div
            className="mt-10 h-1 w-40 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
            animate={{ width: ["40px", "120px", "60px", "140px"] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-5xl text-gray-700
        hover:text-blue-600 transition transform hover:scale-125 z-30"
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-5xl text-gray-700
        hover:text-blue-600 transition transform hover:scale-125 z-30"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 flex gap-3 z-30">
        {slides.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer 
              ${index === i ? "bg-blue-600 scale-125" : "bg-gray-400"}`}
            animate={index === i ? { scale: 1.4 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
}
