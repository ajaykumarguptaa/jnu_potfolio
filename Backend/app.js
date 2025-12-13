import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors";
import pool from "./config/db.js";
import { createTable } from "./service/createTable.services.js";

import adminrouter from "./routes/admin.routes.js";
import eventroutes from "./routes/event.routes.js";
import projectroutes from "./routes/project.routes.js";
import researchroutes from "./routes/research.routes.js";
import memberroutes from "./routes/member.routes.js";
import experiencerouter from "./routes/experience.routes.js";
import awardrouter from "./routes/Award.route.js";
import Administrativerouter from "./routes/Administrative_position_Activities.route.js";
import otherActivityrouter from "./routes/Other_Activity.route.js";
import academicCareerRouter from "./routes/Academic_career.route.js";
import photoGallery from "./routes/photoGallery.routes.js";
import sliderRouter from "./routes/slider.routes.js";
import alluminirouter from "./routes/Allumini.routes.js";
import internrouter from "./routes/intern.routes.js";
import adminInfoRoutes from "./routes/AdminInfo.Routes.js";
import authrouter from "./routes/Auth.route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,  // <-- REQUIRED FOR COOKIES
  })
);
app.use(express.json());
app.use(cookieParser())


app.use("/api/admin", adminrouter);
app.use("/api/events", eventroutes);
app.use("/api/project", projectroutes);
app.use("/api/research", researchroutes);
app.use("/api/member", memberroutes);
app.use("/api/experience", experiencerouter);
app.use("/api/administrativeactivities", Administrativerouter);
app.use("/api/academicCareer", academicCareerRouter);
app.use("/api/awards", awardrouter);
app.use("/api/otherActivities", otherActivityrouter);
app.use("/api/photoGallery", photoGallery);
app.use("/api/slider", sliderRouter);
app.use("/public", express.static("public"));
app.use("/api/almember", alluminirouter);
app.use("/api/interns", internrouter);
app.use("/api/admininfo", adminInfoRoutes);
app.use("/api/auth", authrouter);

app.get("/", (req, res) => res.send("server is running "));

app.listen(
  process.env.PORT,
  () => pool,
  createTable(),
  console.log(`Server running on port http://localhost:${process.env.PORT}`)
);
