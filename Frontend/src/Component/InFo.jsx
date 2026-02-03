import React, { useEffect, useState } from "react";
import { api } from "../../api/backend.axios";
import { motion } from "framer-motion";
import {
  Award,
  GraduationCap,
  Briefcase,
  ScrollText,
  Users,
} from "lucide-react";

export default function Info() {
  const [administrative, setAdministrative] = useState([]);
  const [awards, setAwards] = useState([]);
  const [academic, setAcademic] = useState([]);
  const [otherActivities, setOtherActivities] = useState([]);

  // FETCH ALL SECTIONS

  useEffect(() => {
    api
      .get("/administrativeactivities/getactivities")
      .then((res) => setAdministrative(res.data));
  }, []);

  useEffect(() => {
    api.get("/awards/GetAwards").then((res) => setAwards(res.data));
  }, []);

  useEffect(() => {
    api
      .get("/academicCareer/GetAcademicCareers")
      .then((res) => setAcademic(res.data));
  }, []);

  useEffect(() => {
    api
      .get("/otherActivities/getallactivities")
      .then((res) => setOtherActivities(res.data));
  }, []);

  // CARD COMPONENT

  const Card = ({ icon, title, organisation, duration, description }) => (
    <motion.div
      whileHover={{ scale: 1.04, y: -3 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="w-[30%] min-w-80 bg-blue-50 rounded-xl border border-black shadow-md p-4
                 hover:border-purple-500 hover:shadow-xl"
    >
      <div className="flex gap-4">
        <div className="p-2 bg-yellow-100 rounded-full h-fit">{icon}</div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold text-black">{title}</h2>
          {organisation && (
            <p className="text-gray-700 font-medium">{organisation}</p>
          )}
          {duration && <p className="text-gray-500 italic">{duration}</p>}
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col gap-12 py-6"
    >
      {/* -------------------------------------------
        ADMINISTRATIVE POSITIONS
      ------------------------------------------- */}
      <Section title="Administrative Positions / Activities">
        {administrative.map((item) => (
          <Card
            key={item.administrative_id}
            icon={<Briefcase className="w-6 h-6 text-yellow-600" />}
            title={item.title}
            organisation={item.organisation}
            duration={item.duration}
            description={item.description}
          />
        ))}
      </Section>

      {/* -------------------------------------------
        AWARDS / HONORS
      ------------------------------------------- */}
      <Section title="Awards / Honors">
        {awards.map((item) => (
          <Card
            key={item.award_id}
            icon={<Award className="w-6 h-6 text-yellow-600" />}
            title={item.title}
            department={item.department}
            duration={item.duration}
            organisation={item.organisation}
          />
        ))}
      </Section>

      {/* -------------------------------------------
        ACADEMIC CAREER / MEMBER
      ------------------------------------------- */}
      <Section title="Academic Career / Member">
        {academic.map((item) => (
          <Card
            key={item.academic_id}
            icon={<GraduationCap className="w-6 h-6 text-yellow-600" />}
            title={item.title}
            organisation={item.organisation}
            duration={item.duration}
            description={item.role}
          />
        ))}
      </Section>

      {/* -------------------------------------------
        OTHER PROFESSIONAL ACTIVITIES
      ------------------------------------------- */}
      <Section title="Other Professional Activities">
        {otherActivities.map((item) => (
          <Card
            key={item.activity_id}
            icon={<ScrollText className="w-6 h-6 text-yellow-600" />}
            title={item.title}
            organisation={item.organisation}
            duration={item.duration}
            description={item.description}
          />
        ))}
      </Section>
    </motion.div>
  );
}

// -------------------------------------------
// SECTION COMPONENT
// -------------------------------------------
const Section = ({ title, children }) => (
  <div className="w-full flex flex-col gap-4 px-4">
    <h1 className="text-3xl font-semibold text-blue-600 drop-shadow-sm">
      {title}
    </h1>

    <div className="flex flex-wrap gap-6 justify-evenly">{children}</div>
  </div>
);
