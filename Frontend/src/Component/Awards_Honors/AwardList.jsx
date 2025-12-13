import React, { useEffect, useState } from "react";
import { api } from "../../../api/backend.axios";
import { Link } from "react-router-dom";

const AwardList = () => {
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    api.get("/awards/GetAwards").then((res) => {
      setAwards(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this award?")) {
      api.delete(`/awards/DeleteAward/${id}`).then(() => {
        setAwards(awards.filter((a) => a.award_id !== id));
      });
    }
  };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">Awards & Honors</h1>

      <Link
        to="addAwards"
        className="px-4 py-2 bg-slate-900 text-white rounded-md hover:shadow-lg shadow-slate-950 transition-all duration-300"
      >
        + Add Award
      </Link>

      <div className="mt-6 space-y-4 ">
        {awards.map((award) => (
          <div
            key={award.award_id}
            className="p-4 bg-white border rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg shadow-slate-950 transition-all duration-300"
          >
            <div>
              <h2 className="text-xl font-bold">{award.organisation}</h2>
              <p className="font-semibold">{award.department}</p>
              <p className="text-gray-600">{award.duration}</p>
            </div>

            <div className="flex  flex-col gap-3  ">
              <Link
                to={`edit/${award.award_id}`}
                className="px-3 py-2 bg-slate-900 text-white rounded-md hover:shadow-lg shadow-slate-950 transition-all duration-300 "
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(award.award_id)}
                className="px-3 py-2 bg-red-600 text-white rounded-md hover:shadow-xl shadow-slate-950  transition-all duration-300"
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

export default AwardList;
