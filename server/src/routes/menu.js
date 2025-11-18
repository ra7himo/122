import express from 'express';
import MenuItem from '../models/MenuItem.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();
router.get('/', async (req,res)=>{
  const { all } = req.query;
  const items = await MenuItem.find(all ? {} : { available:true }).sort({ createdAt:-1 });
  res.json(items);
});
router.post('/', requireAuth, async (req,res)=>{
  try{ const created = await MenuItem.create(req.body); res.status(201).json(created); }
  catch(e){ res.status(400).json({ error:e.message }); }
});
router.put('/:id', requireAuth, async (req,res)=>{
  try{ const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new:true }); res.json(updated); }
  catch(e){ res.status(400).json({ error:e.message }); }
});
router.delete('/:id', requireAuth, async (req,res)=>{
  try{ await MenuItem.findByIdAndDelete(req.params.id); res.json({ ok:true }); }
  catch(e){ res.status(400).json({ error:e.message }); }
});
export default router;
