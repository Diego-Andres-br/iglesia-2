import Link from "next/link"

export const metadata = {
  title: "Cronograma · Iglesia de Dios — Jesucristo Es El Señor",
  description: "Horario semanal de servicios y reuniones de la Iglesia de Dios Jesucristo Es El Señor en Cartagena.",
}

const dias = [
  {
    dia: "Domingo",
    color: "#2d6a4f",
    eventos: [
      { hora: "9:30 AM – 12:30 PM", nombre: "Culto de Adoración General", icono: "🎤", tipo: "Principal", online: true },
    ],
  },
  {
    dia: "Martes",
    color: "#1d3557",
    eventos: [
      { hora: "7:00 PM – 8:30 PM", nombre: "Reunión de Oración", icono: "🙏", tipo: "Oración", online: true },
    ],
  },
  {
    dia: "Miércoles",
    color: "#2d6a4f",
    eventos: [
      { hora: "9:30 AM – 12:30 PM", nombre: "Culto Midweek", icono: "📖", tipo: "Estudio", online: true },
    ],
  },
  {
    dia: "Jueves",
    color: "#1d3557",
    eventos: [
      { hora: "7:00 PM – 8:30 PM", nombre: "Estudio Bíblico", icono: "📚", tipo: "Estudio", online: true },
    ],
  },
  {
    dia: "Sábado",
    color: "#7b2d8b",
    eventos: [
      { hora: "9:30 AM – 12:30 PM", nombre: "Culto Sabatino", icono: "✝️", tipo: "Principal", online: true },
      { hora: "5:40 PM – 7:00 PM",  nombre: "Grupo de Jóvenes", icono: "🎸", tipo: "Jóvenes", online: false },
    ],
  },
]

const tipoBadge: Record<string, string> = {
  "Principal": "#dcfce7",
  "Oración":   "#dbeafe",
  "Estudio":   "#fef3c7",
  "Jóvenes":   "#fae8ff",
}
const tipoColor: Record<string, string> = {
  "Principal": "#166534",
  "Oración":   "#1e3a8a",
  "Estudio":   "#92400e",
  "Jóvenes":   "#6b21a8",
}

export default function Cronograma() {
  return (
    <main className="innerPage">

      <section className="innerHero">
        <div className="innerHeroOverlay" />
        <div className="innerHeroContent">
          <span className="secTag light">Horarios</span>
          <h1 className="innerHeroTitle">Cronograma Semanal</h1>
          <p className="innerHeroSub">Todos nuestros servicios están disponibles en persona y en línea</p>
        </div>
      </section>

      <div className="breadcrumb">
        <div className="container">
          <Link href="/">Inicio</Link> <span>/</span> <span>Cronograma</span>
        </div>
      </div>

      <div className="container innerContent">

        <div className="secHeader" style={{textAlign:"center",marginBottom:52}}>
          <span className="secTag">Semana a semana</span>
          <h2 className="histTitle">Horario de Servicios</h2>
          <p style={{color:"#666",maxWidth:520,margin:"14px auto 0",lineHeight:1.7,fontSize:15}}>
            Todos nuestros cultos y reuniones están abiertos al público. Puedes unirte en persona o
            conectarte en línea por videollamada. ¡Te esperamos!
          </p>
        </div>

        {/* Grilla de días */}
        <div className="cronoGrid">
          {dias.map(({ dia, color, eventos }) => (
            <div key={dia} className="cronoCard">
              <div className="cronoDia" style={{ background: color }}>{dia}</div>
              <div className="cronoEventos">
                {eventos.map(({ hora, nombre, icono, tipo, online }) => (
                  <div key={nombre} className="cronoEvento">
                    <div className="cronoIcono">{icono}</div>
                    <div className="cronoInfo">
                      <div className="cronoHora">{hora}</div>
                      <div className="cronoNombre">{nombre}</div>
                      <div className="cronoBadges">
                        <span className="cronoBadge" style={{background: tipoBadge[tipo], color: tipoColor[tipo]}}>
                          {tipo}
                        </span>
                        {online && (
                          <span className="cronoBadge" style={{background:"#dcfce7",color:"#166534"}}>
                            🌐 En línea
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Resumen rápido */}
        <div className="cronoResumen">
          <h3>¿Cuándo nos reunimos?</h3>
          <div className="cronoResumenGrid">
            {[
              { emoji: "🗓️", label: "Días de reunión", value: "Dom · Mar · Mié · Jue · Sáb" },
              { emoji: "⏰", label: "Horarios mañana", value: "9:30 AM – 12:30 PM" },
              { emoji: "🌙", label: "Horarios noche",  value: "7:00 PM – 8:30 PM" },
              { emoji: "🌐", label: "Todos en línea",  value: "Jitsi Meet gratuito" },
            ].map(({ emoji, label, value }) => (
              <div key={label} className="cronoStat">
                <span className="cronoStatEmoji">{emoji}</span>
                <span className="cronoStatLabel">{label}</span>
                <span className="cronoStatValue">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA unirse */}
        <div className="pastCta">
          <h3>¿Listo para unirte en línea?</h3>
          <p>Entra a cualquiera de nuestras salas de videollamada. Gratis, sin registro, sin descargas.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginTop:20}}>
            <a href="https://meet.jit.si/IddJesucristoEsElSenor-Culto" target="_blank" className="ctaPrimary">
              🎤 Entrar al Culto General
            </a>
            <a href="https://wa.me/573007433603" target="_blank" className="btnWa">
              📱 Preguntar por WhatsApp
            </a>
          </div>
        </div>

        <div className="histActions" style={{marginTop:48}}>
          <Link href="/" className="btnBack">← Volver al inicio</Link>
        </div>

      </div>
    </main>
  )
}
