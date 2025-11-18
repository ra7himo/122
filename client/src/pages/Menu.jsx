import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../api'
export default function Menu(){
  const { i18n } = useTranslation()
  const [items, setItems] = useState([])
  useEffect(()=>{ api.get('/menu').then(res=> setItems(res.data)) },[])
  const categories = useMemo(()=> [...new Set(items.map(i=> i.category || 'Autres'))], [items])
  return (
    <div className="section">
      {categories.map(cat => (
        <div key={cat} style={{marginBottom:24}}>
          <h2>{cat}</h2>
          <div className="grid menu-grid">
            {items.filter(i=> (i.category||'Autres')===cat).map(item=> (
              <div className="card item" key={item._id}>
                <img src={item.imageUrl || 'https://placehold.co/600x400?text=Shawarma'} alt={i18n.language==='ar'? item.name_ar : item.name_fr} />
                <h3>{i18n.language==='ar'? item.name_ar : item.name_fr}</h3>
                <p style={{color:'#666'}}>{i18n.language==='ar'? item.description_ar : item.description_fr}</p>
                <strong>{item.price} دج</strong>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
