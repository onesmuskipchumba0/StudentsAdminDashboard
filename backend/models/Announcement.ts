import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'],
    required: true 
  },
  author: { type: String, required: true },
  department: { type: String, required: true },
  attachments: [String],
  pinned: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Announcement', announcementSchema); 