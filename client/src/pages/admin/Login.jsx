import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../../api'
import { useNavigate } from 'react-router-dom'
export default function Login(){
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  async function submit(e){
    e.preventDefault(); setError('')
    try{
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token); navigate('/admin')
    }catch(err){ setError(err?.response?.data?.error || 'Erreur') }
  }
  return (
    <div className="section" style={{maxWidth:420,margin:'28px auto'}}>
      <h2>{t('admin.login_title')}</h2>
      <form onSubmit={submit} className="card" style={{display:'grid',gap:12}}>
        <label>{t('admin.email')}<br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@122.local" />
        </label>
        <label>{t('admin.password')}<br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
        </label>
        {error && <div style={{color:'crimson'}}>{error}</div>}
        <button className="btn primary" type="submit">{t('admin.login')}</button>
      </form>
    </div>
  )
}
