import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../api'

export default function About(){
  const { t, i18n } = useTranslation()
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    api.get('/settings').then(res => setSettings(res.data))
  }, [])

  return (
    <div className="section">
      <h2>{t('about.title')}</h2>
      <p style={{maxWidth:800}}>
        {i18n.language === 'ar' ? settings?.about_ar : settings?.about_fr}
      </p>
    </div>
  )
}
