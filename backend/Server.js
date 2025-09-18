import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 5000;

import formRoutes from './routes/FormRoutes.js';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

mongoose.connect("mongodb://localhost:27017/school-management-system").then(() => console.log("Database is connected successfully")).catch((error) => console.log("Error in connecting database."));

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Backend is running..." });
})

app.use(formRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));