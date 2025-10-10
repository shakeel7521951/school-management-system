import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();
const PORT = 5000;

import userRoutes from "./routes/useRoutes.js";
import formRoutes from './routes/FormRoutes.js';
import formSubmissionRoutes from "./routes/FormSubmissionRoutes.js";
import stComplaintRoutes from "./routes/stComplaintRoutes.js";
import visitorRoutes from "./routes/VisitorRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import teacherComplaint from "./routes/TeacherComplaitRoutes.js";
import departmentRoutes from "./routes/DepartmentRoutes.js";
import parentComplaints from "./routes/parentComplaintRoutes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://school-management-system-lime-six.vercel.app",
    ],
    credentials: true,
  })
);
mongoose.connect("mongodb+srv://shakeeldev:shakeeldev@cluster0.wr0hjhv.mongodb.net").then(() => console.log("Database is connected successfully")).catch((error) => console.log("Error in connecting database."));
// mongoose.connect("mongodb://localhost:27017/school-management-system").then(() => console.log("Database is connected successfully")).catch((error) => console.log("Error in connecting database."));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Backend is running..." });
})

app.use(userRoutes);
app.use(formRoutes);
app.use(formSubmissionRoutes);
app.use(stComplaintRoutes);
app.use(visitorRoutes);
app.use(registrationRoutes);
app.use(teacherComplaint);
app.use(departmentRoutes);
app.use(parentComplaints)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));