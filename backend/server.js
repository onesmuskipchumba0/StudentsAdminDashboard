import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import studentsRouter from "./routes/students.js";
import coursesRouter from "./routes/courses.js";
import departmentsRouter from "./routes/departments.js";
import admissionsRouter from "./routes/admissions.js";
import eventsRouter from "./routes/events.js";
import feesRouter from "./routes/fees.js";
import announcementsRouter from "./routes/announcements.js";
import analyticsRouter from "./routes/analytics.js";
import documentsRouter from "./routes/documents.js";
import gradesRouter from './routes/grades.js';
import scheduleRouter from "./routes/schedule.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { log } from "console";
import Message from "./models/Message.js";
import Conversation from "./models/Conversation.js";
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)

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
app.use('/api/grades', gradesRouter);
app.use('/api/schedule', scheduleRouter);

// Socket.IO connection handling
io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;
  
  // Join user to their personal room
  socket.join(userId);
  
  // Handle new messages
  socket.on("send_message", async (messageData) => {
    try {
      const newMessage = new Message({
        conversationId: messageData.conversationId,
        senderId: userId,
        content: messageData.content,
        status: 'sent'
      });
      
      await newMessage.save();
      
      // Update conversation's last message
      await Conversation.findByIdAndUpdate(messageData.conversationId, {
        lastMessage: {
          content: messageData.content,
          timestamp: new Date(),
          senderId: userId
        },
        $inc: { [`unreadCount.${messageData.recipientId}`]: 1 }
      });
      
      // Emit message to recipient
      io.to(messageData.recipientId).emit("new_message", {
        message: newMessage,
        conversationId: messageData.conversationId
      });
      
      // Confirm message sent to sender
      socket.emit("message_sent", newMessage);
    } catch (error) {
      socket.emit("message_error", error.message);
    }
  });
  
  // Handle message status updates
  socket.on("mark_as_read", async ({ conversationId }) => {
    try {
      await Message.updateMany(
        { 
          conversationId,
          senderId: { $ne: userId },
          status: { $ne: 'read' }
        },
        { status: 'read' }
      );
      
      await Conversation.findByIdAndUpdate(conversationId, {
        [`unreadCount.${userId}`]: 0
      });
      
      socket.to(conversationId).emit("messages_read", { conversationId, userId });
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  });
  
  socket.on("disconnect", () => {
    console.log("User disconnected:", userId);
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
