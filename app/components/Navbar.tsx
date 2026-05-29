"use client"
import { useState, useEffect } from "react"
import { FaWhatsapp, FaBars, FaTimes } from "react-icons/fa"
import Link from "next/link"

const quienesSomos = [
  { label: "Historia",          href: "/historia" },
  { label: "Misión y Visión",   href: "/historia" },
  { label: "Declaración de Fe", href: "/historia" },
  { label: "Pastoras",          href: "/pastoras" },
]

export default function Navbar() {
  const [mounted,  setMounted]  = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdown, setDropdown] = useState(false)

  // Solo corre en el cliente, después de montar
  useEffect(() => {
    setMounted(true)

    const fn = () => setScrolled(window.scrollY > 70)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const close = () => { setMenuOpen(false); setDropdown(false) }

  // Evita hydration mismatch
  if (!mounted) return (
    <nav style={{
      position: "fixed", top: 0, left: 0, width: "100%", zIndex: 900,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "18px 40px", background: "transparent",
    }}>
      <Link href="/" className="navLogo">
        <img src="/imagenes/logo.png" alt="Iglesia de Dios" />
      </Link>
    </nav>
  )

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className={`nav ${scrolled ? "navSolid" : ""}`}>

        <Link href="/" className="navLogo" onClick={close}>
          <img src="/imagenes/logo.png" alt="Iglesia de Dios — Jesucristo Es El Señor" />
        </Link>

        <ul className="navList">
          <li><Link href="/" className="nl">Inicio</Link></li>

          <li className="has-drop">
            <button className="nl drop-btn">
              Quiénes Somos <span>▾</span>
            </button>
            <ul className="drop-menu">
              {quienesSomos.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="drop-item">{label}</Link>
                </li>
              ))}
            </ul>
          </li>

          <li><Link href="/#predicaciones" className="nl">Predicaciones</Link></li>
          <li><Link href="/#videollamadas" className="nl">En Línea</Link></li>
          <li><Link href="/cronograma"     className="nl">Cronograma</Link></li>
          <li><Link href="/sermones" className="nl">Sermones</Link></li>
          <li><Link href="/#noticias"      className="nl">Noticias</Link></li>
          <li><Link href="/#donaciones"    className="nl">Donaciones</Link></li>
          <li><Link href="/contacto"       className="nl">Contacto</Link></li>
          <li><Link href="/sedes" className="nl">Sedes</Link></li>
        </ul>

        <a
          href="https://wa.me/573007433603"
          target="_blank"
          rel="noopener noreferrer"
          className="navWa"
        >
          <FaWhatsapp /> Contáctanos
        </a>

        <button
          className="navBurger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* ── OVERLAY ── */}
      {menuOpen && <div className="mOverlay" onClick={close} />}

      {/* ── DRAWER MÓVIL ── */}
      <aside className={`mDrawer ${menuOpen ? "mOpen" : ""}`}>
        <ul className="mList">
          <li><Link href="/"               className="mLink" onClick={close}>Inicio</Link></li>
          <li>
            <button
              className="mLink"
              style={{ width:"100%", textAlign:"left", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:16, color:"rgba(255,255,255,0.8)", padding:"13px 16px", borderRadius:10 }}
              onClick={() => setDropdown(d => !d)}
            >
              Quiénes Somos {dropdown ? "▲" : "▼"}
            </button>
            {dropdown && (
              <ul style={{ listStyle:"none", paddingLeft:16, marginTop:4 }}>
                {quienesSomos.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} onClick={close}
                      style={{ display:"block", padding:"9px 14px", fontSize:14, color:"rgba(255,255,255,0.6)", borderRadius:8 }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li><Link href="/#predicaciones" className="mLink" onClick={close}>Predicaciones</Link></li>
          <li><Link href="/#videollamadas" className="mLink" onClick={close}>En Línea</Link></li>
          <li><Link href="/cronograma"     className="mLink" onClick={close}>Cronograma</Link></li>
          <li><Link href="/#noticias"      className="mLink" onClick={close}>Noticias</Link></li>
          <li><Link href="/#donaciones"    className="mLink" onClick={close}>Donaciones</Link></li>
          <li><Link href="/sermones"    className="mLink" onClick={close}>Sermones</Link></li>
          <li><Link href="/contacto"       className="mLink" onClick={close}>Contacto</Link></li>
        </ul>

        <a
          href="https://wa.me/573007433603"
          target="_blank"
          rel="noopener noreferrer"
          className="mWa"
          onClick={close}
        >
          <FaWhatsapp /> Escríbenos por WhatsApp
        </a>
      </aside>
    </>
  )
}
