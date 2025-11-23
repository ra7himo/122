import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/auth.js';
import menuRoutes from './routes/menu.js';
import galleryRoutes from './routes/gallery.js';
import settingsRoutes from './routes/settings.js';

const app = express();
const PORT = process.env.PORT || 4000;

const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/restaurant122';

mongoose.connect(MONGODB_URI).then(() => {
  console.log('✅ MongoDB connecté');
}).catch(err => {
  console.error('❌ Erreur MongoDB:', err.message);
});

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'API restaurant-122 en ligne' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend sur http://localhost:${PORT}`);
});
