import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../api'
export default function Gallery(){
  const { i18n } = useTranslation()
  const [images, setImages] = useState([])
  useEffect(()=>{ api.get('/gallery').then(res=> setImages(res.data)) },[])
  return (
    <div className="section">
      <h2>Galerie</h2>
      <div className="grid menu-grid">
        {images.map(img => (
          <div className="card" key={img._id}>
            <img src={img.imageUrl} alt={i18n.language==='ar'? img.title_ar : img.title_fr} />
            <p style={{marginTop:8,color:'#666'}}>{i18n.language==='ar'? img.title_ar : img.title_fr}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
