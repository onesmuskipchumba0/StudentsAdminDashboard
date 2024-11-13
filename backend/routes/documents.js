import { documents } from "./data.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(documents);
});

export default router;
