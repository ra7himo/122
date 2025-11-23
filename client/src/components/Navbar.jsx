import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { FaBars, FaXmark } from "react-icons/fa6"

export default function Navbar(){
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)

  const toggleLang = () => {
    const next = i18n.language === 'fr' ? 'ar' : 'fr'
    i18n.changeLanguage(next)
  }

  const closeMenu = () => setOpen(false)

  return (
    <nav className="nav">
      <div className="container inner">
        <Link to="/" className="brand" onClick={closeMenu}>
          <div className="brand-mark">
            <span>122</span>
          </div>
          <div>
            <div>Shawarma 122</div>
            <div className="brand-text-small">Sidi Bel Abbès</div>
          </div>
        </Link>

        {/* mobile toggle */}
        <button
          className="nav-toggle"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <FaXmark /> : <FaBars />}
        </button>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          {/* Navbar always in French like you asked */}
          <NavLink
            to="/"
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            onClick={closeMenu}
          >
            Accueil
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            onClick={closeMenu}
          >
            Menu
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            onClick={closeMenu}
          >
            Galerie
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            onClick={closeMenu}
          >
            À propos
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            onClick={closeMenu}
          >
            Contact
          </NavLink>

          <div className="nav-actions">
            <button className="btn ghost lang-pill" onClick={toggleLang}>
              {i18n.language === 'fr' ? 'FR / AR' : 'AR / FR'}
            </button>
            <a className="btn primary" href="tel:+213555555555">
              Appeler
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
