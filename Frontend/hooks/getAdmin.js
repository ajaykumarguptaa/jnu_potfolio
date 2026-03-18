
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import { api } from "../api/backend.axios";
import { setAdminInfo,clearAdminInfo } from "../redux/AdminSclice";

export const currentAdmin=()=>{
  const dispatch=useDispatch();

  useEffect(()=>{
    const fetchAdmin=async()=>{
      try{
        // const response=await api.get("/auth/me",{
        //   withCredentials:true
        // });
        console.log("Admin info response:",response.data);
        if(response.data.status===200){
          dispatch(setAdminInfo(response.data.admin));
        }else{
          dispatch(clearAdminInfo());
        }

      }catch(err){
        // console.error("Error fetching admin info:",err.message);
      }
    };
    fetchAdmin();
  },[dispatch]);
}