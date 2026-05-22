"use client"
import { useState } from "react"

const salas = [
{ id: "culto",   nombre: "Culto General",    emoji: "🎤", horario: "Dom 9am · 11am · 6pm",  activa: true  },
{ id: "estudio", nombre: "Estudio Bíblico",  emoji: "📖", horario: "Mié y Vie 7pm",          activa: true  },
{ id: "oracion", nombre: "Sala de Oración",  emoji: "🙏", horario: "Lun y Jue 6am · 7pm",   activa: false },
{ id: "jovenes", nombre: "Grupo Jóvenes",    emoji: "🎸", horario: "Sáb 5pm",                activa: false },
]

const BASE = "https://meet.jit.si/IddJesucristoEsElSenor"

export default function VideoLlamadas() {
const [salaActiva, setSalaActiva] = useState<string | null>(null)

const entrar = (id: string) => {
    window.open(`${BASE}-${id}`, "_blank")
    setSalaActiva(null)
}

return (
    <section style={{ padding: "80px 20px", textAlign: "center", background: "#0f1923" }}>
    <h2 style={{ color: "white", fontSize: "32px", marginBottom: "10px" }}>
        Reuniones en línea
    </h2>
    <p style={{ color: "#aaa", marginBottom: "50px" }}>
        Únete a nuestros servicios desde donde estés — gratis, sin descargas
    </p>

    <div style={{
        maxWidth: "900px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px"
    }}>
        {salas.map(sala => (
        <div key={sala.id} onClick={() => setSalaActiva(sala.id)} style={{
            background: sala.activa ? "#1a2e1a" : "#1a1a2e",
            border: `1px solid ${sala.activa ? "#2d6a4f" : "#2a2a4a"}`,
            borderRadius: "16px", padding: "28px 20px", cursor: "pointer",
            transition: "transform 0.2s",
        }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
        >
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>{sala.emoji}</div>
            <h3 style={{ color: "white", fontSize: "16px", marginBottom: "8px" }}>{sala.nombre}</h3>
            <p style={{ color: "#888", fontSize: "13px", marginBottom: "16px" }}>{sala.horario}</p>
            {sala.activa
            ? <span style={{ background: "#2d6a4f", color: "#fff", fontSize: "12px", padding: "4px 14px", borderRadius: "20px" }}>● En vivo — Entrar</span>
            : <span style={{ background: "#2a2a4a", color: "#666", fontSize: "12px", padding: "4px 14px", borderRadius: "20px" }}>Próximamente</span>
            }
        </div>
        ))}
    </div>

      {/* Modal de confirmación */}
    {salaActiva && (
        <div style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
        }}>
        <div style={{
            background: "#1a1a2e", border: "1px solid #2d6a4f",
            borderRadius: "16px", padding: "32px", maxWidth: "380px", width: "90%", textAlign: "center"
        }}>
            <p style={{ color: "white", fontSize: "16px", marginBottom: "8px" }}>
            ¿Entrar a {salas.find(s => s.id === salaActiva)?.nombre}?
            </p>
            <p style={{ color: "#888", fontSize: "13px", marginBottom: "24px" }}>
            Se abrirá Jitsi Meet en una nueva pestaña. Es gratis y no necesitas cuenta.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button onClick={() => setSalaActiva(null)} style={{
                background: "transparent", border: "1px solid #444",
                color: "#aaa", borderRadius: "8px", padding: "10px 20px", cursor: "pointer"
            }}>Cancelar</button>
            <button onClick={() => entrar(salaActiva)} style={{
                background: "#2d6a4f", border: "none",
                color: "white", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontWeight: "bold"
            }}>Entrar ahora</button>
            </div>
        </div>
        </div>
    )}
    </section>
)
}