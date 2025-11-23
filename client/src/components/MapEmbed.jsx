export default function MapEmbed({ url, small }){
  const src = url || 'https://www.google.com/maps?q=Sidi%20Bel%20Abb%C3%A8s&output=embed'
  const height = small ? 220 : 360
  const link = src.replace('&output=embed','')
  return (
    <div style={{border:'1px solid #eee',borderRadius:12,overflow:'hidden'}}>
      <iframe
        src={src}
        style={{border:0,width:'100%',height}}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        title="map"
      ></iframe>
      <div style={{padding:8,fontSize:13}}>
        <a href={link} target="_blank" rel="noreferrer">
          🗺️ فتح الخريطة في Google Maps
        </a>
      </div>
    </div>
  )
}
