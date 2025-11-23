import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name_fr: { type: String, required: true },
  name_ar: { type: String, default: '' },
  description_fr: { type: String, default: '' },
  description_ar: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: String, default: 'Sandwichs' },
  imageUrl: { type: String, default: '' },
  available: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('MenuItem', menuItemSchema);
