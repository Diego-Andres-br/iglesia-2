"use client"
import { useState } from "react"

const IGLESIA = "IddJesucristoEsElSenor"

const salas = [
  {
    id:      "Culto",
    nombre:  "Culto General",
    emoji:   "🎤",
    horario: "Dom 9:30am · Mié 9:30am · Sáb 9:30am",
    desc:    "Culto de adoración principal. Pastoras Marta Díaz y Amelia Castillo.",
    activa:  true,
    color:   "#2d6a4f",
  },
  {
    id:      "Oracion",
    nombre:  "Reunión de Oración",
    emoji:   "🙏",
    horario: "Mar 7:00pm · Jue 7:00pm",
    desc:    "Tiempo de intercesión y oración grupal. Abierto a toda la congregación.",
    activa:  true,
    color:   "#1d3557",
  },
  {
    id:      "Estudio",
    nombre:  "Estudio Bíblico",
    emoji:   "📖",
    horario: "Jue 7:00pm",
    desc:    "Profundiza en la Palabra de Dios con nuestra comunidad.",
    activa:  true,
    color:   "#7b4f1a",
  },
  {
    id:      "Jovenes",
    nombre:  "Grupo de Jóvenes",
    emoji:   "🎸",
    horario: "Sáb 5:40pm – 7:00pm",
    desc:    "Ministerio juvenil. ¡Un espacio para crecer en fe y comunidad!",
    activa:  true,
    color:   "#6b21a8",
  },
]

export default function VideoLlamadas() {
  const [modal, setModal] = useState<string | null>(null)
  const sala = salas.find(s => s.id === modal)

  return (
    <section style={{
      padding: "100px 0",
      background: "linear-gradient(180deg, #0a0a0f 0%, #0f1f15 100%)",
    }}>
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>

        {/* Encabezado */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{
            display: "inline-block", fontSize: 11, letterSpacing: "0.14em",
            textTransform: "uppercase", fontWeight: 600,
            color: "#a8d8b9", background: "rgba(45,106,79,0.25)",
            padding: "5px 16px", borderRadius: 20, marginBottom: 14,
          }}>
            Reuniones en línea
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(26px, 4vw, 40px)",
            color: "#fff", marginBottom: 14, lineHeight: 1.2,
          }}>
            Únete desde donde estés
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Iglesia de Dios — Jesucristo Es El Señor · Cartagena<br />
            Gratis · Sin registro · Sin descargas
          </p>
        </div>

        {/* Grid de salas — 2×2 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
          marginBottom: 48,
        }}>
          {salas.map(s => (
            <div
              key={s.id}
              onClick={() => setModal(s.id)}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${s.color}55`,
                borderRadius: 16,
                padding: "28px 22px",
                cursor: "pointer",
                transition: "transform 0.2s, background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)"
                ;(e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.08)"
                ;(e.currentTarget as HTMLDivElement).style.borderColor = s.color
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"
                ;(e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)"
                ;(e.currentTarget as HTMLDivElement).style.borderColor = s.color + "55"
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 14 }}>{s.emoji}</div>
              <h3 style={{ color: "#fff", fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{s.nombre}</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 10 }}>{s.horario}</p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.6, marginBottom: 18 }}>{s.desc}</p>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: s.color, color: "#fff",
                fontSize: 12, padding: "5px 14px", borderRadius: 20, fontWeight: 600,
              }}>
                ● Entrar a la sala
              </span>
            </div>
          ))}
        </div>

        {/* Info extra */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 14, padding: "24px 28px",
          display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center",
        }}>
          {[
            ["🔒", "Cifrado de extremo a extremo"],
            ["📱", "Funciona en celular y computador"],
            ["⚡", "Sin instalaciones — solo clic"],
            ["∞",  "Sin límite de tiempo ni participantes"],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
              <span style={{ fontSize: 18 }}>{icon}</span> {text}
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {modal && sala && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999, padding: 20,
          }}
          onClick={() => setModal(null)}
        >
          <div
            style={{
              background: "#13131e", border: `1px solid ${sala.color}`,
              borderRadius: 20, padding: 36, maxWidth: 420, width: "100%",
              textAlign: "center",
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontSize: 44, marginBottom: 16 }}>{sala.emoji}</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              color: "#fff", fontSize: 22, marginBottom: 8,
            }}>
              {sala.nombre}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 6 }}>{sala.horario}</p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{sala.desc}</p>
            <div style={{
              background: "rgba(255,255,255,0.05)", borderRadius: 10,
              padding: "12px 16px", marginBottom: 24, fontFamily: "monospace",
              fontSize: 12, color: "#a8d8b9", wordBreak: "break-all",
            }}>
              meet.jit.si/{IGLESIA}-{sala.id}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setModal(null)}
                style={{
                  flex: 1, background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 10, padding: "11px", color: "rgba(255,255,255,0.6)",
                  cursor: "pointer", fontSize: 14, fontFamily: "inherit",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => { window.open(`https://meet.jit.si/${IGLESIA}-${sala.id}`, "_blank"); setModal(null) }}
                style={{
                  flex: 1, background: sala.color, border: "none",
                  borderRadius: 10, padding: "11px", color: "#fff",
                  cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "inherit",
                }}
              >
                Unirme ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
