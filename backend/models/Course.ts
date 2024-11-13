import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Active', 'Upcoming'],
    required: true 
  },
  instructor: { type: String, required: true },
  startDate: { type: Date, required: true },
  maxStudents: { type: Number, required: true },
  enrolledStudents: { type: Number, default: 0 },
  progress: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema); 