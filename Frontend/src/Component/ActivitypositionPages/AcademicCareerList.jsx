import React, { useEffect, useState } from "react";
import { api } from "../../../api/backend.axios";
import { Link, useNavigate } from "react-router-dom";

const AcademicCareerList = () => {
  const [careers, setCareers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/administrativeactivities/getactivities").then((res) => {
      setCareers(res.data || []);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      api
        .delete(`/administrativeactivities/deleteactivities/${id}`)
        .then(() => {
          setCareers((prev) =>
            prev.filter((item) => item.administrative_id !== id)
          );
        });
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Academic Careers</h1>

      <Link
        to="addActivityposition"
        className="px-4 py-2 bg-slate-900 text-white rounded-md"
      >
        + Add New Career
      </Link>

      <div className="mt-6 space-y-4">
        {careers.map((item) => (
          <div
            key={item.administrative_id}   // <-- FIXED KEY
            className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p>{item.organisation}</p>
              <p>{item.duration}</p>
              <p className="font-semibold">{item.description}</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate(`edit/${item.administrative_id}`)}
                className="px-3 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.administrative_id)}
                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
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

export default AcademicCareerList;
