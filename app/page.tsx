"use client"

import { useState } from "react"

export default function Home(){

const [open,setOpen] = useState(false)

return(

  <main>

  <nav className="navbar">

    <h1 className="logo"></h1>

    <ul className="menu">

    <li>Inicio</li>

    <li className="dropdown">

      <button onClick={()=>setOpen(!open)}>
      Quienes Somos
      </button>

      {open && (

      <ul className="dropdownMenu">

        <li>Historia</li>
        <li>Misión y Visión</li>
        <li>Declaración de Fe</li>

      </ul>

      )}

    </li>

    <li>Predicaciones</li>
    <li>Noticias</li>
    <li>Cronograma</li>
    <li>Discipulado</li>
    <li>Pastores</li>
    <li>Donaciones</li>
    <li>Sedes</li>
    <li>Contacto</li>

    </ul>

  </nav>


  <section className="hero">

    <h1>Bienvenidos a Nuestra Iglesia</h1>

    <p>
    Un lugar para conocer a Dios, crecer en fe y vivir el evangelio.
    </p>

  </section>


  <section className="predicaciones">

    <h2>Última Predicación</h2>

    <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/VIDEOID"
    title="Predicación"
    />

  </section>


  <section className="noticias">

    <h2>Noticias</h2>

    <p>
    Próximamente publicaremos noticias y eventos de nuestra iglesia.
    </p>

  </section>


  <section className="donaciones">

    <h2>Donaciones</h2>

    <p>Puedes apoyar el ministerio mediante:</p>

    <ul>
    <li>Nequi</li>
    <li>Bancolombia</li>
    <li>Transferencia bancaria</li>
    </ul>

  </section>


  <footer className="footer">

    <h3>Contacto</h3>

    <p>Email: iglesia@email.com</p>

    <p>Instagram | Facebook | YouTube</p>

  </footer>

  </main>

)

}