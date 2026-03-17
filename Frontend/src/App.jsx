import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./Component/Header";
import React from "react";
import Home from "./Component/Home";
import Event from "./Component/Event";
import Project from "./Component/Project";
import Research from "./Component/Research";
import Contact from "./Component/Contact";

import CurrentMember from "./Component/CurrentMember";

// Alumni pages
import AlumniMembers from "./Component/AlluminiPages/AlumniMembers";
import AddAlumniMembers from "./Component/AlluminiPages/AddAlumniMembers";
import EditAlumniMembers from "./Component/AlluminiPages/EditAlumniMembers";
import MemberDetail from "./Component/MemberDetail";
import Signup from "./Component/Authentication/Signup";
// import ForgotPass from "./Component/ForgotPass";
// import AdminLogin from "./Component/admin/AdminLogin";
import AdminDashboard from "./Component/admin/AdminDashboard";
// import ProtectedRoute from "./Component/admin/ProtectedRoute";
// import { AdminProvider } from "./Component/context/AdminContext";

// CRUD Pages
import EditProject from "./Component/ProjectEdit";
import EditEvent from "./Component/EditEvent";
import AddEvent from "./Component/AddEvent";
import AddResearch from "./Component/AddResearch";
import EditResearch from "./Component/EditResearch";
import AddMember from "./Component/AddMember";
import EditMember from "./Component/EditMember";
import InternList from "./Component/intern/InternList";
import EditIntern from "./Component/intern/EditIntern";
import AddIntern from "./Component/intern/AddIntern";
import AdminInfoEdit from "./Component/AdminLabInfo/AdminInfoEdit";
import CreateAdminInfo from "./Component/AdminLabInfo/CreateAdminInfo";
import AddAcademicCareer from "./Component/ActivitypositionPages/AddAcademicCareer";
import AcademicCareerList from "./Component/ActivitypositionPages/AcademicCareerList";
import EditAcademicCareer from "./Component/ActivitypositionPages/EditAcademicCareer";
import AwardList from "./Component/Awards_Honors/AwardList";
import EditAward from "./Component/Awards_Honors/EditAward";
import AddAward from "./Component/Awards_Honors/AddAward";
import AcademicCareerListMember from "./Component/Academic_Career_Member/AcademicCareerListMember";
import EditAcademicCareerMember from "./Component/Academic_Career_Member/SomeErrorAcademic";
import AddAcademicCareerListMember from "./Component/Academic_Career_Member/SomeErrorAcademic";
import SomeErrorAcademic from "./Component/Academic_Career_Member/SomeErrorAcademic";
import OtherActivityList from "./Component/Other_Professional_Activities/OtherActivityList";
import EditOtherActivity from "./Component/Other_Professional_Activities/EditOtherActivity";
import AddOtherActivity from "./Component/Other_Professional_Activities/AddOtherActivity";
import GalleryList from "./Component/photoGallery/GalleryList";
import EditPhoto from "./Component/photoGallery/EditPhoto";
import AddPhoto from "./Component/photoGallery/AddPhoto";
import AddAcademicCareerMember from "./Component/Academic_Career_Member/AddAcademicCareerMember";
import VerifyOtp from "./Component/Authentication/VerifyOtp";
import Login from "./Component/Authentication/Login";
import ProjectAccess from "./Component/AdminAccessPages/projectAccess/projectAccess";
import ResearchAccess from "./Component/AdminAccessPages/ResearchAccess/ResearchAccess";
import MemberAccess from "./Component/AdminAccessPages/MemberAccess/MemberAccess";
import CurrentMemberAccess from "./Component/AdminAccessPages/CurrentMember/CurrentMember";
import InternAccess from "./Component/AdminAccessPages/InternAccess/InternAccess";
import EventAccess from "./Component/AdminAccessPages/EventAccess/EventAccess";
import AdminInfoAccess from "./Component/AdminAccessPages/AdminInfoAccess/AdminInfoAccess";
import AddProject from "./Component/AddProject";
import { currentAdmin } from "../hooks/getAdmin";
import { useSelector } from "react-redux";
import PageNotFound from "./Component/PageNotFound";

// ---------------- Layout ---------------- //
const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

// ---------------- Members Layout ---------------- //
const MemberLayout = () => (
  <div className="pt-24">
    <Outlet />
  </div>
);

// ---------------- ROUTER ---------------- //
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // ---------- PUBLIC ROUTES ----------
      { index: true, element: <Home /> },
      { path: "Home", element: <Home /> },
      { path: "Signup", element: <Signup /> },
      { path: "Contact", element: <Contact /> },
      { path: "Research", element: <Research /> },
      { path: "Project", element: <Project /> },
      { path: "Event", element: <Event /> },
      { path: "otpverify", element: <VerifyOtp /> },
      { path: "/login", element: <Login /> },
      { path: "/*", element: <PageNotFound/> },


      {
        path: "jnu/admin@2026/dashboard",
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "projectAccess", element: <ProjectAccess/>},
          { path: "researchAccess", element: <ResearchAccess/>},
          { path: "memberAccess", element: <MemberAccess/>},// Alumni
          { path: "CurrentMember", element: <CurrentMemberAccess/>},
          { path: "InternAccess", element: <InternAccess/>},
          { path: "EventAccess", element: <EventAccess/>},
          { path: "AdminInfoAccess", element: <AdminInfoAccess/>},
        ],
      },

      {
        path: "Signup",
        children: [
          { index: true, element: <Signup /> },
          { path: "login", element: <Login /> },
        ],
      },

      // { path: "Auth/signup", element: <AdminAuth/> },

      // ---------- PROJECT CRUD ----------
      { path: "editProject/:Id", element: <EditProject /> },
      { path: "AddProject", element: <AddProject/>},
      

      // ---------- EVENT CRUD ----------
      { path: "editevent/:Id", element: <EditEvent /> },
      { path: "createevent", element: <AddEvent /> },

      // ---------- RESEARCH CRUD ----------
      { path: "AddResearch", element: <AddResearch /> },
      { path: "EditResearch/:Id", element: <EditResearch /> },

      // ---------- MEMBER CRUD ----------
      { path: "addMember", element: <AddMember /> },
      { path: "editMember/:Id", element: <EditMember /> },

      // ---------- MEMBERS (GROUPED) ----------
      { path: "Alumni", element: <AlumniMembers /> },
      { path: "Alumni/create", element: <AddAlumniMembers /> },
      { path: "Alumni/edit/:Id", element: <EditAlumniMembers /> },

      //------------- intern -------------------
      { path: "Interns", element: <InternList /> },
      { path: "Interns/create", element: <AddIntern /> },
      { path: "Interns/edit/:Id", element: <EditIntern /> },
      // -----------------------AdminInfo
      { path: "admininfo/edit/:Id", element: <AdminInfoEdit /> },
      { path: "admininfo/create", element: <CreateAdminInfo /> },

      //------------administrativeactivities/getactivities
      {
        path: "activity/position/",
        children: [
          { index: true, element: <AcademicCareerList /> },
          { path: "edit/:Id", element: <EditAcademicCareer /> },
          { path: "addActivityposition", element: <AddAcademicCareer /> },
        ],
      },

      // -----------------Awards/Honors
      {
        path: "awards/honors",
        children: [
          { index: true, element: <AwardList /> },
          { path: "edit/:Id", element: <EditAward /> },
          { path: "addAwards", element: <AddAward /> },
        ],
      },
      {
        path: "careermember",
        children: [
          { index: true, element: <AcademicCareerListMember /> },
          { path: "edit/:Id", element: <EditAcademicCareerMember /> },
          { path: "addcareerMember", element: <AddAcademicCareerMember /> },
        ],
      },
      //-------------other activities

      {
        path: "otherActivities",
        children: [
          { index: true, element: <OtherActivityList /> },
          { path: "edit/:Id", element: <EditOtherActivity /> },
          { path: "addOtherActivities", element: <AddOtherActivity /> },
        ],
      },
      {
        path: "gallery",
        children: [
          { index: true, element: <GalleryList /> },
          { path: "edit/:Id", element: <EditPhoto /> },
          { path: "addPhoto", element: <AddPhoto /> },
        ],
      },

      {
        path: "Member",
        element: <MemberLayout />,
        children: [
          { path: "CurrentMember", element: <CurrentMember /> },

          // Alumni ROUTES
        ],
      },

      // ---------- MEMBER DETAIL PAGE ----------
      // type = "current" | "alumni" | "intern"
      {
        path: "member/:type/:id",
        element: <MemberDetail />,
      },

      // ---------- ADMIN ROUTES ----------
      // { path: "admin-login", element: <AdminLogin /> },

      // {
      //   path: "admin",
      //   element: (
      //     <ProtectedRoute>
      //       <AdminDashboard />
      //     </ProtectedRoute>
      //   ),
      // },
    ],
  },
]);

// ---------------- APP WRAPPER ---------------- //
function App() {
  currentAdmin()
  const slice_data=useSelector((state)=>state.admin)
  console.log("Admin slice data in App.jsx:",slice_data);
  return <RouterProvider router={router} />;
}

export default App;
