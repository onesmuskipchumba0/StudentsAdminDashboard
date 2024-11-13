import express from "express";
import studentsRouter from "./routes/students.js";
import coursesRouter from "./routes/courses.js";
import departmentsRouter from "./routes/departments.js";
import admissionsRouter from "./routes/admissions.js";
import eventsRouter from "./routes/events.js";
import feesRouter from "./routes/fees.js";
import announcementsRouter from "./routes/announcements.js";
import analyticsRouter from "./routes/analytics.js";
import documentsRouter from "./routes/documents.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/students", studentsRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/departments", departmentsRouter);
app.use("/api/admissions", admissionsRouter);
app.use("/api/events", eventsRouter);
app.use("/api/fees", feesRouter);
app.use("/api/announcements", announcementsRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/documents", documentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
