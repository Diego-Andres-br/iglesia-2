"use client"
import Navbar from "../components/Navbar"
import Link from "next/link"

export default function Donaciones() {
  return (
    <main className="innerPage">
      <Navbar />

      <section className="innerHero">
        <div className="innerHeroOverlay" />
        <div className="innerHeroContent">
          <span className="secTag light">Ofrenda</span>
          <h1 className="innerHeroTitle">Apoya el Ministerio</h1>
          <p className="innerHeroSub">Tu ofrenda hace posible seguir predicando el evangelio en Colombia</p>
        </div>
      </section>

      <div className="breadcrumb">
        <div className="container">
          <Link href="/">Inicio</Link> <span>/</span> <span>Donaciones</span>
        </div>
      </div>

      <div className="container innerContent">
        <div className="boldSection">
          <div className="boldCard">
            <span className="boldIcono">🙏</span>
            <h2 className="boldTitle">Dona con Bold</h2>
            <p className="boldDesc">
              Plataforma 100% segura. Acepta tarjetas débito, crédito,
              PSE, Nequi, Bancolombia y más métodos de pago colombianos.
            </p>
            <a
              href="https://checkout.bold.co/payment/LNK_EMZU6WEN6T"
              target="_blank"
              rel="noopener noreferrer"
              className="boldBtn"
            >
              💳 Donar ahora con Bold
            </a>
            <p className="boldNote">
              Al hacer clic se abrirá la página segura de Bold para completar tu donación.
            </p>
          </div>
        </div>

        <div className="histActions" style={{ marginTop: 48, justifyContent: "center" }}>
          <Link href="/" className="btnBack">← Volver al inicio</Link>
        </div>
      </div>
    </main>
  )
}