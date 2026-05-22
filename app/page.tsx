"use client"
import { useState } from "react"
import { FaWhatsapp, FaYoutube, FaFacebook, FaBars, FaTimes } from "react-icons/fa"
import VideoLlamadas from "./components/VideoLlamadas"

export default function Home() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [seccionActiva, setSeccionActiva] = useState<string | null>(null)

  return (
    <main>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <h1 className="logo">
          <img src="/imagenes/logo3.png" alt="Iglesia de Dios — Jesucristo Es El Señor" />
        </h1>

        <button
          className="menuToggle"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          {menuAbierto ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`menu ${menuAbierto ? "menuOpen" : ""}`}>
          <li onClick={() => setMenuAbierto(false)}>Inicio</li>

          <li className="dropdown">
            <span>Quiénes Somos ▾</span>
            <ul className="dropdownMenu">
              <li onClick={() => { setSeccionActiva("historia"); setMenuAbierto(false) }}>Historia</li>
              <li onClick={() => { setSeccionActiva("mision"); setMenuAbierto(false) }}>Misión y Visión</li>
              <li onClick={() => { setSeccionActiva("fe"); setMenuAbierto(false) }}>Declaración de Fe</li>
            </ul>
          </li>

          <li onClick={() => setMenuAbierto(false)}>Predicaciones</li>
          <li onClick={() => setMenuAbierto(false)}>Reuniones en Línea</li>
          <li onClick={() => setMenuAbierto(false)}>Noticias</li>
          <li onClick={() => setMenuAbierto(false)}>Cronograma</li>
          <li onClick={() => setMenuAbierto(false)}>Pastores</li>
          <li onClick={() => setMenuAbierto(false)}>Donaciones</li>
          <li onClick={() => setMenuAbierto(false)}>Contacto</li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="heroBadge">Iglesia de Dios en Colombia · Iglesia local</div>
        <h1>Jesucristo Es El Señor</h1>
        <p>
          Un lugar para conocer a Dios, crecer en fe y vivir el evangelio.<br />
          Parte de la Iglesia de Dios en Colombia, fundada en 1886.
        </p>
        <div className="heroButtons">
          <a
            href="https://meet.jit.si/IddJesucristoEsElSenor-Culto"
            target="_blank"
            className="btnHeroPrimary"
          >
            🎤 Unirse al culto en línea
          </a>
          <a
            href="https://www.youtube.com/@iddjesucristoeselsenor8052"
            target="_blank"
            className="btnHeroSecondary"
          >
            ▶ Ver en YouTube
          </a>
        </div>
      </section>

      {/* ── QUIÉNES SOMOS ── */}
      <section className="quienesSomos">
        <div className="quienesGrid">

          <div className="quienesCard" onClick={() => setSeccionActiva(seccionActiva === "historia" ? null : "historia")}>
            <span className="quienesIcono">📖</span>
            <h3>Nuestra Historia</h3>
            <p>Desde 1886 en Tennessee, EE.UU. hasta Colombia en 1956. Una iglesia con casi 70 años de historia en Colombia.</p>
            <span className="verMas">{seccionActiva === "historia" ? "Cerrar ↑" : "Leer más ↓"}</span>
          </div>

          <div className="quienesCard" onClick={() => setSeccionActiva(seccionActiva === "mision" ? null : "mision")}>
            <span className="quienesIcono">🎯</span>
            <h3>Misión y Visión</h3>
            <p>Promovemos iglesias saludables que se multipliquen, lideradas por personas capacitadas para cumplir la Gran Comisión.</p>
            <span className="verMas">{seccionActiva === "mision" ? "Cerrar ↑" : "Leer más ↓"}</span>
          </div>

          <div className="quienesCard" onClick={() => setSeccionActiva(seccionActiva === "fe" ? null : "fe")}>
            <span className="quienesIcono">✝️</span>
            <h3>Declaración de Fe</h3>
            <p>Creemos en la Biblia como la Palabra de Dios, en la salvación por gracia mediante la fe en Jesucristo.</p>
            <span className="verMas">{seccionActiva === "fe" ? "Cerrar ↑" : "Leer más ↓"}</span>
          </div>

        </div>

        {/* Panel expandible — Historia */}
        {seccionActiva === "historia" && (
          <div className="expandPanel">
            <h3>Breve historia de la Iglesia de Dios</h3>
            <p>
              La Iglesia de Dios comenzó el <strong>19 de agosto de 1886</strong> en el condado de Monroe, Tennessee, 
              cuando Richard Green Spurling predicó a ocho personas que formaron una Unión Cristiana con el propósito 
              de seguir el Nuevo Testamento como regla de fe y práctica. Veintiún años después, el movimiento adoptó 
              formalmente el nombre de Iglesia de Dios. Hoy cuenta con más de <strong>8.6 millones de miembros en 191 naciones</strong>.
            </p>
            <h4>En Colombia</h4>
            <p>
              En <strong>1956</strong>, Ricardo Moreno inició los primeros cultos en Sogamoso, Boyacá, con su familia 
              y un pequeño grupo. Desde allí la iglesia creció por todo el país: Bogotá, Cali, Villavicencio, 
              Barranquilla, Medellín y muchos departamentos más. Nuestra congregación local es parte de esa historia 
              viva del evangelio en Colombia.
            </p>
            <p className="versiculoPanel">
              "Estad firmes y constantes, creciendo en la obra del Señor siempre." — 1 Corintios 15:58
            </p>
            <a
              href="https://www.iglesiadedioscolombia.com/historia"
              target="_blank"
              className="btnPanel"
            >
              Ver historia completa →
            </a>
          </div>
        )}

        {/* Panel expandible — Misión */}
        {seccionActiva === "mision" && (
          <div className="expandPanel">
            <h3>Nuestra Misión</h3>
            <p>
              Somos una comunidad de creyentes dedicados a seguir los mandamientos de Dios y a difundir su mensaje 
              de amor y esperanza. Estamos comprometidos en <strong>equipar, empoderar y facilitar</strong> el trabajo 
              de la iglesia local para el cumplimiento de la Gran Comisión.
            </p>
            <h3>Nuestra Visión</h3>
            <p>
              Promover iglesias saludables que se multipliquen, lideradas por individuos altamente capacitados, 
              creativos, innovadores y comprometidos con la extensión del Reino de Dios en cada rincón de Colombia.
            </p>
            <p className="versiculoPanel">
              "Id y haced discípulos a todas las naciones." — Mateo 28:19
            </p>
            <a
              href="https://www.iglesiadedioscolombia.com/misión-y-visión"
              target="_blank"
              className="btnPanel"
            >
              Ver en iglesia nacional →
            </a>
          </div>
        )}

        {/* Panel expandible — Fe */}
        {seccionActiva === "fe" && (
          <div className="expandPanel">
            <h3>Declaración de Fe</h3>
            <p>
              La fe y práctica de la Iglesia de Dios están fundamentadas en las Escrituras. Creemos en:
            </p>
            <ul className="feList">
              <li>✝️ La Biblia como la Palabra inspirada e infalible de Dios</li>
              <li>✝️ Un solo Dios eternamente existente en tres personas: Padre, Hijo y Espíritu Santo</li>
              <li>✝️ La salvación por gracia mediante la fe en Jesucristo</li>
              <li>✝️ El bautismo en agua y el bautismo del Espíritu Santo</li>
              <li>✝️ La sanidad divina y la segunda venida de Cristo</li>
              <li>✝️ La resurrección de los muertos y el juicio eterno</li>
            </ul>
            <a
              href="https://www.iglesiadedioscolombia.com/declaración-de-fe"
              target="_blank"
              className="btnPanel"
            >
              Ver declaración completa →
            </a>
          </div>
        )}
      </section>

      {/* ── PREDICACIONES ── */}
      <section className="predicaciones">
        <h2>Últimas Predicaciones</h2>
        <p className="seccionSubtitulo">Alimenta tu espíritu con la Palabra de Dios</p>

        <div className="videosGrid">
          <iframe
            src="https://www.youtube.com/embed/8LgxPAgHKac"
            title="Predicación 1"
            frameBorder="0"
            allowFullScreen
          />
          <iframe
            src="https://www.youtube.com/embed/6uUWwil9p7c"
            title="Predicación 2"
            frameBorder="0"
            allowFullScreen
          />
          <iframe
            src="https://www.youtube.com/embed/ZHgec5molL8"
            title="Predicación 3"
            frameBorder="0"
            allowFullScreen
          />
        </div>

        <a
          href="https://www.youtube.com/@iddjesucristoeselsenor8052"
          target="_blank"
          className="btnYoutube"
        >
          Ver más predicaciones en YouTube
        </a>
      </section>

      {/* ── VIDEO LLAMADAS ── */}
      <VideoLlamadas />

      {/* ── NOTICIAS ── */}
      <section className="noticias">
        <h2>Noticias y Eventos</h2>
        <p className="seccionSubtitulo">Mantente al día con lo que Dios está haciendo en nuestra congregación</p>
        <div className="noticiasGrid">
          <div className="noticiaCard">
            <span className="noticiaFecha">Cada domingo</span>
            <h3>Culto general</h3>
            <p>Nos reunimos en persona y en línea cada domingo. ¡Conéctate desde donde estés y sé parte del culto!</p>
          </div>
          <div className="noticiaCard">
            <span className="noticiaFecha">Miércoles y viernes</span>
            <h3>Estudio bíblico</h3>
            <p>Profundiza en la Palabra cada miércoles y viernes a las 7pm, presencial y por videollamada.</p>
          </div>
          <div className="noticiaCard">
            <span className="noticiaFecha">Próximamente</span>
            <h3>Eventos especiales</h3>
            <p>Campañas, retiros y conferencias. Siguenos en redes sociales para no perderte ningún evento.</p>
          </div>
        </div>
      </section>

      {/* ── DONACIONES ── */}
      <section className="donaciones">
        <h2>Apoya el Ministerio</h2>
        <p className="seccionSubtitulo">Tu ofrenda hace posible seguir predicando el evangelio en Colombia</p>
        <div className="donacionesGrid">
          <div className="donacionCard">
            <span className="donacionIcono">📱</span>
            <h3>Nequi</h3>
            <p>Envía tu ofrenda de forma rápida y segura desde tu celular</p>
          </div>
          <div className="donacionCard">
            <span className="donacionIcono">🏦</span>
            <h3>Bancolombia</h3>
            <p>Transferencia bancaria directa al ministerio de la iglesia</p>
          </div>
          <div className="donacionCard">
            <span className="donacionIcono">💳</span>
            <h3>Transferencia</h3>
            <p>Otras entidades bancarias disponibles para tu comodidad</p>
          </div>
        </div>
        <p className="donacionContacto">
          Para información de cuentas escríbenos al{" "}
          <a href="https://wa.me/573007433603" target="_blank">
            WhatsApp 300 743 3603
          </a>
        </p>
      </section>

      {/* ── IGLESIA NACIONAL ── */}
      <section className="iglesiaNacional">
        <div className="iglesiaNacionalContenido">
          <span className="iglesiaNacionalBadge">Somos parte de</span>
          <h2>Iglesia de Dios en Colombia</h2>
          <p>
            Nuestra congregación es una iglesia local afiliada a la Iglesia de Dios en Colombia, 
            con sede nacional en Bogotá. Una red de más de 60 años predicando el evangelio 
            en casi todos los departamentos del país.
          </p>
          <a
            href="https://www.iglesiadedioscolombia.com"
            target="_blank"
            className="btnIglesiaNacional"
          >
            Visitar iglesia nacional →
          </a>
        </div>
      </section>

      {/* ── MAPA ── */}
      <section className="mapa">
        <h2>Nuestra Ubicación</h2>
        <p className="seccionSubtitulo">Visítanos — siempre habrá un lugar para ti</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1772979549784!5m2!1ses-419!2sco!6m8!1m7!1sOSyhx5pbeT1BovkZFcmgOQ!2m2!1d10.42179798811393!2d-75.52057116700773!3f259.18429680034194!4f-7.8357033013896995!5f0.7820865974627469"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: "16px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <img src="/imagenes/logo3.png" alt="Logo" className="footerLogo" />
        <p className="footerNombre">Iglesia de Dios — Jesucristo Es El Señor</p>
        <p className="footerAfiliacion">
          Afiliada a la{" "}
          <a href="https://www.iglesiadedioscolombia.com" target="_blank">
            Iglesia de Dios en Colombia
          </a>
          {" "}· Fundada en 1886
        </p>
        <p className="footerVerse">
          "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito." — Juan 3:16
        </p>
        <div className="footerRedes">
          <a href="https://wa.me/573007433603" target="_blank" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="https://www.youtube.com/@iddjesucristoeselsenor8052" target="_blank" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="https://facebook.com/profile.php?id=100068228206221" target="_blank" aria-label="Facebook">
            <FaFacebook />
          </a>
        </div>
        <p className="footerCopy">
          © {new Date().getFullYear()} Iglesia de Dios — Jesucristo Es El Señor · Todos los derechos reservados
        </p>
      </footer>

      {/* ── BOTONES FLOTANTES ── */}
      <div className="floatingButtons">
        <a href="https://wa.me/573007433603" target="_blank" aria-label="WhatsApp">
          <FaWhatsapp className="icon whatsapp" />
        </a>
        <a href="https://www.youtube.com/@iddjesucristoeselsenor8052" target="_blank" aria-label="YouTube">
          <FaYoutube className="icon youtube" />
        </a>
        <a href="https://facebook.com/profile.php?id=100068228206221" target="_blank" aria-label="Facebook">
          <FaFacebook className="icon facebook" />
        </a>
      </div>

    </main>
  )
}