import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate, Outlet } from "react-router-dom";


const data = [
  { name: `Ms. Anupma Gadhwal`, url: "../Ms. Anupma Gadhwal.jpg", about: `PhD Scholar` },
  { name: `Mr. Kapil Dev`, url: "../Mr. Kapil Dev.jpg", about: `PhD Scholar` },
  { name: `Mr. Saurabh Kumar`, url: "../Mr. Saurabh Kumar.jpg", about: `PhD Scholar` },
  { name: `Mrs. Pooja Tiwari`, url: "../Mrs. Pooja Tiwari.jpg", about: `PhD Scholar` },
  { name: `Mr. Sayantan Das`, url: "../Mr. Sayantan Das.jpg", about: `Research Associate` },
  { name: `Mr. Anil Kumar`, url: "../Mr. Anil Kumar.jpg", about: `PhD Scholar` }
];

export default function CardSlider() {
  const navigate = useNavigate();
  return (
    <div className="max-w-[90%] h-150 mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Card Slider</h2>
     <Swiper
       modules={[Navigation, Pagination, Autoplay]}
       spaceBetween={20}
       slidesPerView={1}
       loop={true}
       autoplay={{ delay: 2000 }}
       pagination={{ clickable: true }} 
       breakpoints={{
         0: {
           slidesPerView: 1,
           pagination: false,  
         },
         768: {
           slidesPerView: 2,
           pagination: { clickable: true }, 
         },
         1024: {
           slidesPerView: 3,
           pagination: { clickable: true }, 
         },
       }}
        className="rounded-2xl"
      >
        {data.map((d, index) => (
          <SwiperSlide key={index}>
            <div className="bg-blue-100 h-110 w-90 shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 max-[380px]:w-70">

              <div className=" flex flex-row items-center justify-center h-70 bg-gradient-to-br from-white to-green-50">
                <img
                  src={d.url}
                  alt={d.name}
                  className=" h-60 w-60 rounded-full object-cover hover:scale-115 transition-transform duration-300" />
              </div>

              <div className="flex flex-row items-center justify-center ">
                <div className="p-4 text-center">
                  <h3 className="text-2xl font-semibold mb-2">{d.name}</h3>
                  <p className="text-gray-600">{d.about}</p>
                  <button onClick={() => navigate("/Member/Current Member")}
                    className="mt-2.5 bg-purple-300 text-white text-lg px-4 py-1.5 rounded-xl border-none hover:bg-purple-400 hover:scale-105 transition-transform"
                  > More
                  </button>
                  <Outlet />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
