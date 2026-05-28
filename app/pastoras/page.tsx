import Link from "next/link"

export const metadata = {
  title: "Pastoras · Iglesia de Dios — Jesucristo Es El Señor",
  description: "Conoce a las pastoras de la Iglesia de Dios Jesucristo Es El Señor en Cartagena.",
}

const pastoras = [
  {
    nombre: "Pastora Martha Díaz",
    rol: "Pastora Principal",
    descripcion: "Con un corazón apasionado por la Palabra de Dios, la Pastora Marta Díaz lidera nuestra congregación con sabiduría, amor y dedicación. Su ministerio se enfoca en equipar a cada miembro para vivir una vida de fe auténtica y transformadora.",
    versículo: "\"Porque todo lo puedo en Cristo que me fortalece.\" — Filipenses 4:13",
    ministerios: ["Predicación y enseñanza", "Discipulado", "Cuidado pastoral"],
  },
  {
    nombre: "Pastora Amelia Castillo",
    rol: "Pastora Principal",
    descripcion: "La Pastora Amelia Castillo es un pilar de nuestra congregación. Su pasión por la oración y la intercesión, junto con su corazón de servicio, han sido fundamentales para el crecimiento espiritual de nuestra iglesia en Cartagena.",
    versículo: "\"El Señor es mi pastor; nada me faltará.\" — Salmos 23:1",
    ministerios: ["Ministerio de oración", "Ministerio de la mujer", "Evangelismo"],
  },
]

export default function Pastoras() {
  return (
    <main className="innerPage">

      <section className="innerHero">
        <div className="innerHeroOverlay" />
        <div className="innerHeroContent">
          <span className="secTag light">Liderazgo</span>
          <h1 className="innerHeroTitle">Nuestras Pastoras</h1>
          <p className="innerHeroSub">Siervos del Señor comprometidos con la congregación de Cartagena</p>
        </div>
      </section>

      <div className="breadcrumb">
        <div className="container">
          <Link href="/">Inicio</Link> <span>/</span> <span>Pastoras</span>
        </div>
      </div>

      <div className="container innerContent">

        <div className="secHeader" style={{textAlign:"center",marginBottom:56}}>
          <span className="secTag">Liderazgo pastoral</span>
          <h2 className="histTitle">Dirigidas por el Espíritu de Dios</h2>
          <p style={{color:"#666",maxWidth:520,margin:"14px auto 0",lineHeight:1.7,fontSize:15}}>
            Nuestra iglesia es guiada por dos pastoras llamadas por Dios, comprometidas con la Palabra
            y con cada miembro de la congregación.
          </p>
        </div>

        {/* Tarjetas pastoras — 2 columnas */}
        <div className="col2" style={{gap:32,marginBottom:64}}>
          {pastoras.map((p) => (
            <div key={p.nombre} className="pastCard">
              {/* Avatar con iniciales */}
              <div className="pastAvatar">
                {p.nombre.split(" ").filter((_,i)=>i>0).map(w=>w[0]).join("").slice(0,2)}
              </div>
              <div className="pastRol">{p.rol}</div>
              <h2 className="pastNombre">{p.nombre}</h2>
              <p className="pastDesc">{p.descripcion}</p>
              <blockquote className="pastVerse">{p.versículo}</blockquote>
              <div className="pastMinisterios">
                <p className="pastMinTitulo">Ministerios:</p>
                <div className="pastTags">
                  {p.ministerios.map(m => (
                    <span key={m} className="pastTag">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA contacto */}
        <div className="pastCta">
          <h3>¿Necesitas hablar con una pastora?</h3>
          <p>Estamos disponibles para orar contigo, aconsejarte y acompañarte en tu caminar con Dios.</p>
          <a href="https://wa.me/573007433603" target="_blank" className="btnWa">
            📱 Escribir por WhatsApp
          </a>
        </div>

        <div className="histActions" style={{marginTop:48}}>
          <Link href="/" className="btnBack">← Volver al inicio</Link>
        </div>

      </div>
    </main>
  )
}
