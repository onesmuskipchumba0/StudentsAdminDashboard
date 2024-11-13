import { analyticsData } from "./data.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(analyticsData);
});

export default router;
