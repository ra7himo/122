import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
export default function Navbar(){
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const toggleLang = ()=> i18n.changeLanguage(i18n.language === 'fr' ? 'ar' : 'fr')
  return (
    <nav className="nav">
      <div className="container inner">
        <Link to="/" className="brand">122 <span className="dot"></span></Link>
        <div className="nav-links">
          <NavLink to="/">{t('nav.home')}</NavLink>
          <NavLink to="/menu">{t('nav.menu')}</NavLink>
          <NavLink to="/gallery">{t('nav.gallery')}</NavLink>
          <NavLink to="/about">{t('nav.about')}</NavLink>
          <NavLink to="/contact">{t('nav.contact')}</NavLink>
          <button className="btn ghost" onClick={toggleLang}>{i18n.language==='fr'?'AR':'FR'}</button>
          <a className="btn primary" href="tel:+213555555555">{t('cta_call')}</a>
          <button className="btn ghost" onClick={()=>navigate('/admin')}>{t('nav.admin')}</button>
        </div>
      </div>
    </nav>
  )
}
