import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/backend.axios";

function CurrentMemberSlider() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH MEMBERS
  useEffect(() => {
    api
      .get("/member/allmember", { withCredentials: true })
      .then((res) => {
        
        // console.log("Members Data:", res.data);
        setMembers(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching members:", err);
        setLoading(false);
      });
  }, []);

  // AUTO-DISABLE LOOP WHEN NOT ENOUGH SLIDES
  const loopMode = members.length > 3;

  if (loading)
    return <div className="text-center py-10 animate-pulse">Loading…</div>;

  return (
    <div className="max-w-[90%] h-150 mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Current Members</h1>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={loopMode} // ← FIXED
        autoplay={loopMode ? { delay: 2000 } : false}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1, pagination: false },
          768: { slidesPerView: 2, pagination: { clickable: true } },
          1024: { slidesPerView: 3, pagination: { clickable: true } },
        }}
        className="rounded-2xl"
      >
        {members.map((d) => (
          <SwiperSlide key={d.member_id}>
            <div
              className="
              bg-blue-100 h-120 w-90  ml-9 shadow-md rounded-4xl border overflow-hidden 
              hover:shadow-xl hover:shadow-gray-700 hover:scale-103 transition-shadow duration-300 
              max-[380px]:w-75
            "
            >
              {/* IMAGE */}
              <div className="flex flex-row items-center justify-center h-65 bg-blue-50">
                <img
                  src={d.profile_picture}
                  alt={d.member_name}
                  className="h-60 w-60 rounded-full object-cover hover:scale-105 hover:shadow-lg hover:shadow-gray-700 hover:border-2 hover:border-gray-600 transition-transform duration-300"
                />
              </div>

              {/* TEXT */}
              <div className="flex flex-row items-center justify-center">
                <div className="p-4 text-center">
                  {/* CORRECTED NAME */}
                  <h3 className="text-2xl font-semibold mb-2">
                    {d.member_name}
                  </h3>

                  {/* CORRECTED ROLE */}
                  <p className="text-gray-600">
                    <span className="text-black font-bold">Role: </span>
                    {d.role}
                  </p>
                  <p className="text-gray-600">
                    <span className="text-black font-bold">Education: </span>
                    {d.description}
                  </p>

                  {/* MORE BUTTON */}
                  {/* <button
                    onClick={() => navigate(`/member/${d.member_id}`)}
                    className="
                      mt-2.5 bg-purple-300 text-white text-lg px-4 py-1.5 rounded-xl 
                      hover:bg-purple-400 hover:scale-105 transition-transform
                    "
                  >
                    More
                  </button> */}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CurrentMemberSlider;
