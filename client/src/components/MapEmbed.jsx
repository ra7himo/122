export default function MapEmbed({ url }){
  const src = url || 'https://www.google.com/maps?q=Sidi%20Bel%20Abb%C3%A5s&output=embed'
  return (
    <div style={{border:'1px solid #eee',borderRadius:12,overflow:'hidden'}}>
      <iframe src={src} style={{border:0,width:'100%',height:360}} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen title="map"></iframe>
    </div>
  )
}
