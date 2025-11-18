import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../api'
import MapEmbed from '../components/MapEmbed.jsx'
export default function Contact(){
  const { t } = useTranslation()
  const [settings, setSettings] = useState(null)
  useEffect(()=>{ api.get('/settings').then(res=> setSettings(res.data)) },[])
  return (
    <div className="section">
      <h2>{t('contact.title')}</h2>
      <p><strong>{t('contact.phone')}:</strong> <a href={`tel:${settings?.phone || ''}`}>{settings?.phone || '+213 555 55 55 55'}</a></p>
      <p><strong>{t('sections.address')}:</strong> {settings?.address || 'Sidi Bel Abbès, Algérie'}</p>
      <MapEmbed url={settings?.mapEmbedUrl} />
    </div>
  )
}
