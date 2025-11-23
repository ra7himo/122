import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import MenuItem from './models/MenuItem.js';
import GalleryImage from './models/GalleryImage.js';
import Settings from './models/Settings.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/restaurant122';

async function main(){
  await mongoose.connect(MONGODB_URI);
  console.log('✅ MongoDB connecté pour seed');

  const email = process.env.ADMIN_EMAIL || 'admin@122.local';
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

  let admin = await User.findOne({ email });
  if(!admin){
    const passwordHash = await bcrypt.hash(password, 10);
    admin = await User.create({ email, passwordHash });
    console.log('👤 Admin créé:', email, '(pass:', password, ')');
  } else {
    console.log('ℹ️ Admin existe déjà:', email);
  }

  let s = await Settings.findOne({});
  if(!s){
    s = await Settings.create({
      name:'122',
      phone:'+213 555 55 55 55',
      address:'Sidi Bel Abbès, Algérie',
      city:'Sidi Bel Abbès',
      languages:['fr','ar'],
      heroTagline_fr:'Shawarma fraîche, pain maison, sauces généreuses — à Sidi Bel Abbès.',
      heroTagline_ar:'شاورما طازجة، خبز منزلي، وصلصات سخية — في سيدي بلعباس.',
      heroImageUrl:'https://placehold.co/900x600?text=Photo+du+restaurant+122',
      about_fr:'Chez 122, on prépare une shawarma savoureuse avec des ingrédients frais et une cuisson maîtrisée. Ambiance conviviale pour familles et collègues.',
      about_ar:'في 122 نحضّر شاورما لذيذة بمكونات طازجة وطهي متقن. أجواء ودّية مناسبة للعائلات والموظفين.',
      mapEmbedUrl:'https://www.google.com/maps?q=Sidi%20Bel%20Abb%C3%A8s&output=embed',
      facebookUrl:'',
      instagramUrl:'',
      tiktokUrl:'',
      hours:[
        { day:'Lundi', open:'11:00', close:'23:00', closed:false },
        { day:'Mardi', open:'11:00', close:'23:00', closed:false },
        { day:'Mercredi', open:'11:00', close:'23:00', closed:false },
        { day:'Jeudi', open:'11:00', close:'23:00', closed:false },
        { day:'Vendredi', open:'16:00', close:'23:30', closed:false },
        { day:'Samedi', open:'11:00', close:'23:30', closed:false },
        { day:'Dimanche', open:'11:00', close:'23:30', closed:false }
      ]
    });
    console.log('⚙️ Paramètres par défaut créés');
  } else {
    console.log('ℹ️ Paramètres déjà existants');
  }

  const countMenu = await MenuItem.countDocuments();
  if(countMenu === 0){
    await MenuItem.insertMany([
      {
        name_fr:'Shawarma Sandwich',
        name_ar:'شطيرة شاورما',
        description_fr:'Poulet mariné, pain maison, salade, sauce blanche.',
        description_ar:'دجاج متبل، خبز منزلي، سلطة، صلصة بيضاء.',
        price:450,
        category:'Sandwichs',
        imageUrl:'https://placehold.co/800x600?text=Shawarma+Sandwich',
        available:true
      },
      {
        name_fr:'Assiette Shawarma',
        name_ar:'طبق شاورما',
        description_fr:'Frites, salade et sauces.',
        description_ar:'بطاطا مقلية وسلطة وصلصات.',
        price:900,
        category:'Assiettes',
        imageUrl:'https://placehold.co/800x600?text=Assiette+Shawarma',
        available:true
      },
      {
        name_fr:'Shawarma Mix',
        name_ar:'شاورما ميكس',
        description_fr:'Mélange poulet/boeuf, parfait à partager.',
        description_ar:'مزيج دجاج/لحم بقري، مثالي للمشاركة.',
        price:1100,
        category:'Assiettes',
        imageUrl:'https://placehold.co/800x600?text=Shawarma+Mix',
        available:true
      }
    ]);
    console.log('🍽️ Menu de démo inséré');
  } else {
    console.log('ℹ️ Menu déjà existant:', countMenu, 'éléments');
  }

  const countGal = await GalleryImage.countDocuments();
  if(countGal === 0){
    await GalleryImage.insertMany([
      { title_fr:'Shawarma en préparation', title_ar:'تحضير الشاورما', imageUrl:'https://placehold.co/800x600?text=Shawarma' },
      { title_fr:'Ambiance 122', title_ar:'أجواء 122', imageUrl:'https://placehold.co/800x600?text=Ambiance' }
    ]);
    console.log('🖼️ Galerie de démo insérée');
  } else {
    console.log('ℹ️ Galerie déjà existante:', countGal, 'images');
  }

  await mongoose.disconnect();
  console.log('✅ Seed terminé');
}

main().catch(e => { console.error(e); process.exit(1); });
