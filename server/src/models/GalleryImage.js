import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title_fr: { type: String, default: '' },
  title_ar: { type: String, default: '' },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('GalleryImage', gallerySchema);
