import express from 'express';
import Settings from '../models/Settings.js';
import { requireAuth } from '../middleware/auth.js';
const router = express.Router();
router.get('/', async (req,res)=>{
  let s = await Settings.findOne({}).lean();
  if(!s){
    s = {
      name:'122',
      phone:'+213 555 55 55 55',
      address:'Sidi Bel Abbès, Algérie',
      city:'Sidi Bel Abbès',
      languages:['fr','ar'],
      heroTagline_fr:'Shawarma fraîche, pain maison, sauces généreuses — à Sidi Bel Abbès.',
      heroTagline_ar:'شاورما طازجة، خبز منزلي، وصلصات سخية — في سيدي بلعباس.',
      about_fr:'Chez 122, on prépare une shawarma savoureuse avec des ingrédients frais et une cuisson maîtrisée. Ambiance conviviale pour familles et collègues.',
      about_ar:'في 122 نحضّر شاورما لذيذة بمكونات طازجة وطهي متقن. أجواء ودّية مناسبة للعائلات والموظفين.',
      mapEmbedUrl:'https://www.google.com/maps?q=Sidi%20Bel%20Abb%C3%A8s&output=embed',
      hours:[
        { day:'Lundi', open:'11:00', close:'23:00', closed:false },
        { day:'Mardi', open:'11:00', close:'23:00', closed:false },
        { day:'Mercredi', open:'11:00', close:'23:00', closed:false },
        { day:'Jeudi', open:'11:00', close:'23:00', closed:false },
        { day:'Vendredi', open:'16:00', close:'23:30', closed:false },
        { day:'Samedi', open:'11:00', close:'23:30', closed:false },
        { day:'Dimanche', open:'11:00', close:'23:30', closed:false }
      ]
    };
  }
  res.json(s);
});
router.put('/', requireAuth, async (req,res)=>{
  try{
    const existing = await Settings.findOne({});
    if(existing){ Object.assign(existing, req.body); await existing.save(); return res.json(existing); }
    const created = await Settings.create(req.body); return res.status(201).json(created);
  }catch(e){ res.status(400).json({ error:e.message }); }
});
export default router;
