import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import fr from './translations/fr.json'
import ar from './translations/ar.json'
i18n.use(initReactI18next).init({
  resources: { fr:{ translation:fr }, ar:{ translation:ar } },
  lng:'fr', fallbackLng:'fr', interpolation:{ escapeValue:false }
})
i18n.on('languageChanged', (lng)=>{
  const html = document.documentElement
  html.lang = lng || 'fr'; html.dir = (lng === 'ar' ? 'rtl':'ltr')
})
export default i18n
