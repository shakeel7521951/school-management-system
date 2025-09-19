import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;

import userRoutes from "./routes/useRoutes.js";
import formRoutes from './routes/FormRoutes.js';
import formSubmissionRoutes from "./routes/FormSubmissionRoutes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({origin:"http://localhost:5173"}));

mongoose.connect("mongodb+srv://shakeeldev:shakeeldev@cluster0.wr0hjhv.mongodb.net").then(() => console.log("Database is connected successfully")).catch((error) => console.log("Error in connecting database."));

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Backend is running..." });
})

app.use(userRoutes)
app.use(formRoutes)
app.use(formSubmissionRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));