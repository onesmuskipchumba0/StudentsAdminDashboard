import { studentsData } from "./data.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(studentsData);
});

export default router;
