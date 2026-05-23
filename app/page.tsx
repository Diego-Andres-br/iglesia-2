"use client"
import { useState, useEffect, useRef } from "react"
import { FaWhatsapp, FaYoutube, FaFacebook } from "react-icons/fa"
import VideoLlamadas from "./components/VideoLlamadas"
import Navbar from "./components/Navbar"

/* ─── Hook: detecta si el elemento está en pantalla ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

/* ─── Sección animada al hacer scroll ─── */
function Section({ id, children, className }: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  const { ref, inView } = useInView()
  return (
    <section
      id={id}
      ref={ref as React.RefObject<HTMLElement>}
      className={`revealSection ${inView ? "revealed" : ""} ${className ?? ""}`}
    >
      {children}
    </section>
  )
}

export default function Home() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const toggle = (key: string) => setExpanded(p => p === key ? null : key)

  return (
    <main className="siteMain">

      {/* ══ NAVBAR ══════════════════════════════════════════ */}
      <Navbar />

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section className="hero" id="inicio">
        <div className="heroOverlay" />
        <div className="heroContent">
          <span className="heroPill">Iglesia de Dios en Colombia · Iglesia local</span>
          <h1 className="heroTitle">
            Jesucristo<br /><em>Es El Señor</em>
          </h1>
          <p className="heroSub">
            Un lugar para conocer a Dios, crecer en fe y vivir el evangelio.<br />
            Parte de la Iglesia de Dios en Colombia, fundada en 1886.
          </p>
          <div className="heroCtas">
            <a
              href="https://meet.jit.si/IddJesucristoEsElSenor-Culto"
              target="_blank"
              className="ctaPrimary"
            >
              🎤 Unirse al culto en línea
            </a>
            <a
              href="https://www.youtube.com/@iddjesucristoeselsenor8052"
              target="_blank"
              className="ctaSecondary"
            >
              ▶ Ver en YouTube
            </a>
          </div>
        </div>
        <div className="heroScroll">↓</div>
      </section>

      {/* ══ QUIÉNES SOMOS ═══════════════════════════════════ */}
      <Section id="historia" className="secQuienes">
        <div className="container">
          <div className="secHeader">
            <span className="secTag">Quiénes somos</span>
            <h2 className="secTitle">Una comunidad con raíces profundas</h2>
            <p className="secDesc">
              Somos parte de la Iglesia de Dios, un movimiento global
              con más de 138 años predicando el evangelio.
            </p>
          </div>

          <div className="col3">
            {[
              {
                key: "historia",
                icon: "📖",
                title: "Nuestra Historia",
                preview: "Desde 1886 en Tennessee hasta Colombia en 1956. Una iglesia con casi 70 años de presencia en el país.",
                content: (
                  <>
                    <p>La Iglesia de Dios comenzó el <strong>19 de agosto de 1886</strong> en el condado de Monroe, Tennessee. Hoy cuenta con más de <strong>8.6 millones de miembros en 191 naciones</strong>.</p>
                    <p style={{ marginTop: 12 }}>En <strong>1956</strong>, Ricardo Moreno inició los primeros cultos en Sogamoso, Boyacá. Nuestra congregación es parte de esa historia viva.</p>
                    <p className="quotePanel">"Estad firmes y constantes, creciendo en la obra del Señor siempre." — 1 Cor 15:58</p>
                    <a href="/historia" className="panelBtn">Ver historia completa →</a>
                  </>
                ),
              },
              {
                key: "mision",
                icon: "🎯",
                title: "Misión y Visión",
                preview: "Equipar, empoderar y facilitar el trabajo de la iglesia local para cumplir la Gran Comisión.",
                content: (
                  <>
                    <p><strong>Misión:</strong> Somos una comunidad dedicada a seguir los mandamientos de Dios y difundir su mensaje de amor y esperanza.</p>
                    <p style={{ marginTop: 12 }}><strong>Visión:</strong> Promover iglesias saludables que se multipliquen, lideradas por individuos capacitados para el Reino de Dios.</p>
                    <p className="quotePanel">"Id y haced discípulos a todas las naciones." — Mateo 28:19</p>
                    <a href="https://www.iglesiadedioscolombia.com/misión-y-visión" target="_blank" className="panelBtn">Ver más →</a>
                  </>
                ),
              },
              {
                key: "fe",
                icon: "✝️",
                title: "Declaración de Fe",
                preview: "Creemos en la Biblia como Palabra de Dios y en la salvación por gracia mediante la fe en Jesucristo.",
                content: (
                  <>
                    <ul className="feUl">
                      {[
                        "La Biblia como Palabra inspirada e infalible de Dios",
                        "Un solo Dios en tres personas: Padre, Hijo y Espíritu Santo",
                        "La salvación por gracia mediante la fe en Jesucristo",
                        "El bautismo en agua y el bautismo del Espíritu Santo",
                        "La sanidad divina y la segunda venida de Cristo",
                        "La resurrección de los muertos y el juicio eterno",
                      ].map(f => <li key={f}>✝️ {f}</li>)}
                    </ul>
                    <a href="https://www.iglesiadedioscolombia.com/declaración-de-fe" target="_blank" className="panelBtn">
                      Ver declaración completa →
                    </a>
                  </>
                ),
              },
            ].map(({ key, icon, title, preview, content }) => (
              <div key={key} className={`quCard ${expanded === key ? "quCardOpen" : ""}`}>
                <div className="quCardHead" onClick={() => toggle(key)}>
                  <span className="quIcon">{icon}</span>
                  <div>
                    <h3 className="quTitle">{title}</h3>
                    <p className="quPreview">{preview}</p>
                  </div>
                  <span className="quChev">{expanded === key ? "▲" : "▼"}</span>
                </div>
                {expanded === key && <div className="quBody">{content}</div>}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ PREDICACIONES ═══════════════════════════════════ */}
      <Section id="predicaciones" className="secDark">
        <div className="container">
          <div className="secHeader light">
            <span className="secTag light">YouTube</span>
            <h2 className="secTitle light">Últimas Predicaciones</h2>
            <p className="secDesc light">Alimenta tu espíritu con la Palabra de Dios</p>
          </div>

          <div className="col3 videoGrid">
            {[
              ["https://www.youtube.com/embed/8LgxPAgHKac", "Predicación 1"],
              ["https://www.youtube.com/embed/6uUWwil9p7c", "Predicación 2"],
              ["https://www.youtube.com/embed/ZHgec5molL8", "Predicación 3"],
            ].map(([src, title]) => (
              <div key={src} className="videoCard">
                <iframe src={src} title={title} frameBorder="0" allowFullScreen />
              </div>
            ))}
          </div>

          <div className="centerAction">
            <a
              href="https://www.youtube.com/@iddjesucristoeselsenor8052"
              target="_blank"
              className="btnYt"
            >
              <FaYoutube style={{ marginRight: 8 }} /> Ver más predicaciones en YouTube
            </a>
          </div>
        </div>
      </Section>

      {/* ══ VIDEO LLAMADAS ══════════════════════════════════ */}
      <section id="videollamadas">
        <VideoLlamadas />
      </section>

      {/* ══ NOTICIAS ════════════════════════════════════════ */}
      <Section id="noticias" className="secLight">
        <div className="container">
          <div className="secHeader">
            <span className="secTag">Comunidad</span>
            <h2 className="secTitle">Noticias y Eventos</h2>
            <p className="secDesc">Mantente al día con lo que Dios está haciendo en nuestra congregación</p>
          </div>

          <div className="col3">
            {[
              { fecha: "Cada domingo",    titulo: "Culto General",      texto: "Nos reunimos en persona y en línea. ¡Conéctate desde donde estés y sé parte del culto!" },
              { fecha: "Mar y Jue 7pm",   titulo: "Oración y Estudio",  texto: "Profundiza en la Palabra de Dios. Disponible presencial y por videollamada." },
              { fecha: "Próximamente",    titulo: "Eventos Especiales", texto: "Campañas, retiros y conferencias. Síguenos en redes para no perderte nada." },
            ].map(({ fecha, titulo, texto }) => (
              <article key={titulo} className="newsCard">
                <span className="newsBadge">{fecha}</span>
                <h3 className="newsTitle">{titulo}</h3>
                <p className="newsText">{texto}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ DONACIONES ══════════════════════════════════════ */}
      <Section id="donaciones" className="secDonaciones">
        <div className="container">
          <div className="secHeader light">
            <span className="secTag light">Ofrenda</span>
            <h2 className="secTitle light">Apoya el Ministerio</h2>
            <p className="secDesc light">Tu ofrenda hace posible seguir predicando el evangelio en Colombia</p>
          </div>

          <div className="col3">
            {[
              { icon: "📱", method: "Nequi",        desc: "Envía tu ofrenda rápido y seguro desde tu celular" },
              { icon: "🏦", method: "Bancolombia",   desc: "Transferencia bancaria directa al ministerio" },
              { icon: "💳", method: "Transferencia", desc: "Disponible en otras entidades bancarias" },
            ].map(({ icon, method, desc }) => (
              <div key={method} className="donCard">
                <span className="donIcon">{icon}</span>
                <h3 className="donMethod">{method}</h3>
                <p className="donDesc">{desc}</p>
              </div>
            ))}
          </div>

          <div className="centerAction" style={{ marginTop: 36 }}>
            <a href="https://wa.me/573007433603" target="_blank" className="donCta">
              <FaWhatsapp style={{ marginRight: 8 }} /> Solicitar datos de pago
            </a>
          </div>
        </div>
      </Section>

      {/* ══ BANNER IGLESIA NACIONAL ═════════════════════════ */}
      <Section className="secBanner">
        <div className="container bannerInner">
          <div className="bannerText">
            <span className="secTag light">Red nacional</span>
            <h2 className="secTitle light" style={{ marginBottom: 12 }}>
              Iglesia de Dios en Colombia
            </h2>
            <p className="secDesc light">
              Nuestra congregación es afiliada a la Iglesia de Dios en Colombia,
              con sede en Bogotá. Una red de más de 60 años predicando el evangelio
              en casi todos los departamentos del país.
            </p>
          </div>
          <a href="https://www.iglesiadedioscolombia.com" target="_blank" className="bannerBtn">
            Visitar iglesia nacional →
          </a>
        </div>
      </Section>

      {/* ══ MAPA / CONTACTO ═════════════════════════════════ */}
      <Section id="contacto" className="secMapa">
        <div className="container">
          <div className="secHeader">
            <span className="secTag">Visítanos</span>
            <h2 className="secTitle">Nuestra Ubicación</h2>
            <p className="secDesc">Siempre habrá un lugar para ti</p>
          </div>

          <div className="col2 mapaGrid">
            <div className="mapaInfo">
              <div className="mapaDetail">
                <span>📍</span>
                <div><strong>Dirección</strong><p>Cartagena, Colombia</p></div>
              </div>
              <div className="mapaDetail">
                <span>📞</span>
                <div><strong>WhatsApp</strong><p>300 743 3603</p></div>
              </div>
              <div className="mapaDetail">
                <span>🕐</span>
                <div>
                  <strong>Horarios</strong>
                  <p>
                    Dom · Mié · Sáb: 9:30am – 12:30pm<br />
                    Mar · Jue: 7:00pm – 8:30pm<br />
                    Sáb Jóvenes: 5:40pm – 7:00pm
                  </p>
                </div>
              </div>
              <div className="mapaDetail">
                <span>📺</span>
                <div><strong>En línea</strong><p>YouTube · Jitsi Meet</p></div>
              </div>
              <div className="mapaSocial">
                <a href="https://wa.me/573007433603" target="_blank" aria-label="WhatsApp"><FaWhatsapp /></a>
                <a href="https://www.youtube.com/@iddjesucristoeselsenor8052" target="_blank" aria-label="YouTube"><FaYoutube /></a>
                <a href="https://facebook.com/profile.php?id=100068228206221" target="_blank" aria-label="Facebook"><FaFacebook /></a>
              </div>
            </div>

            <div className="mapaFrame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1772979549784!5m2!1ses-419!2sco!6m8!1m7!1sOSyhx5pbeT1BovkZFcmgOQ!2m2!1d10.42179798811393!2d-75.52057116700773!3f259.18429680034194!4f-7.8357033013896995!5f0.7820865974627469"
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ══ FOOTER ══════════════════════════════════════════ */}
      <footer className="footer">
        <div className="container footerGrid">

          {/* Col 1 — Marca */}
          <div className="footerBrand">
            <img src="/imagenes/logo3.png" alt="Logo" className="footerLogo" />
            <p className="footerName">Iglesia de Dios<br />Jesucristo Es El Señor</p>
            <p className="footerVerse">"Porque de tal manera amó Dios al mundo..." — Juan 3:16</p>
          </div>

          {/* Col 2 — Navegación */}
          <div className="footerLinks">
            <p className="footerColTitle">Navegación</p>
            {[
              ["/#inicio",        "Inicio"],
              ["/historia",       "Historia"],
              ["/pastoras",       "Pastoras"],
              ["/#predicaciones", "Predicaciones"],
              ["/#videollamadas", "Reuniones en línea"],
              ["/cronograma",     "Cronograma"],
              ["/contacto",       "Contacto"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="footerLink">{label}</a>
            ))}
          </div>

          {/* Col 3 — Contacto */}
          <div className="footerContact">
            <p className="footerColTitle">Contacto</p>
            <p className="footerContactItem">📱 300 743 3603</p>
            <p className="footerContactItem">📍 Cartagena, Colombia</p>
            <p className="footerContactItem">🕐 Dom·Mié·Sáb 9:30am | Mar·Jue 7pm</p>
            <p style={{ marginTop: 12, fontSize: 12, color: "#555" }}>
              Afiliada a la{" "}
              <a href="https://www.iglesiadedioscolombia.com" target="_blank" style={{ color: "#6fcf97" }}>
                Iglesia de Dios en Colombia
              </a>
            </p>
            <div className="footerSocial">
              <a href="https://wa.me/573007433603" target="_blank" aria-label="WhatsApp"><FaWhatsapp /></a>
              <a href="https://www.youtube.com/@iddjesucristoeselsenor8052" target="_blank" aria-label="YouTube"><FaYoutube /></a>
              <a href="https://facebook.com/profile.php?id=100068228206221" target="_blank" aria-label="Facebook"><FaFacebook /></a>
            </div>
          </div>

        </div>
        <div className="footerBottom">
          <p>© {new Date().getFullYear()} Iglesia de Dios — Jesucristo Es El Señor · Todos los derechos reservados</p>
        </div>
      </footer>

      {/* ══ BOTONES FLOTANTES ═══════════════════════════════ */}
      <div className="floatingBtns">
        <a href="https://wa.me/573007433603" target="_blank" aria-label="WhatsApp" className="floatBtn wa"><FaWhatsapp /></a>
        <a href="https://www.youtube.com/@iddjesucristoeselsenor8052" target="_blank" aria-label="YouTube" className="floatBtn yt"><FaYoutube /></a>
        <a href="https://facebook.com/profile.php?id=100068228206221" target="_blank" aria-label="Facebook" className="floatBtn fb"><FaFacebook /></a>
      </div>

    </main>
  )
}
