import express from "express";
import notes from "./data/notes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`server listening on port ${PORT}`));
