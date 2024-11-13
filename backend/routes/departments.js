import { departmentsData } from "./data.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(departmentsData);
});

export default router;

