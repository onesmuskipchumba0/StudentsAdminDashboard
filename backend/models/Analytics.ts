import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  year: { type: String, required: true },
  semester: { type: String, required: true },
  department: { type: String, required: true },
  students: { type: Number, required: true }
});

const gradeSchema = new mongoose.Schema({
  grade: { type: String, required: true },
  students: { type: Number, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  semester: { type: String, required: true }
});

const analyticsSchema = new mongoose.Schema({
  enrollmentData: [enrollmentSchema],
  gradeData: [gradeSchema],
  departmentData: [{
    name: String,
    students: Number,
    faculty: Number,
    courses: Number,
    year: String
  }],
  attendanceData: [{
    month: String,
    attendance: Number,
    department: String,
    year: String,
    totalStudents: Number,
    presentStudents: Number
  }],
  revenueData: [{
    month: String,
    tuition: Number,
    fees: Number,
    other: Number,
    department: String,
    year: String
  }]
}, { timestamps: true });

export default mongoose.model('Analytics', analyticsSchema); 