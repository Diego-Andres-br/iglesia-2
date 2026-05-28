"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

type Sermon = {
  id: string
  titulo: string
  pastor: string
  fecha: string
  tipo: "youtube" | "audio" | "texto"
  contenido: string
  descripcion: string
  categoria: string
}

const STORAGE_KEY = "iglesia_sermones"
const CLAVE = "Dios"
const PASTORAS = ["Pastora Marta Díaz", "Pastora Amelia Castillo", "Otro"]
const CATEGORIAS = ["Fe", "Oración", "Familia", "Salvación", "Profecía", "Adoración"]

const VACIO: Omit<Sermon,"id"> = {
  titulo:"", pastor: PASTORAS[0], fecha:"",
  tipo:"youtube", contenido:"", descripcion:"", categoria:"Fe"
}

export default function Admin() {
  const [clave, setClave]       = useState("")
  const [autenticado, setAuth]  = useState(false)
  const [error, setError]       = useState("")
  const [sermones, setSermones] = useState<Sermon[]>([])
  const [form, setForm]         = useState<Omit<Sermon,"id">>(VACIO)
  const [editId, setEditId]     = useState<string | null>(null)
  const [guardado, setGuardado] = useState(false)
  const [tab, setTab]           = useState<"lista"|"nuevo">("lista")

  useEffect(() => {
    if (!autenticado) return
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) setSermones(JSON.parse(data))
  }, [autenticado])

  const guardar = (lista: Sermon[]) => {
    setSermones(lista)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista))
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2500)
  }

  const login = () => {
    if (clave === CLAVE) { setAuth(true); setError("") }
    else setError("Contraseña incorrecta. Intenta de nuevo.")
  }

  const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const submitForm = () => {
    if (!form.titulo || !form.contenido || !form.fecha) return
    if (editId) {
      guardar(sermones.map(s => s.id === editId ? { ...form, id: editId } : s))
      setEditId(null)
    } else {
      guardar([{ ...form, id: Date.now().toString() }, ...sermones])
    }
    setForm(VACIO)
    setTab("lista")
  }

  const editar = (s: Sermon) => {
    const { id, ...rest } = s
    setForm(rest)
    setEditId(id)
    setTab("nuevo")
  }

  const eliminar = (id: string) => {
    if (!confirm("¿Eliminar este sermón?")) return
    guardar(sermones.filter(s => s.id !== id))
  }

  const cancelar = () => {
    setForm(VACIO)
    setEditId(null)
    setTab("lista")
  }

  // ── LOGIN ────────────────────────────────────────────────
  if (!autenticado) return (
    <main style={{ minHeight:"100vh", background:"#0a0a0f", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{
        background:"#13131e", border:"1px solid #2a2a40",
        borderRadius:20, padding:"40px 32px", maxWidth:380, width:"100%", textAlign:"center"
      }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🔐</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", color:"#fff", fontSize:24, marginBottom:8 }}>
          Panel de Administración
        </h1>
        <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14, marginBottom:28 }}>
          Iglesia de Dios — Jesucristo Es El Señor
        </p>
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={e => setClave(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          style={{
            width:"100%", padding:"12px 16px", background:"#0a0a0f",
            border:"1px solid #2a2a40", borderRadius:10, color:"#fff",
            fontSize:15, outline:"none", marginBottom:12, fontFamily:"inherit"
          }}
        />
        {error && <p style={{ color:"#f87171", fontSize:13, marginBottom:12 }}>{error}</p>}
        <button
          onClick={login}
          style={{
            width:"100%", background:"#2d6a4f", border:"none",
            borderRadius:10, padding:13, color:"#fff", fontSize:15,
            fontWeight:700, cursor:"pointer", fontFamily:"inherit"
          }}
        >
          Entrar
        </button>
        <Link href="/" style={{ display:"block", marginTop:16, fontSize:13, color:"rgba(255,255,255,0.4)" }}>
          ← Volver al sitio
        </Link>
      </div>
    </main>
  )

  // ── PANEL ────────────────────────────────────────────────
  return (
    <main style={{ minHeight:"100vh", background:"#f8f9fb" }}>

      {/* Header */}
      <div style={{ background:"#0a0a0f", padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <span style={{ fontSize:24 }}>⛪</span>
          <div>
            <p style={{ color:"#fff", fontSize:15, fontWeight:600, margin:0 }}>Panel de Administración</p>
            <p style={{ color:"rgba(255,255,255,0.4)", fontSize:12, margin:0 }}>Iglesia de Dios — Jesucristo Es El Señor</p>
          </div>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <Link href="/sermones" style={{ fontSize:13, color:"#a8d8b9", textDecoration:"none" }}>
            Ver sermones públicos →
          </Link>
          <button
            onClick={() => setAuth(false)}
            style={{ background:"#2a1a1a", border:"1px solid #5a2020", borderRadius:8, padding:"6px 14px", color:"#f87171", fontSize:13, cursor:"pointer" }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"32px 24px" }}>

        {guardado && (
          <div style={{ background:"#dcfce7", border:"1px solid #86efac", borderRadius:10, padding:"12px 20px", marginBottom:20, color:"#166534", fontSize:14 }}>
            ✅ Cambios guardados correctamente
          </div>
        )}

        {/* Tabs */}
        <div style={{ display:"flex", gap:8, marginBottom:28 }}>
          {[["lista","📋 Lista de sermones"],["nuevo", editId ? "✏️ Editar sermón" : "➕ Agregar sermón"]].map(([t,l]) => (
            <button key={t} onClick={() => setTab(t as any)} style={{
              padding:"10px 20px", borderRadius:10, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit",
              background: tab === t ? "#2d6a4f" : "#fff",
              color:      tab === t ? "#fff"    : "#444",
              border:     tab === t ? "none"    : "1px solid #e4e4e4",
            }}>
              {l}
            </button>
          ))}
        </div>

        {/* ── LISTA ── */}
        {tab === "lista" && (
          <div>
            <p style={{ fontSize:14, color:"#666", marginBottom:20 }}>
              {sermones.length} sermón{sermones.length !== 1 ? "es" : ""} publicado{sermones.length !== 1 ? "s" : ""}
            </p>
            {sermones.length === 0 && (
              <div style={{ textAlign:"center", padding:48, color:"#aaa" }}>
                <p style={{ fontSize:36 }}>📭</p>
                <p>No hay sermones aún. ¡Agrega el primero!</p>
              </div>
            )}
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {sermones.map(s => (
                <div key={s.id} style={{
                  background:"#fff", border:"1px solid #e4e4e4",
                  borderRadius:14, padding:"18px 22px",
                  display:"flex", alignItems:"center", gap:16, flexWrap:"wrap"
                }}>
                  <span style={{ fontSize:28 }}>
                    {s.tipo === "youtube" ? "▶️" : s.tipo === "audio" ? "🎵" : "📄"}
                  </span>
                  <div style={{ flex:1, minWidth:200 }}>
                    <p style={{ fontSize:15, fontWeight:600, color:"#111", margin:0 }}>{s.titulo}</p>
                    <p style={{ fontSize:13, color:"#888", margin:"3px 0 0" }}>
                      {s.pastor} · {new Date(s.fecha).toLocaleDateString("es-CO")} · {s.categoria}
                    </p>
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={() => editar(s)} style={{
                      background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8,
                      padding:"7px 16px", color:"#1e40af", fontSize:13, cursor:"pointer"
                    }}>✏️ Editar</button>
                    <button onClick={() => eliminar(s.id)} style={{
                      background:"#fef2f2", border:"1px solid #fecaca", borderRadius:8,
                      padding:"7px 16px", color:"#b91c1c", fontSize:13, cursor:"pointer"
                    }}>🗑️ Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FORMULARIO ── */}
        {tab === "nuevo" && (
          <div style={{ background:"#fff", border:"1px solid #e4e4e4", borderRadius:16, padding:"32px 28px" }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, marginBottom:24, color:"#111" }}>
              {editId ? "Editar sermón" : "Agregar nuevo sermón"}
            </h2>

            <div className="col2" style={{ gap:20, marginBottom:20 }}>
              <div className="formGroup">
                <label className="formLabel">Título del sermón *</label>
                <input className="formInput" name="titulo" value={form.titulo} onChange={handleForm} placeholder="Ej: El poder de la fe" />
              </div>
              <div className="formGroup">
                <label className="formLabel">Pastora *</label>
                <select className="formInput" name="pastor" value={form.pastor} onChange={handleForm}>
                  {PASTORAS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="col2" style={{ gap:20, marginBottom:20 }}>
              <div className="formGroup">
                <label className="formLabel">Fecha *</label>
                <input className="formInput" name="fecha" type="date" value={form.fecha} onChange={handleForm} />
              </div>
              <div className="formGroup">
                <label className="formLabel">Categoría</label>
                <select className="formInput" name="categoria" value={form.categoria} onChange={handleForm}>
                  {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="formGroup" style={{ marginBottom:20 }}>
              <label className="formLabel">Tipo de contenido *</label>
              <div style={{ display:"flex", gap:12, marginTop:8 }}>
                {[
                  { v:"youtube", l:"▶️ Video YouTube" },
                  { v:"audio",   l:"🎵 Audio MP3" },
                  { v:"texto",   l:"📄 Texto escrito" },
                ].map(({ v, l }) => (
                  <label key={v} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", fontSize:14, padding:"10px 16px", borderRadius:8, border:`1px solid ${form.tipo === v ? "#2d6a4f" : "#e4e4e4"}`, background: form.tipo === v ? "#f0faf5" : "#fff" }}>
                    <input type="radio" name="tipo" value={v} checked={form.tipo === v} onChange={handleForm} style={{ accentColor:"#2d6a4f" }} />
                    {l}
                  </label>
                ))}
              </div>
            </div>

            <div className="formGroup" style={{ marginBottom:20 }}>
              <label className="formLabel">
                {form.tipo === "youtube" ? "URL del video YouTube (embed)" :
                 form.tipo === "audio"   ? "URL del archivo de audio (MP3)" :
                 "Texto completo del sermón"} *
              </label>
              {form.tipo === "texto" ? (
                <textarea className="formTextarea" name="contenido" value={form.contenido} onChange={handleForm}
                  rows={8} placeholder="Escribe aquí el sermón completo..." />
              ) : (
                <input className="formInput" name="contenido" value={form.contenido} onChange={handleForm}
                  placeholder={form.tipo === "youtube"
                    ? "https://www.youtube.com/embed/XXXXXXXXXXX"
                    : "https://ejemplo.com/sermon.mp3"
                  }
                />
              )}
              {form.tipo === "youtube" && (
                <p style={{ fontSize:12, color:"#888", marginTop:6 }}>
                  💡 En YouTube: clic en Compartir → Insertar → copia solo la URL del src que empieza con https://www.youtube.com/embed/...
                </p>
              )}
            </div>

            <div className="formGroup" style={{ marginBottom:28 }}>
              <label className="formLabel">Descripción breve</label>
              <textarea className="formTextarea" name="descripcion" value={form.descripcion} onChange={handleForm}
                rows={3} placeholder="Describe de qué trata este sermón..." maxLength={200} />
            </div>

            <div style={{ display:"flex", gap:12 }}>
              <button onClick={cancelar} style={{
                flex:1, background:"transparent", border:"1px solid #e4e4e4",
                borderRadius:10, padding:13, color:"#666", fontSize:14, cursor:"pointer", fontFamily:"inherit"
              }}>
                Cancelar
              </button>
              <button onClick={submitForm}
                disabled={!form.titulo || !form.contenido || !form.fecha}
                style={{
                  flex:2, background:"#2d6a4f", border:"none",
                  borderRadius:10, padding:13, color:"#fff",
                  fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit",
                  opacity: (!form.titulo || !form.contenido || !form.fecha) ? 0.5 : 1
                }}>
                {editId ? "✅ Guardar cambios" : "✅ Publicar sermón"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
