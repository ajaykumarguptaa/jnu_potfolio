import React, { useEffect, useState } from "react";
import { api } from "../../../api/backend.axios";
import { Link } from "react-router-dom";

const AcademicCareerListMember = () => {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    api.get("/academicCareer/GetAcademicCareers").then((res) => {
      setCareers(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      api.delete(`/academicCareer/DeleteAcademicCareer/${id}`).then(() => {
        setCareers(careers.filter((c) => c.academic_id !== id));
      });
    }
  };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">Academic Career List</h1>

      <Link
        to="/careermember/addcareerMember"
        className="px-4 py-2 bg-slate-900 text-white rounded-md"
      >
        + Add Academic Career
      </Link>

      <div className="mt-6 space-y-4">
        {careers.map((career) => (
          <div
            key={career.academic_id}
            className="p-4 bg-white border rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-bold">{career.title}</h2>
              <p className="font-semibold">{career.organisation}</p>
              <p className="text-gray-600">{career.duration}</p>
              <p>{career.role}</p>
            </div>

            <div className="flex gap-3">
              <Link
                to={`/careermember/edit/${career.academic_id}`}
                className="px-3 py-2 bg-yellow-500 text-white rounded-md"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(career.academic_id)}
                className="px-3 py-2 bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default AcademicCareerListMember;
