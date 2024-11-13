import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  type: { 
    type: String, 
    enum: ['semester', 'exam', 'holiday', 'registration'],
    required: true 
  },
  description: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Event', eventSchema); 