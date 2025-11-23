import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../api'
import MapEmbed from '../components/MapEmbed.jsx'
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6"

export default function Contact(){
  const { t } = useTranslation()
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    api.get('/settings').then(res => setSettings(res.data))
  }, [])

  const hasSocials =
    settings?.facebookUrl ||
    settings?.instagramUrl ||
    settings?.tiktokUrl

  return (
    <div className="section">
      <h2>{t('contact.title')}</h2>

      <p>
        <strong>{t('contact.phone')}:</strong>{' '}
        <a href={`tel:${settings?.phone || ''}`}>
          {settings?.phone || '+213 555 55 55 55'}
        </a>
      </p>

      <p>
        <strong>{t('sections.address')}:</strong>{' '}
        {settings?.address || 'Sidi Bel Abbès, Algérie'}
      </p>

      {/* حسابات التواصل الاجتماعي */}
      {hasSocials && (
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <h3>{t('contact.social')}</h3>

          <div style={{
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            {settings?.facebookUrl && (
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', gap: 6, alignItems: 'center' }}
              >
                <FaFacebook size={22} color="#1877F2" />
                <span>Facebook</span>
              </a>
            )}

            {settings?.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', gap: 6, alignItems: 'center' }}
              >
                <FaInstagram size={22} color="#E4405F" />
                <span>Instagram</span>
              </a>
            )}

            {settings?.tiktokUrl && (
              <a
                href={settings.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', gap: 6, alignItems: 'center' }}
              >
                <FaTiktok size={22} color="#000" />
                <span>TikTok</span>
              </a>
            )}
          </div>
        </div>
      )}

      <MapEmbed url={settings?.mapEmbedUrl} small />
    </div>
  )
}
