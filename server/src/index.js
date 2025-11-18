import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import menuRoutes from './routes/menu.js';
import galleryRoutes from './routes/gallery.js';
import settingsRoutes from './routes/settings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant122';
mongoose.connect(MONGODB_URI).then(() => {
  console.log('✅ MongoDB connecté');
}).catch(err => console.error('❌ MongoDB:', err.message));

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/settings', settingsRoutes);

// Static (prod)
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'), err => {
    if (err) res.status(404).json({ ok: true, message: 'API running — no frontend build' });
  });
});

app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
