"use client"
import Navbar from "../components/Navbar"
import Link from "next/link"

const sedesActuales = [
  {
    nombre: "Sede Tierra Baja",
    ciudad: "Cartagena, Bolívar",
    direccion: "Calle 3 # 7-24, Tierra Baja, Cartagena, Bolívar",
    pastor: "Pastor Joaquín Puerta",
    pastoras: ["Pastora Marta Díaz", "Pastora Amelia Castillo"],
    horarios: "Dom · Mié · Sáb 9:30am | Mar · Jue 7pm | Sáb Jóvenes 5:40pm",
    estado: "activa",
    emoji: "⛪",
    mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.0!2d-75.52057!3d10.42179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCalle+3+%237-24+Tierra+Baja+Cartagena!5e0!3m2!1ses!2sco!4v1620000000000!5m2!1ses!2sco",
  },
]

const sedesProximas = [
  { nombre: "Sede Norte",          ciudad: "Cartagena Norte",  emoji: "🔜" },
  { nombre: "Sede Centro",         ciudad: "Cartagena Centro", emoji: "🔜" },
  { nombre: "Sede Bolívar",        ciudad: "Departamento de Bolívar", emoji: "🔜" },
  { nombre: "Expansión Nacional",  ciudad: "Colombia",         emoji: "🌎" },
]

const progreso = 1
const meta = 100
const porcentaje = (progreso / meta) * 100

export default function Sedes() {
  return (
    <main className="innerPage">
      <Navbar />

      <section className="innerHero">
        <div className="innerHeroOverlay" />
        <div className="innerHeroContent">
          <span className="secTag light">Expansión</span>
          <h1 className="innerHeroTitle">Nuestras Sedes</h1>
          <p className="innerHeroSub">
            Una visión de 100 iglesias plantadas para la gloria de Dios en Colombia
          </p>
        </div>
      </section>

      <div className="breadcrumb">
        <div className="container">
          <Link href="/">Inicio</Link> <span>/</span> <span>Sedes</span>
        </div>
      </div>

      <div className="container innerContent">

        {/* ── VISIÓN Y PROGRESO ── */}
        <div className="sedesVision">
          <div className="sedesVisionTexto">
            <span className="secTag">Nuestra visión</span>
            <h2 className="histTitle">Meta: 100 Iglesias</h2>
            <p style={{ fontSize:15, color:"#555", lineHeight:1.8, marginBottom:24 }}>
              La Iglesia de Dios — Jesucristo Es El Señor tiene la visión de plantar
              100 iglesias hijas en Colombia. Cada sede es un nuevo centro de adoración,
              comunidad y transformación para las familias colombianas.
            </p>
            <p style={{ fontStyle:"italic", color:"var(--green)", fontSize:14, borderLeft:"3px solid var(--green)", paddingLeft:14 }}>
              "Id por todo el mundo y predicad el evangelio a toda criatura." — Marcos 16:15
            </p>
          </div>

          <div className="sedesProgreso">
            <div className="sedesProgresoNumeros">
              <div className="sedesProgresoStat">
                <span className="sedesProgresoVal">{progreso}</span>
                <span className="sedesProgresoLabel">Sede activa</span>
              </div>
              <div className="sedesProgresoDiv">→</div>
              <div className="sedesProgresoStat">
                <span className="sedesProgresoVal">{meta}</span>
                <span className="sedesProgresoLabel">Meta final</span>
              </div>
            </div>
            <div className="sedesBarraFondo">
              <div className="sedesBarraRelleno" style={{ width:`${porcentaje}%` }} />
            </div>
            <p style={{ fontSize:13, color:"#888", textAlign:"center", marginTop:10 }}>
              {progreso} de {meta} iglesias plantadas · {porcentaje.toFixed(0)}% completado
            </p>
            <div className="sedesStats">
              {[
                { emoji:"⛪", val:"1",    label:"Sede activa" },
                { emoji:"🎯", val:"100",  label:"Meta de sedes" },
                { emoji:"🙏", val:"∞",    label:"Vidas impactadas" },
                { emoji:"🌎", val:"1886", label:"Fundada en" },
              ].map(({ emoji, val, label }) => (
                <div key={label} className="sedesStat">
                  <span className="sedesStatEmoji">{emoji}</span>
                  <span className="sedesStatVal">{val}</span>
                  <span className="sedesStatLabel">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SEDE ACTUAL ── */}
        <div className="secHeader" style={{ textAlign:"center", margin:"60px 0 32px" }}>
          <span className="secTag">En funcionamiento</span>
          <h2 className="histTitle">Sede Actual</h2>
        </div>

        {sedesActuales.map(s => (
          <div key={s.nombre} className="sedeCardActiva">
            <div className="sedeCardActivaIcono">{s.emoji}</div>
            <div className="sedeCardActivaInfo">
              <div className="sedeCardActivaBadge">● Activa</div>
              <h3 className="sedeCardActivaNombre">{s.nombre}</h3>
              <p className="sedeCardActivaCiudad">📍 {s.ciudad}</p>
              <p className="sedeCardActivaDir">🏠 {s.direccion}</p>
              <p className="sedeCardActivaPast">👤 {s.pastor}</p>
              <p className="sedeCardActivaPast">
                🙏 {s.pastoras.join(" · ")}
              </p>
              <p className="sedeCardActivaHora">🕐 {s.horarios}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.direccion)}`}
                target="_blank"
                className="panelBtn"
                style={{ marginTop:16, display:"inline-block" }}
              >
                📍 Ver en Google Maps →
              </a>
            </div>
            <div className="sedeCardActivaMapa">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.5539!2d-75.5230!3d10.4190!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef625b0e8b9a10f%3A0x0!2sCalle+3+%237-24%2C+Tierra+Baja%2C+Cartagena!5e0!3m2!1ses-419!2sco!4v1620000000000!5m2!1ses-419!2sco"
                width="100%" height="100%"
                style={{ border:0, borderRadius:12 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        ))}

        {/* ── PRÓXIMAS SEDES ── */}
        <div className="secHeader" style={{ textAlign:"center", margin:"60px 0 32px" }}>
          <span className="secTag">Expansión nacional</span>
          <h2 className="histTitle">Próximas Sedes</h2>
          <p style={{ color:"#666", fontSize:15, maxWidth:500, margin:"12px auto 0", lineHeight:1.7 }}>
            Con la visión de llegar a cada rincón de Colombia, estas son las próximas
            ciudades donde plantaremos nuevas congregaciones.
          </p>
        </div>

        <div className="col3" style={{ marginBottom:48 }}>
          {sedesProximas.map(s => (
            <div key={s.nombre} className="sedeCardProxima">
              <span className="sedeCardProximaEmoji">{s.emoji}</span>
              <h3 className="sedeCardProximaNombre">{s.nombre}</h3>
              <p className="sedeCardProximaCiudad">{s.ciudad}</p>
              <span className="sedeCardProximaBadge">Próximamente</span>
            </div>
          ))}
          <div className="sedeCardProxima sedeCardTuCiudad">
            <span className="sedeCardProximaEmoji">🙌</span>
            <h3 className="sedeCardProximaNombre">¿Tu ciudad?</h3>
            <p className="sedeCardProximaCiudad">Dios está moviendo su obra por toda Colombia</p>
            <span className="sedeCardProximaBadge" style={{ background:"#dcfce7", color:"#166534" }}>
              ¡Pronto!
            </span>
          </div>
        </div>

        <div className="histActions" style={{ marginTop:32 }}>
          <Link href="/" className="btnBack">← Volver al inicio</Link>
        </div>

      </div>
    </main>
  )
}
