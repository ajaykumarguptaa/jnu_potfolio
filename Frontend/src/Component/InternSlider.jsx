import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
 
import { api } from "../../api/backend.axios";

function InternSlider() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH INTERNS
  useEffect(() => {
    api
      .get("/interns/")
      .then((res) => {
        const data = res.data || [];

        // 🔥 Fix loop: Duplicate slides if less than 6
        let finalSlides = data;
        if (data.length > 0 && data.length < 6) {
          const repeatTimes = Math.ceil(6 / data.length);
          finalSlides = Array(repeatTimes).fill(data).flat();
        }

        setMembers(finalSlides);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-center py-10 text-lg animate-pulse">Loading…</div>;

  return (
    <div className="max-w-[90%] mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Interns</h1>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}                       //
        autoplay={{
          delay: 1800,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="rounded-2xl"
      >
        {members.map((d, index) => (
          <SwiperSlide key={index}>
            <div className="bg-blue-100 h-110 w-90 ml-10 shadow-md rounded-4xl border overflow-auto
                            hover:shadow-xl hover:shadow-gray-700 hover:scale-103 transition duration-300">
              
              {/* IMAGE */}
              <div className="flex items-center justify-center h-65 bg-blue-50">
                <img
                  src={d.profile_picture}
                  alt={d.name}
                  className="h-58 w-58 rounded-full object-cover hover:scale-105 hover:shadow-lg hover:shadow-gray-700 hover:border-2 hover:border-gray-800
                             transition-transform duration-300"
                />
              </div>

              {/* TEXT */}
              <div className="text-center p-4">
                <h3 className="text-2xl font-semibold">
                  <span className="font-bold text-black">Name:</span> {d.name}
                </h3>
                <p className="text-gray-700">
                  <span className="font-bold text-black">Education:</span> {d.description}
                </p>
                {/* <p className="text-gray-700">
                  <span className="font-bold text-black">Role:</span> {d.role}
                </p> */}
                {/* <p className="text-gray-700">
                  <span className="font-bold text-black">Email:</span> {d.email}
                </p> */}

                {/* <button
                  onClick={() => navigate(`/Member/Interns/${d.intern_id}`)}
                  className="mt-3 bg-purple-400 text-white px-4 py-2 rounded-lg 
                             hover:bg-purple-500 hover:scale-105 transition"
                >
                  More
                </button> */}
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default InternSlider;
