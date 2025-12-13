import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../../api/backend.axios";

function AlumniSlider() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH ALUMNI
  useEffect(() => {
    api
      .get("/almember/get", { withCredentials: true })
      .then((res) => {
        console.log("Alumni Data:", res.data);

        // Parse JSON fields safely
        const parsed = res.data.map((item) => ({
          ...item,
          education: item.education
            ? JSON.parse(item.education)?.education
            : "",
          description: item.description
            ,
          research_interests: item.research_interests
            ? JSON.parse(item.research_interests)?.research_interests
            : "",
        }));

        setMembers(parsed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching members:", err);
        setLoading(false);
      });
  }, []);

  // AUTO DISABLE LOOP WHEN NOT ENOUGH SLIDES
  const loopMode = members.length > 3;

  if (loading)
    return <div className="text-center py-10 animate-pulse">Loading…</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-[90%] mx-auto py-10 px-4"
    >
      <h1 className="text-3xl font-bold text-center mb-6">Alumni</h1>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={loopMode} // FIXED
        autoplay={loopMode ? { delay: 2000 } : false}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1, pagination: false },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="rounded-2xl"
      >
        {members.map((d) => (
          <SwiperSlide key={d.Alunni_id}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-blue-100 h-110 w-90 shadow-md rounded-2xl border
                         overflow-hidden hover:shadow-xl transition-shadow duration-300
                         max-[380px]:w-75"
            >
              {/* IMAGE */}
              <div className="flex justify-center h-62 bg-blue-50">
                <img
                  src={d.profile_picture}
                  alt={d.name}
                  className="h-60 w-60 rounded-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* TEXT */}
              <div className="text-center p-4">
                <h3 className="text-2xl font-semibold mb-2"><span className="text-black font-bold">Name: </span>{d.name}</h3>

                {/* EDUCATION (parsed JSON) */}
                <p className="text-gray-600"><span className="text-black font-bold">Education: </span>{d.education}</p>

                {/* EMAIL */}
                <p className="text-gray-600"><span className="text-black font-bold">@Email: </span>{d.email}</p>

                {/* MORE BUTTON */}
                {/* <button
                  onClick={() => navigate(`/alumni/${d.Alunni_id}`)}
                  className="mt-3 bg-purple-300 text-white text-lg px-4 py-1.5 
                             rounded-xl hover:bg-purple-400 hover:scale-105 transition-transform"
                >
                  More
                </button> */}

                <Outlet />
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}

export default AlumniSlider;
