import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }
  const user = await User.findOne({ email });
  if(!user){
    return res.status(401).json({ error: 'Identifiants invalides' });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if(!ok){
    return res.status(401).json({ error: 'Identifiants invalides' });
  }
  const token = jwt.sign(
    { uid: user._id, email: user.email },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '7d' }
  );
  res.json({ token, email: user.email });
});

export default router;
