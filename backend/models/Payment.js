import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentId: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['paid', 'pending', 'overdue'],
    required: true 
  },
  date: { type: Date, required: true },
  paymentMethod: { type: String, required: true },
  semester: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema); 