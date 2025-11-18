import { useEffect, useState } from 'react'
import api from '../../api'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [tab, setTab] = useState('settings')
  return (
    <div className="section">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h2>{t('admin.dashboard')}</h2>
        <div style={{display:'flex',gap:8}}>
          <button className="btn ghost" onClick={()=> setTab('settings')}>{t('admin.settings')}</button>
          <button className="btn ghost" onClick={()=> setTab('menu')}>{t('admin.menu')}</button>
          <button className="btn ghost" onClick={()=> setTab('gallery')}>{t('admin.gallery')}</button>
          <button className="btn" onClick={()=>{ localStorage.removeItem('token'); navigate('/admin/login') }}>{t('admin.logout')}</button>
        </div>
      </div>
      {tab==='settings' && <SettingsTab />}
      {tab==='menu' && <MenuTab lang={i18n.language} />}
      {tab==='gallery' && <GalleryTab lang={i18n.language} />}
    </div>
  )
}

function SettingsTab(){
  const { t } = useTranslation()
  const [s, setS] = useState(null)
  const [msg, setMsg] = useState('')
  useEffect(()=>{ api.get('/settings').then(res=> setS(res.data)) },[])
  if(!s) return <div>...</div>
  async function save(){ setMsg(''); const { data } = await api.put('/settings', s); setS(data); setMsg('✓ ' + (t('admin.update') || 'Mis à jour')) }
  const updateHours = (idx, field, value) => { const next = [...(s.hours||[])]; next[idx] = { ...next[idx], [field]: value }; setS({ ...s, hours: next }) }
  return (
    <div className="card" style={{display:'grid',gap:10}}>
      <div style={{display:'grid',gap:6,gridTemplateColumns:'1fr 1fr'}}>
        <label>Nom<br/><input value={s.name||''} onChange={e=> setS({...s, name:e.target.value})} /></label>
        <label>Téléphone<br/><input value={s.phone||''} onChange={e=> setS({...s, phone:e.target.value})} /></label>
        <label>Adresse<br/><input value={s.address||''} onChange={e=> setS({...s, address:e.target.value})} /></label>
        <label>Ville<br/><input value={s.city||''} onChange={e=> setS({...s, city:e.target.value})} /></label>
        <label>Map Embed URL<br/><input value={s.mapEmbedUrl||''} onChange={e=> setS({...s, mapEmbedUrl:e.target.value})} /></label>
      </div>
      <label>Tagline (FR)<br/><input value={s.heroTagline_fr||''} onChange={e=> setS({...s, heroTagline_fr:e.target.value})} /></label>
      <label>Tagline (AR)<br/><input value={s.heroTagline_ar||''} onChange={e=> setS({...s, heroTagline_ar:e.target.value})} /></label>
      <label>À propos (FR)<br/><textarea rows="3" value={s.about_fr||''} onChange={e=> setS({...s, about_fr:e.target.value})} /></label>
      <label>من نحن (AR)<br/><textarea rows="3" value={s.about_ar||''} onChange={e=> setS({...s, about_ar:e.target.value})} /></label>
      <div>
        <h3>Horaires</h3>
        <table>
          <thead><tr><th>Jour</th><th>Ouverture</th><th>Fermeture</th><th>Fermé</th></tr></thead>
          <tbody>
            {(s.hours||[]).map((h,idx)=> (
              <tr key={idx}>
                <td><input value={h.day} onChange={e=> updateHours(idx,'day',e.target.value)} /></td>
                <td><input value={h.open} onChange={e=> updateHours(idx,'open',e.target.value)} /></td>
                <td><input value={h.close} onChange={e=> updateHours(idx,'close',e.target.value)} /></td>
                <td><input type="checkbox" checked={h.closed||false} onChange={e=> updateHours(idx,'closed',e.target.checked)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{display:'flex',gap:8}}>
        <button className="btn primary" onClick={save}>{t('admin.save')}</button>
        {msg && <div style={{alignSelf:'center',color:'green'}}>{msg}</div>}
      </div>
    </div>
  )
}

function MenuTab({ lang }){
  const { t } = useTranslation()
  const empty = { name_fr:'', name_ar:'', description_fr:'', description_ar:'', price:0, category:'Sandwichs', imageUrl:'', available:true }
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const load = ()=> api.get('/menu', { params:{ all:true } }).then(res=> setItems(res.data))
  useEffect(load, [])
  async function submit(){ if(editingId){ await api.put('/menu/'+editingId, form) } else { await api.post('/menu', form) } setForm(empty); setEditingId(null); load() }
  async function edit(id){ const item = items.find(i=> i._id===id); setForm({...item}); setEditingId(id) }
  async function del(id){ if(confirm('Supprimer ?')){ await api.delete('/menu/'+id); load() } }
  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:16}}>
      <div className="card">
        <h3>{editingId? t('admin.update'): t('admin.add')} — {t('admin.menu')}</h3>
        <div style={{display:'grid',gap:8}}>
          <label>Nom (FR)<br/><input value={form.name_fr} onChange={e=> setForm({...form, name_fr:e.target.value})} /></label>
          <label>الاسم (AR)<br/><input value={form.name_ar} onChange={e=> setForm({...form, name_ar:e.target.value})} /></label>
          <label>Description (FR)<br/><textarea rows="2" value={form.description_fr} onChange={e=> setForm({...form, description_fr:e.target.value})} /></label>
          <label>الوصف (AR)<br/><textarea rows="2" value={form.description_ar} onChange={e=> setForm({...form, description_ar:e.target.value})} /></label>
          <label>Prix (DZD)<br/><input type="number" value={form.price} onChange={e=> setForm({...form, price:Number(e.target.value)})} /></label>
          <label>Catégorie<br/><input value={form.category} onChange={e=> setForm({...form, category:e.target.value})} /></label>
          <label>Image URL<br/><input value={form.imageUrl} onChange={e=> setForm({...form, imageUrl:e.target.value})} placeholder="https://..." /></label>
          <label><input type="checkbox" checked={form.available} onChange={e=> setForm({...form, available:e.target.checked})} /> Disponible</label>
          <div style={{display:'flex',gap:8}}>
            <button className="btn primary" onClick={submit}>{editingId? t('admin.update'): t('admin.add')}</button>
            {editingId && <button className="btn" onClick={()=>{ setForm(empty); setEditingId(null) }}>Annuler</button>}
          </div>
        </div>
      </div>
      <div className="card">
        <h3>Liste</h3>
        <table>
          <thead><tr><th>Nom</th><th>Prix</th><th>Catégorie</th><th></th></tr></thead>
          <tbody>
            {items.map(i=> (
              <tr key={i._id}>
                <td>{lang==='ar'? i.name_ar: i.name_fr}</td>
                <td>{i.price} دج</td>
                <td>{i.category}</td>
                <td>
                  <button className="btn ghost" onClick={()=>edit(i._id)}>Éditer</button>
                  <button className="btn" onClick={()=>del(i._id)}>{t('admin.delete')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function GalleryTab({ lang }){
  const { t } = useTranslation()
  const empty = { title_fr:'', title_ar:'', imageUrl:'' }
  const [list, setList] = useState([])
  const [form, setForm] = useState(empty)
  const load = ()=> api.get('/gallery').then(res=> setList(res.data))
  useEffect(load, [])
  async function add(){ await api.post('/gallery', form); setForm(empty); load() }
  async function del(id){ if(confirm('Supprimer ?')){ await api.delete('/gallery/'+id); load() } }
  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:16}}>
      <div className="card">
        <h3>{t('admin.add')} — {t('admin.gallery')}</h3>
        <div style={{display:'grid',gap:8}}>
          <label>Titre (FR)<br/><input value={form.title_fr} onChange={e=> setForm({...form, title_fr:e.target.value})} /></label>
          <label>العنوان (AR)<br/><input value={form.title_ar} onChange={e=> setForm({...form, title_ar:e.target.value})} /></label>
          <label>Image URL<br/><input value={form.imageUrl} onChange={e=> setForm({...form, imageUrl:e.target.value})} placeholder="https://..." /></label>
          <button className="btn primary" onClick={add}>{t('admin.add')}</button>
        </div>
      </div>
      <div className="card">
        <h3>Liste</h3>
        <table>
          <thead><tr><th>Titre</th><th>Image</th><th></th></tr></thead>
          <tbody>
            {list.map(g=> (
              <tr key={g._id}>
                <td>{lang==='ar'? g.title_ar: g.title_fr}</td>
                <td><a href={g.imageUrl} target="_blank">Voir</a></td>
                <td><button className="btn" onClick={()=>del(g._id)}>{t('admin.delete')}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
