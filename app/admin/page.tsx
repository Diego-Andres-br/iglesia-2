"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { supabase, type Sermon } from "../lib/supabase"

const CLAVE    = "Dios"
const PASTORAS = ["Pastora Marta Díaz", "Pastora Amelia Castillo", "Pastor Joaquín Puerta", "Otro"]
const CATEGORIAS = ["Fe", "Oración", "Familia", "Salvación", "Profecía", "Adoración"]

type FormData = Omit<Sermon, "id" | "created_at">

const VACIO: FormData = {
  titulo: "", pastor: PASTORAS[0], fecha: "",
  tipo: "youtube", contenido: "", descripcion: "", categoria: "Fe"
}

export default function Admin() {
  const [clave,       setClave]     = useState("")
  const [autenticado, setAuth]      = useState(false)
  const [error,       setError]     = useState("")
  const [sermones,    setSermones]  = useState<Sermon[]>([])
  const [form,        setForm]      = useState<FormData>(VACIO)
  const [editId,      setEditId]    = useState<string | null>(null)
  const [loading,     setLoading]   = useState(false)
  const [guardado,    setGuardado]  = useState("")
  const [tab,         setTab]       = useState<"lista" | "nuevo">("lista")

  useEffect(() => {
    if (autenticado) cargarSermones()
  }, [autenticado])

  const cargarSermones = async () => {
    setLoading(true)
    const { data } = await supabase.from('sermones').select('*').order('fecha', { ascending: false })
    if (data) setSermones(data)
    setLoading(false)
  }

  const login = () => {
    if (clave === CLAVE) { setAuth(true); setError("") }
    else setError("Contraseña incorrecta.")
  }

  const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const mostrarMensaje = (msg: string) => {
    setGuardado(msg)
    setTimeout(() => setGuardado(""), 3000)
  }

  const submitForm = async () => {
    if (!form.titulo || !form.contenido || !form.fecha) return
    setLoading(true)
    if (editId) {
      const { error } = await supabase.from('sermones').update(form).eq('id', editId)
      if (!error) { mostrarMensaje("✅ Sermón actualizado"); setEditId(null) }
      else mostrarMensaje("❌ Error al actualizar")
    } else {
      const { error } = await supabase.from('sermones').insert([form])
      if (!error) mostrarMensaje("✅ Sermón publicado correctamente")
      else mostrarMensaje("❌ Error al publicar")
    }
    setForm(VACIO)
    setTab("lista")
    await cargarSermones()
    setLoading(false)
  }

  const editar = (s: Sermon) => {
    const { id, created_at, ...rest } = s
    setForm(rest)
    setEditId(id)
    setTab("nuevo")
  }

  const eliminar = async (id: string) => {
    if (!confirm("¿Eliminar este sermón?")) return
    await supabase.from('sermones').delete().eq('id', id)
    mostrarMensaje("🗑️ Sermón eliminado")
    await cargarSermones()
  }

  const cancelar = () => { setForm(VACIO); setEditId(null); setTab("lista") }

  // ── LOGIN ──────────────────────────────────────────────
  if (!autenticado) return (
    <main style={{ minHeight:"100vh", background:"#0a0a0f", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"#13131e", border:"1px solid #2a2a40", borderRadius:20, padding:"40px 32px", maxWidth:380, width:"100%", textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🔐</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", color:"#fff", fontSize:24, marginBottom:8 }}>Panel de Administración</h1>
        <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14, marginBottom:28 }}>Iglesia de Dios — Jesucristo Es El Señor</p>
        <input
          type="password" placeholder="Contraseña"
          value={clave} onChange={e => setClave(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          style={{ width:"100%", padding:"12px 16px", background:"#0a0a0f", border:"1px solid #2a2a40", borderRadius:10, color:"#fff", fontSize:15, outline:"none", marginBottom:12, fontFamily:"inherit" }}
        />
        {error && <p style={{ color:"#f87171", fontSize:13, marginBottom:12 }}>{error}</p>}
        <button onClick={login} style={{ width:"100%", background:"#2d6a4f", border:"none", borderRadius:10, padding:13, color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
          Entrar
        </button>
        <Link href="/" style={{ display:"block", marginTop:16, fontSize:13, color:"rgba(255,255,255,0.4)" }}>← Volver al sitio</Link>
      </div>
    </main>
  )

  // ── PANEL ──────────────────────────────────────────────
  return (
    <main style={{ minHeight:"100vh", background:"#f8f9fb" }}>

      <div style={{ background:"#0a0a0f", padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <span style={{ fontSize:24 }}>⛪</span>
          <div>
            <p style={{ color:"#fff", fontSize:15, fontWeight:600, margin:0 }}>Panel de Administración</p>
            <p style={{ color:"rgba(255,255,255,0.4)", fontSize:12, margin:0 }}>Iglesia de Dios — Jesucristo Es El Señor</p>
          </div>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <Link href="/sermones" style={{ fontSize:13, color:"#a8d8b9", textDecoration:"none" }}>Ver sermones →</Link>
          <button onClick={() => setAuth(false)} style={{ background:"#2a1a1a", border:"1px solid #5a2020", borderRadius:8, padding:"6px 14px", color:"#f87171", fontSize:13, cursor:"pointer" }}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"32px 24px" }}>

        {guardado && (
          <div style={{ background:"#dcfce7", border:"1px solid #86efac", borderRadius:10, padding:"12px 20px", marginBottom:20, color:"#166534", fontSize:14 }}>
            {guardado}
          </div>
        )}

        <div style={{ display:"flex", gap:8, marginBottom:28 }}>
          {[["lista","📋 Lista de sermones"], ["nuevo", editId ? "✏️ Editar sermón" : "➕ Agregar sermón"]].map(([t, l]) => (
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
              {loading ? "Cargando..." : `${sermones.length} sermón${sermones.length !== 1 ? "es" : ""} publicado${sermones.length !== 1 ? "s" : ""}`}
            </p>
            {sermones.length === 0 && !loading && (
              <div style={{ textAlign:"center", padding:48, color:"#aaa" }}>
                <p style={{ fontSize:36 }}>📭</p>
                <p>No hay sermones. ¡Agrega el primero!</p>
              </div>
            )}
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {sermones.map(s => (
                <div key={s.id} style={{ background:"#fff", border:"1px solid #e4e4e4", borderRadius:14, padding:"18px 22px", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
                  <span style={{ fontSize:28 }}>{s.tipo === "youtube" ? "▶️" : s.tipo === "audio" ? "🎵" : "📄"}</span>
                  <div style={{ flex:1, minWidth:200 }}>
                    <p style={{ fontSize:15, fontWeight:600, color:"#111", margin:0 }}>{s.titulo}</p>
                    <p style={{ fontSize:13, color:"#888", margin:"3px 0 0" }}>
                      {s.pastor} · {new Date(s.fecha).toLocaleDateString("es-CO")} · {s.categoria}
                    </p>
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={() => editar(s)} style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8, padding:"7px 16px", color:"#1e40af", fontSize:13, cursor:"pointer" }}>✏️ Editar</button>
                    <button onClick={() => eliminar(s.id)} style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:8, padding:"7px 16px", color:"#b91c1c", fontSize:13, cursor:"pointer" }}>🗑️ Eliminar</button>
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
                <label className="formLabel">Título *</label>
                <input className="formInput" name="titulo" value={form.titulo} onChange={handleForm} placeholder="Ej: El poder de la fe" />
              </div>
              <div className="formGroup">
                <label className="formLabel">Pastor/a *</label>
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
              <div style={{ display:"flex", gap:12, marginTop:8, flexWrap:"wrap" }}>
                {[{ v:"youtube", l:"▶️ Video YouTube" }, { v:"audio", l:"🎵 Audio MP3" }, { v:"texto", l:"📄 Texto" }].map(({ v, l }) => (
                  <label key={v} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", fontSize:14, padding:"10px 16px", borderRadius:8, border:`1px solid ${form.tipo === v ? "#2d6a4f" : "#e4e4e4"}`, background: form.tipo === v ? "#f0faf5" : "#fff" }}>
                    <input type="radio" name="tipo" value={v} checked={form.tipo === v} onChange={handleForm} style={{ accentColor:"#2d6a4f" }} />
                    {l}
                  </label>
                ))}
              </div>
            </div>

            <div className="formGroup" style={{ marginBottom:20 }}>
              <label className="formLabel">
                {form.tipo === "youtube" ? "URL embed de YouTube *" : form.tipo === "audio" ? "URL del audio MP3 *" : "Texto completo *"}
              </label>
              {form.tipo === "texto" ? (
                <textarea className="formTextarea" name="contenido" value={form.contenido} onChange={handleForm} rows={8} placeholder="Escribe el sermón completo aquí..." />
              ) : (
                <input className="formInput" name="contenido" value={form.contenido} onChange={handleForm}
                  placeholder={form.tipo === "youtube" ? "https://www.youtube.com/embed/XXXXXXXXXXX" : "https://ejemplo.com/sermon.mp3"} />
              )}
              {form.tipo === "youtube" && (
                <p style={{ fontSize:12, color:"#888", marginTop:6 }}>
                  💡 En YouTube: Compartir → Insertar → copia la URL del src que empieza con https://www.youtube.com/embed/...
                </p>
              )}
            </div>

            <div className="formGroup" style={{ marginBottom:28 }}>
              <label className="formLabel">Descripción breve</label>
              <textarea className="formTextarea" name="descripcion" value={form.descripcion} onChange={handleForm} rows={3} placeholder="Describe de qué trata este sermón..." maxLength={200} />
            </div>

            <div style={{ display:"flex", gap:12 }}>
              <button onClick={cancelar} style={{ flex:1, background:"transparent", border:"1px solid #e4e4e4", borderRadius:10, padding:13, color:"#666", fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>
                Cancelar
              </button>
              <button onClick={submitForm} disabled={!form.titulo || !form.contenido || !form.fecha || loading}
                style={{ flex:2, background:"#2d6a4f", border:"none", borderRadius:10, padding:13, color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit", opacity:(!form.titulo || !form.contenido || !form.fecha) ? 0.5 : 1 }}>
                {loading ? "Guardando..." : editId ? "✅ Guardar cambios" : "✅ Publicar sermón"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}