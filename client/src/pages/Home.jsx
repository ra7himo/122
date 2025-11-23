import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../api'
import MapEmbed from '../components/MapEmbed.jsx'
import Hours from '../components/Hours.jsx'
import { Link } from 'react-router-dom'

export default function Home(){
  const { t, i18n } = useTranslation()
  const [settings, setSettings] = useState(null)
  const [menu, setMenu] = useState([])

  useEffect(() => {
    api.get('/settings').then(res => setSettings(res.data))
    api.get('/menu').then(res => setMenu(res.data.slice(0,3)))
  }, [])

  const heroTitle = i18n.language === 'ar'
    ? (settings?.heroTagline_ar || t('hero_title'))
    : (settings?.heroTagline_fr || t('hero_title'))

  const heroImage = settings?.heroImageUrl || 'https://placehold.co/900x600?text=Photo+du+restaurant+122'

  const hasSocials = settings?.facebookUrl || settings?.instagramUrl || settings?.tiktokUrl

  return (
    <div>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-text">
              <h1 className="title">{heroTitle}</h1>
              <p className="subtitle">{t('hero_subtitle')}</p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:16}}>
                <a className="btn primary" href="tel:+213555555555">{t('cta_call')}</a>
                <Link className="btn ghost" to="/menu">{t('nav.menu')}</Link>
              </div>
              {hasSocials && (
                <div className="hero-socials">
                  <span style={{fontWeight:600,marginRight:8}}>follow us</span>
                  {settings?.facebookUrl && (
                    <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="social-pill">
                      Facebook
                    </a>
                  )}
                  {settings?.instagramUrl && (
                    <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="social-pill">
                      Instagram
                    </a>
                  )}
                  {settings?.tiktokUrl && (
                    <a href={settings.tiktokUrl} target="_blank" rel="noreferrer" className="social-pill">
                      TikTok
                    </a>
                  )}
                </div>
              )}
            </div>
            <div className="hero-image-wrapper">
              <img src={heroImage} alt="Restaurant 122" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>{t('sections.menu_preview')}</h2>
          <div className="grid menu-grid">
            {menu.map(item => (
              <div className="card item" key={item._id}>
                <img
                  src={item.imageUrl || 'https://placehold.co/600x400?text=Shawarma'}
                  alt={i18n.language === 'ar' ? item.name_ar : item.name_fr}
                />
                <div className="badge">{item.category}</div>
                <h3>{i18n.language === 'ar' ? item.name_ar : item.name_fr}</h3>
                <p style={{color:'#666'}}>
                  {i18n.language === 'ar' ? item.description_ar : item.description_fr}
                </p>
                <strong>{item.price} دج</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid cards">
          <div className="card">
            <h3>{t('sections.hours')}</h3>
            <Hours hours={settings?.hours || []} />
          </div>
          <div className="card">
            <h3>{t('sections.address')}</h3>
            <p>{settings?.address || 'Sidi Bel Abbès, Algérie'}</p>
            <MapEmbed url={settings?.mapEmbedUrl} small />
          </div>
        </div>
      </section>
    </div>
  )
}
