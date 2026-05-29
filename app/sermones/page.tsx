"use client"
import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Link from "next/link"
import { supabase, type Sermon } from "../lib/supabase"

const CATEGORIAS = ["Todos", "Fe", "Oración", "Familia", "Salvación", "Profecía", "Adoración"]

export default function Sermones() {
  const [sermones,  setSermones]  = useState<Sermon[]>([])
  const [loading,   setLoading]   = useState(true)
  const [categoria, setCategoria] = useState("Todos")
  const [busqueda,  setBusqueda]  = useState("")
  const [abierto,   setAbierto]   = useState<string | null>(null)

  useEffect(() => {
    cargarSermones()
  }, [])

  const cargarSermones = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('sermones')
      .select('*')
      .order('fecha', { ascending: false })
    if (!error && data) setSermones(data)
    setLoading(false)
  }

  const filtrados = sermones.filter(s => {
    const matchCat = categoria === "Todos" || s.categoria === categoria
    const matchBus = s.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                     s.pastor.toLowerCase().includes(busqueda.toLowerCase())
    return matchCat && matchBus
  })

  const formatFecha = (f: string) => new Date(f).toLocaleDateString("es-CO", {
    year: "numeric", month: "long", day: "numeric"
  })

  const iconoTipo: Record<string, string> = { youtube: "▶️", audio: "🎵", texto: "📄" }

  return (
    <main className="innerPage">
      <Navbar />

      <section className="innerHero">
        <div className="innerHeroOverlay" />
        <div className="innerHeroContent">
          <span className="secTag light">Palabra de Dios</span>
          <h1 className="innerHeroTitle">Sermones Bíblicos</h1>
          <p className="innerHeroSub">Video, audio y textos para edificar tu fe donde estés</p>
        </div>
      </section>

      <div className="breadcrumb">
        <div className="container">
          <Link href="/">Inicio</Link> <span>/</span> <span>Sermones</span>
        </div>
      </div>

      <div className="container innerContent">

        {/* Filtros */}
        <div className="sermonFiltros">
          <input
            className="sermonBusqueda"
            placeholder="🔍 Buscar sermón o pastor..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          <div className="sermonCats">
            {CATEGORIAS.map(c => (
              <button
                key={c}
                className={`sermonCatBtn ${categoria === c ? "sermonCatActive" : ""}`}
                onClick={() => setCategoria(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Estado de carga */}
        {loading && (
          <div className="sermonVacio">
            <p style={{ fontSize: 32 }}>⏳</p>
            <p>Cargando sermones...</p>
          </div>
        )}

        {/* Sin resultados */}
        {!loading && filtrados.length === 0 && (
          <div className="sermonVacio">
            <p style={{ fontSize: 32 }}>📭</p>
            <p>No se encontraron sermones.</p>
          </div>
        )}

        {/* Grid de sermones */}
        {!loading && filtrados.length > 0 && (
          <div className="col3 sermonGrid">
            {filtrados.map(s => (
              <div key={s.id} className="sermonCard">
                {s.tipo === "youtube" && (
                  <div className="sermonPreview">
                    <iframe src={s.contenido} title={s.titulo} frameBorder="0" allowFullScreen />
                  </div>
                )}
                {s.tipo === "audio" && (
                  <div className="sermonAudioBox">
                    <span style={{ fontSize: 36 }}>🎵</span>
                    <audio controls src={s.contenido} style={{ width: "100%", marginTop: 12 }} />
                  </div>
                )}
                {s.tipo === "texto" && (
                  <div className="sermonTextoBox">
                    <span style={{ fontSize: 36 }}>📄</span>
                    <p style={{ fontSize: 13, color: "#666", marginTop: 8, lineHeight: 1.5 }}>
                      {s.contenido.slice(0, 120)}...
                    </p>
                  </div>
                )}

                <div className="sermonInfo">
                  <div className="sermonMeta">
                    <span className="sermonCatTag">{s.categoria}</span>
                    <span className="sermonTipo">{iconoTipo[s.tipo]}</span>
                  </div>
                  <h3 className="sermonTitulo">{s.titulo}</h3>
                  <p className="sermonPastor">👤 {s.pastor}</p>
                  <p className="sermonFecha">📅 {formatFecha(s.fecha)}</p>
                  <p className="sermonDesc">{s.descripcion}</p>
                  {s.tipo === "texto" && (
                    <button
                      className="sermonLeerBtn"
                      onClick={() => setAbierto(abierto === s.id ? null : s.id)}
                    >
                      {abierto === s.id ? "Cerrar ↑" : "Leer sermón completo ↓"}
                    </button>
                  )}
                  {abierto === s.id && s.tipo === "texto" && (
                    <div className="sermonTextoCompleto">{s.contenido}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 48, padding: 24, background: "#f8f9fb", borderRadius: 14 }}>
          <p style={{ fontSize: 14, color: "#666", marginBottom: 12 }}>
            ¿Eres administrador? Agrega nuevos sermones desde el panel.
          </p>
          <Link href="/admin" className="btnPanel">🔐 Ir al panel de administración</Link>
        </div>

        <div className="histActions" style={{ marginTop: 32 }}>
          <Link href="/" className="btnBack">← Volver al inicio</Link>
        </div>
      </div>
    </main>
  )
}