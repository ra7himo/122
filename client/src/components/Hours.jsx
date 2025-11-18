import { useTranslation } from 'react-i18next'
export default function Hours({ hours = [] }){
  const { t, i18n } = useTranslation()
  if(!hours || hours.length===0) return null
  const fmt = (h) => h.closed ? (i18n.language==='ar'?'مغلق':'Fermé') : `${h.open} - ${h.close}`
  return (
    <table>
      <thead><tr><th>{t('sections.hours')}</th><th></th></tr></thead>
      <tbody>{hours.map((h,idx)=>(<tr key={idx}><td>{h.day}</td><td>{fmt(h)}</td></tr>))}</tbody>
    </table>
  )
}
