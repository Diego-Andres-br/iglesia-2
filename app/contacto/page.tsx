"use client"
import { useState } from "react"
import Link from "next/link"
import { FaWhatsapp, FaYoutube, FaFacebook } from "react-icons/fa"


export default function Contacto() {
  const [form, setForm]     = useState({ nombre: "", telefono: "", mensaje: "" })
  const [enviado, setEnviado] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    if (!form.nombre || !form.mensaje) return
    // Arma el mensaje y abre WhatsApp directamente
    const texto = `Hola, soy *${form.nombre}*${form.telefono ? ` (${form.telefono})` : ""}.\n\n${form.mensaje}`
    const url = `https://wa.me/573007433603?text=${encodeURIComponent(texto)}`
    window.open(url, "_blank")
    setEnviado(true)
    setForm({ nombre: "", telefono: "", mensaje: "" })
  }

  return (
    <main className="innerPage">

      <section className="innerHero">
        <div className="innerHeroOverlay" />
        <div className="innerHeroContent">
          <span className="secTag light">Estamos aquí</span>
          <h1 className="innerHeroTitle">Contáctanos</h1>
          <p className="innerHeroSub">Escríbenos, visítanos u ora con nosotros. Siempre habrá alguien para atenderte.</p>
        </div>
      </section>

      <div className="breadcrumb">
        <div className="container">
          <Link href="/">Inicio</Link> <span>/</span> <span>Contacto</span>
        </div>
      </div>

      <div className="container innerContent">

        {/* 2 columnas: formulario + info */}
        <div className="col2 contactGrid">

          {/* FORMULARIO */}
          <div className="contactForm">
            <h2 className="contactFormTitle">Envíanos un mensaje</h2>
            <p className="contactFormSub">
              Al enviar el formulario se abrirá WhatsApp con tu mensaje listo para enviarlo.
            </p>

            {enviado && (
              <div className="contactSuccess">
                ✅ ¡Mensaje preparado! Se abrió WhatsApp. Si no se abrió,{" "}
                <a href="https://wa.me/573007433603" target="_blank">haz clic aquí</a>.
              </div>
            )}

            <div className="formGroup">
              <label className="formLabel">Tu nombre *</label>
              <input
                className="formInput"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: María González"
                maxLength={60}
              />
            </div>

            <div className="formGroup">
              <label className="formLabel">Tu teléfono (opcional)</label>
              <input
                className="formInput"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Ej: 300 123 4567"
                maxLength={20}
              />
            </div>

            <div className="formGroup">
              <label className="formLabel">¿En qué podemos ayudarte? *</label>
              <textarea
                className="formTextarea"
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Escribe tu oración, pregunta o comentario..."
                rows={5}
                maxLength={500}
              />
              <span className="formCount">{form.mensaje.length}/500</span>
            </div>

            <button
              className="formSubmit"
              onClick={handleSubmit}
              disabled={!form.nombre || !form.mensaje}
            >
              <FaWhatsapp style={{marginRight:8}} />
              Enviar por WhatsApp
            </button>
          </div>

          {/* INFO DE CONTACTO */}
          <div className="contactInfo">
            <h2 className="contactFormTitle">Información de contacto</h2>

            <div className="contactItems">
              {[
                { icon: "📍", title: "Ubicación",    body: "Cartagena, Bolívar, Colombia" },
                { icon: "📱", title: "WhatsApp",     body: "+57 300 743 3603" },
                { icon: "🕐", title: "Atención pastoral", body: "Lunes a Sábado\n9:00 AM – 7:00 PM" },
                { icon: "🌐", title: "Reuniones online",  body: "Jitsi Meet — gratis\nSin registro ni descarga" },
              ].map(({ icon, title, body }) => (
                <div key={title} className="contactItem">
                  <span className="contactItemIcon">{icon}</span>
                  <div>
                    <strong>{title}</strong>
                    <p style={{whiteSpace:"pre-line"}}>{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Redes sociales */}
            <div className="contactRedes">
              <p className="contactRedesTitle">Síguenos en redes</p>
              <div className="contactRedesBtns">
                <a href="https://wa.me/573007433603" target="_blank" className="redBtn wa">
                  <FaWhatsapp /> WhatsApp
                </a>
                <a href="https://www.youtube.com/@iddjesucristoeselsenor8052" target="_blank" className="redBtn yt">
                  <FaYoutube /> YouTube
                </a>
                <a href="https://facebook.com/profile.php?id=100068228206221" target="_blank" className="redBtn fb">
                  <FaFacebook /> Facebook
                </a>
              </div>
            </div>

            {/* Mapa mini */}
            <div className="contactMapa">
              <iframe
                src="https://www.google.com/maps/embed?pb=!3m2!1ses-419!2sco!4v1772979549784!5m2!1ses-419!2sco!6m8!1m7!1sOSyhx5pbeT1BovkZFcmgOQ!2m2!1d10.42179798811393!2d-75.52057116700773!3f259.18429680034194!4f-7.8357033013896995!5f0.7820865974627469"
                width="100%" height="220"
                style={{ border: 0, borderRadius: 12 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

        <div className="histActions" style={{marginTop:48}}>
          <Link href="/" className="btnBack">← Volver al inicio</Link>
        </div>

      </div>
    </main>
  )
}
