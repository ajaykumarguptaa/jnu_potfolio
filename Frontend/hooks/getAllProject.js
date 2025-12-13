import { api } from "../api/backend.axios";
import { setProjectData } from "../redux/project.slice";

const getAllProjects = () => {
  return async (dispatch) => {
    console.log("Fetching all projects...", import.meta.env.VITE_BACKEND_URL);

    try {
      const response = await api.get("/project/getallproject", {
        withCredentials: true,
      });

      // console.log("Response from backend:", response.data);

      if (response.data.status === 200) {
        dispatch(setProjectData(response.data)); // FIXED
      } else {
        dispatch(setProjectData([]));
      }

    } catch (err) {
      console.error("Error fetching projects:", err.message);
      dispatch(setProjectData([]));
    }
  };
};

export default getAllProjects;
