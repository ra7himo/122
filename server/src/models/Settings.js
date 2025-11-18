import mongoose from 'mongoose';
const daySchema = new mongoose.Schema({
  day: { type: String, required: true },
  open: { type: String, default: '11:00' },
  close: { type: String, default: '23:00' },
  closed: { type: Boolean, default: false }
}, { _id: false });
const settingsSchema = new mongoose.Schema({
  name: { type: String, default: '122' },
  phone: { type: String, default: '+213 555 55 55 55' },
  address: { type: String, default: 'Sidi Bel Abbès, Algérie' },
  city: { type: String, default: 'Sidi Bel Abbès' },
  languages: { type: [String], default: ['fr','ar'] },
  heroTagline_fr: { type: String, default: 'Shawarma fraîche, pain maison, sauces généreuses — à Sidi Bel Abbès.' },
  heroTagline_ar: { type: String, default: 'شاورما طازجة، خبز منزلي، وصلصات سخية — في سيدي بلعباس.' },
  about_fr: { type: String, default: 'Chez 122, on prépare une shawarma savoureuse avec des ingrédients frais et une cuisson maîtrisée. Ambiance conviviale pour familles et collègues.' },
  about_ar: { type: String, default: 'في 122 نحضّر شاورما لذيذة بمكونات طازجة وطهي متقن. أجواء ودّية مناسبة للعائلات والموظفين.' },
  mapEmbedUrl: { type: String, default: 'https://www.google.com/maps?q=Sidi%20Bel%20Abb%C3%A8s&output=embed' },
  hours: { type: [daySchema], default: undefined }
}, { timestamps: true });
export default mongoose.model('Settings', settingsSchema);
