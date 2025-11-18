import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import api from '../api'
export default function Footer(){
  const { t } = useTranslation()
  const [settings, setSettings] = useState(null)
  useEffect(()=>{ api.get('/settings').then(res=> setSettings(res.data)) },[])
  return (
    <footer className="footer">
      <div className="container">
        <div style={{display:'flex',gap:24,flexWrap:'wrap',justifyContent:'space-between',alignItems:'center'}}>
          <div><strong>122</strong> — {settings?.city || 'Sidi Bel Abbès'}</div>
          <div>{t('contact.phone')}: <a href={`tel:${settings?.phone || ''}`}>{settings?.phone || '+213 555 55 55 55'}</a></div>
          <div>© {new Date().getFullYear()} 122</div>
        </div>
      </div>
    </footer>
  )
}
