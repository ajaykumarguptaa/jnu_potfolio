import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../api/backend.axios";

export default function SmoothHorizontalSlider() {
  const scrollRef = useRef(null);
  const [pause, setPause] = useState(false);
  const [photos, setPhotos] = useState([]);

  // Fetch Photos from Backend
  useEffect(() => {
    api
      .get("/photoGallery/all")
      .then((res) => {
        console.log("Gallery Images:", res.data);
        setPhotos(res.data);
      })
      .catch((err) => console.error("Error loading gallery:", err));
  }, []);

  // Auto scrolling
  useEffect(() => {
    const slider = scrollRef.current;

    const autoScroll = () => {
      if (slider && !pause) {
        slider.scrollLeft += 1.2;

        // Smooth infinite loop
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          slider.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(autoScroll, 15);
    return () => clearInterval(interval);
  }, [pause, photos]);

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-sky-50 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Gallery</h1>

      {/* Slider */}
      <motion.div
        ref={scrollRef}
        className="
          w-[90%] md:w-[80%]
          overflow-x-scroll overflow-y-hidden
          flex gap-6 pb-4
          scrollbar-hide scroll-smooth
          cursor-grab active:cursor-grabbing
        "
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
      >
        {/* Original list */}
        {photos.map((img, i) => (
          <motion.div
            key={img.photo_id}
            whileHover={{ scale: 1.05 }}
            className="
              min-w-[320px] h-[220px]
              md:min-w-[420px] md:h-[260px]
              rounded-2xl overflow-hidden shadow-lg bg-white
              transition-transform duration-300
            "
          >
            <img
              src={img.photo_url}
              alt={img.caption}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

        {/* Duplicate list for infinite effect */}
        {photos.map((img, i) => (
          <motion.div
            key={`dup-${img.photo_id}`}
            whileHover={{ scale: 1.05 }}
            className="
              min-w-[320px] h-[220px]
              md:min-w-[420px] md:h-[260px]
              rounded-2xl overflow-hidden shadow-lg bg-white
              transition-transform duration-300
            "
          >
            <img
              src={img.photo_url}
              alt={img.caption}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
