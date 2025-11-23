import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../api'

export default function Menu(){
  const { t, i18n } = useTranslation()
  const [items, setItems] = useState([])
  const [activeCat, setActiveCat] = useState('all')

  useEffect(() => {
    api.get('/menu').then(res => setItems(res.data))
  }, [])

  const categories = useMemo(
    () => [...new Set(items.map(i => i.category || 'Autres'))],
    [items]
  )

  const visibleItems = useMemo(
    () => activeCat === 'all'
      ? items
      : items.filter(i => (i.category || 'Autres') === activeCat),
    [items, activeCat]
  )

  return (
    <div className="section">
      <div className="menu-page-header">
        {/* العنوان والوصف حسب اللغة من ملفات الترجمة */}
        <h1>{t('menu_page.title')}</h1>
        <p>{t('menu_page.subtitle')}</p>
      </div>

      <div className="menu-category-tabs">
        <button
          className={activeCat === 'all' ? 'tab active' : 'tab'}
          onClick={() => setActiveCat('all')}
        >
          {t('menu_page.all')}
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={activeCat === cat ? 'tab active' : 'tab'}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menu-list">
        {visibleItems.map(item => (
          <MenuCard key={item._id} item={item} lang={i18n.language} />
        ))}
      </div>
    </div>
  )
}

function MenuCard({ item, lang }){
  const { t } = useTranslation()

  const name = lang === 'ar' ? item.name_ar : item.name_fr
  const desc = lang === 'ar' ? item.description_ar : item.description_fr
  const category = item.category || 'Autres'

  return (
    <div className="card menu-card-horizontal">
      <div className="menu-card-img">
        <img
          src={item.imageUrl || 'https://placehold.co/600x400?text=Shawarma'}
          alt={name}
        />
      </div>
      <div className="menu-card-body">
        <div className="menu-card-top">
          <h3>{name}</h3>
          <div className="menu-price">{item.price} دج</div>
        </div>
        <p className="menu-description">{desc}</p>
        <div className="menu-card-meta">
          <span className="badge">{category}</span>
          {!item.available && (
            <span className="badge badge-out">{t('menu_page.unavailable')}</span>
          )}
        </div>
      </div>
    </div>
  )
}
