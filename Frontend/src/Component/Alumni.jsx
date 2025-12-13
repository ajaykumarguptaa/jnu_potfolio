import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getMemberStatusOverrides } from './context/AdminContext';


function Alumni() {

  const [alumniList, setAlumniList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/members.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch members.json");
        return res.json();
      })
      .then((data) => {
        const overrides = getMemberStatusOverrides();
        // Include original alumni and members moved to alumni by admin
        const allAlumni = [
          ...(data.alumni || []),
          ...data.currentMembers.filter(member => overrides[String(member.id)] === "alumni"),
          ...data.interns.filter(member => overrides[String(member.id)] === "alumni")
        ];
        setAlumniList(allAlumni);
      })
      .catch((error) => {
        console.error("Error loading alumni data:", error);
      });
  }, []);


  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-t from-blue-50 to-sky-50 w-full h-auto mt-16 pt-8">
      <h1 className="text-center mb-4 text-blue-400 text-5xl"> Alumnis</h1>

      <div className="flex flex-wrap justify-evenly">
        {alumniList.map((alumni) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="m-[2%] w-[45%] min-w-80 bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 h-70 rounded-2xl flex flex-wrap flex-col gap-2 justify-evenly shadow-[5px 5px 15px] border-2 hover:shadow-[0px 10px 24px rgba(142, 68, 173, 0.4)] hover:scale-[1.03] hover:border-[#9b59b6]
                           max-[1024px]:w-[95%] max-[1024px]:h-70 max-[1024px]:flex max-[1024px]:flex-row max-[1024px]:justify-around max-[1024px]:items-center
                           max-[768px]:w-[95%]  max-[768px]:h-60 max-[768px]:flex max-[768px]:flex-row max-[768px]:justify-around max-[768px]:items-center
                           max-[480px]:w-[95%]  max-[480px]:h-50 max-[480px]:flex max-[480px]:flex-row max-[480px]:justify-around max-[480px]:items-center
                           max-[280px]:w-[95%]  max-[280px]:h-70 max-[280px]:flex max-[280px]:flex-row max-[280px]:justify-around max-[280px]:items-center" key={Alumni.name}>

            <div>
              <img src={`/${alumni.image}`} alt={alumni.name} className="w-52 h-60 object-cover flex flex-wrap align-center ml-5 rounded-[10%] border-2 border-[#9b59b6] 
                                                                 max-[1024px]:w-56 max-[1024px]:h-60 max-[1024px]:ml-0
                                                                 max-[768px]:w-40 max-[768px]:h-48
                                                                 max-[480px]:w-32  max-[480px]:h-40
                                                                 max-[280px]:w-24  max-[280px]:h-32" />
            </div>

            <div className="flex flex-col gap-5 items-center flex-wrap w-100 max-w-70
                               max-[1025px]:flex max-[1025px]:flex-col max-[1025px]:items-center max-[1025px]:flex-wrap max-[1025px]:max-w-[350px]
                               max-[768px]:max-w-[260px]
                               max-[480px]:max-w-[200px]
                               max-[280px]:max-w-[150px]" key={alumni.name}>

              <h2 className="text-3xl font-bold text-black
                            max-[1024px]:text-[2.5rem] max-[1024px]:text-center
                            max-[768px]:text-[2rem]
                            max-[480px]:text-[1.2rem]
                            max-[280px]:text-[1.2rem]">{alumni.name}</h2>

              <h2 className="text-16px text-[rgb(100,100,100)]
                 max-[1024px]:text-[1.5rem] max-[1024px]:text-center
                max-[768px]:text-[1rem]
                 max-[480px]:text-[1rem]
                max-[280px]:text-[0.9rem]">{alumni.education}</h2>

              <button className="bg-purple-300 text-neutral-900 border-none rounded-[5px] px-2 py-2 cursor-pointer hover:bg-purple-500 hover:text-white"
                onClick={() => navigate(`/member/alumni/${alumni.id}`)}
              >
                Read More</button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Alumni
