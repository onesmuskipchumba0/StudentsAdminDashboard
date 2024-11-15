import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentId: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['tuition', 'library', 'lab', 'activity', 'other']
  },
  status: { 
    type: String, 
    enum: ['paid', 'pending', 'overdue'],
    required: true,
    default: 'paid'
  },
  date: { type: Date, required: true },
  paymentMethod: { 
    type: String, 
    required: true,
    enum: ['cash', 'card', 'bank', 'online']
  },
  semester: { type: String, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema); 