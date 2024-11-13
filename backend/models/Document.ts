import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  modified: { type: Date, default: Date.now },
  owner: { type: String, required: true },
  shared: { type: Boolean, default: false },
  starred: { type: Boolean, default: false },
  tags: [String]
}, { timestamps: true });

export default mongoose.model('Document', documentSchema); 