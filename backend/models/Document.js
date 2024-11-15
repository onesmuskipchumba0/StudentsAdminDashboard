import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: String, required: true },
  owner: { type: String, required: true },
  shared: { type: Boolean, default: false },
  starred: { type: Boolean, default: false },
  tags: [{ type: String }],
  url: { type: String, required: true },
  downloadCount: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Document', documentSchema); 