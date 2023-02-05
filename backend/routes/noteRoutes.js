import express from "express";
import {
  getNotes,
  CreateNote,
  getNoteById,
  DeleteNote,
  UpdateNote,
} from "../controllers/noteControllers.js";
const router = express.Router();
import { protect } from "../middlewares/authMiddleware.js";

router.route("/").get(protect, getNotes);
router
  .route("/:id")
  .get(getNoteById)
  .delete(protect, DeleteNote)
  .put(protect, UpdateNote);
router.route("/create").post(protect, CreateNote);
export default router;
