import React, { useEffect, useState } from "react";
import { api } from "../../../api/backend.axios";
import { Link } from "react-router-dom";

const OtherActivityList = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    api.get("/otherActivities/getallactivities").then((res) => {
      setActivities(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      api.delete(`/otherActivities/deleteactivities/${id}`).then(() => {
        setActivities(activities.filter((a) => a.activity_id !== id));
      });
    }
  };

  return (
    <div className="p-8  py-20">

      <h1 className="text-3xl font-bold mb-6">Other Activities</h1>

      <Link
        to="/otherActivities/addOtherActivities"
        className="px-4 py-2 bg-slate-900 text-white rounded-md"
      >
        + Add Activity
      </Link>

      <div className="mt-6 space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.activity_id}
            className="p-4 bg-white border rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-bold">{activity.organisation}</h2>
              <p className="font-semibold text-gray-700">
                {activity.duration}
              </p>
              <p className="text-gray-600 mt-1">{activity.description}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                to={`/otherActivities/edit/${activity.activity_id}`}
                className="px-3 py-2 bg-slate-900 text-white rounded-md"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(activity.activity_id)}
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

export default OtherActivityList;

