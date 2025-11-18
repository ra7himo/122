import express from 'express';
import GalleryImage from '../models/GalleryImage.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();
router.get('/', async (req,res)=>{
  const images = await GalleryImage.find({}).sort({ createdAt:-1 });
  res.json(images);
});
router.post('/', requireAuth, async (req,res)=>{
  try{ const created = await GalleryImage.create(req.body); res.status(201).json(created); }
  catch(e){ res.status(400).json({ error:e.message }); }
});
router.delete('/:id', requireAuth, async (req,res)=>{
  try{ await GalleryImage.findByIdAndDelete(req.params.id); res.json({ ok:true }); }
  catch(e){ res.status(400).json({ error:e.message }); }
});
export default router;
