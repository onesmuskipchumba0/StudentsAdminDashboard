import { academicEvents } from "./data.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(academicEvents);
});

export default router;
