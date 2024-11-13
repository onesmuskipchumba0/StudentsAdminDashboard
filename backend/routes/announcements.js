import { announcements } from "./data.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(announcements);
});

export default router;
