import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  subject: { 
    type: String, 
    required: true 
  },
  teacher: { 
    type: String, 
    required: true 
  },
  room: { 
    type: String, 
    required: true 
  },
  startTime: { 
    type: String, 
    required: true 
  },
  endTime: { 
    type: String, 
    required: true 
  },
  department: { 
    type: String, 
    required: true 
  },
  semester: { 
    type: String, 
    required: true 
  },
  day: { 
    type: String, 
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  }
}, { 
  timestamps: true 
});

// Add index for common queries
scheduleSchema.index({ department: 1, semester: 1 });

export default mongoose.model('Schedule', scheduleSchema); 