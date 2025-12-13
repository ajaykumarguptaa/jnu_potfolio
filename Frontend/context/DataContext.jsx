import { createContext, useState } from "react";
import { api } from "../api/backend.axios";
import React from "react";

export const DataContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [projectData, setProjectData] = useState([]);

  const getProjectData = async () => {
    try {
      const res = await api.get("/project/getallproject", {
        withCredentials: true,
      });

      console.log("Response from backend:", res.data);

      if (res.data.status === 200) {
        setProjectData(res.data.data); 
      }
      
    } catch (err) {
      console.error("Error fetching project data:", err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        getProjectData,
        projectData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// kuch time baad karte hai kuch khaa lee 