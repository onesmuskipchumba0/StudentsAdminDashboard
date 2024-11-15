import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  participants: [{
    userId: String,
    name: String,
    avatar: String,
    role: String,
    department: String
  }],
  lastMessage: {
    content: String,
    timestamp: Date,
    senderId: String
  },
  unreadCount: {
    type: Map,
    of: Number,
    default: new Map()
  }
}, {
  timestamps: true
});

export default mongoose.model('Conversation', conversationSchema);