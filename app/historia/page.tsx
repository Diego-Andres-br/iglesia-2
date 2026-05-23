import Link from "next/link"

export const metadata = {
title: "Historia · Iglesia de Dios — Jesucristo Es El Señor",
description: "Conoce la historia de la Iglesia de Dios, desde 1886 en Tennessee hasta nuestra congregación en Cartagena, Colombia.",
}

export default function Historia() {
return (
    <main className="innerPage">

      {/* HERO INTERNO */}
    <section className="innerHero">
        <div className="innerHeroOverlay" />
        <div className="innerHeroContent">
        <span className="secTag light">Quiénes somos</span>
        <h1 className="innerHeroTitle">Nuestra Historia</h1>
        <p className="innerHeroSub">Raíces profundas. Fe inquebrantable. Casi 70 años en Colombia.</p>
        </div>
            </section>

      {/* BREADCRUMB */}
    <div className="breadcrumb">
        <div className="container">
        <Link href="/">Inicio</Link> <span>/</span> <span>Historia</span>
        </div>
    </div>

      {/* CONTENIDO */}
    <div className="container innerContent">

        {/* Timeline mundial */}
        <div className="histSection">
        <span className="secTag">Origen mundial</span>
        <h2 className="histTitle">La Iglesia de Dios en el mundo</h2>

        <div className="timeline">
            {[
            { year: "1886", title: "El comienzo", text: "El 19 de agosto de 1886, en el condado de Monroe, Tennessee, Richard Green Spurling predicó a ocho personas que formaron una Unión Cristiana con el propósito de seguir el Nuevo Testamento como regla de fe y práctica." },
            { year: "1896", title: "El avivamiento", text: "Un avivamiento en la Escuela Shearer presentó la doctrina de la santificación. Los creyentes experimentaron un derramamiento del Espíritu Santo que incluía hablar en lenguas y sanidad divina." },
            { year: "1906", title: "Nombre oficial", text: "Bajo el liderazgo de A. J. Tomlinson, primer Supervisor General, se adoptó formalmente el nombre de Iglesia de Dios y una Asamblea General Internacional inclusiva." },
            { year: "1909", title: "Misión mundial", text: "Se lanzó un esfuerzo mundial de evangelización que comenzó en las Bahamas, extendiendo el evangelio a todas las naciones." },
            { year: "Hoy", title: "Presencia global", text: "La Iglesia de Dios cuenta con más de 8.6 millones de miembros en 191 naciones y territorios, con más de 37,000 congregaciones en todo el mundo." },
            ].map(({ year, title, text }) => (
            <div key={year} className="tlItem">
                <div className="tlYear">{year}</div>
                <div className="tlDot" />
                <div className="tlBody">
                <h3>{title}</h3>
                <p>{text}</p>
                </div>
            </div>
            ))}
        </div>
        </div>

        {/* Historia Colombia */}
        <div className="histSection">
        <span className="secTag">Colombia</span>
        <h2 className="histTitle">La Iglesia de Dios en Colombia</h2>

        <div className="timeline">
            {[
            { year: "1955–56", title: "Los primeros pasos", text: "En medio de la violencia partidista, Ricardo Moreno viajó como evangelista por el Huila. Al contactar a Pablo y Candita Childers, miembros de la Iglesia de Dios en EE.UU., nació el sueño de plantar la iglesia en Colombia." },
            { year: "1956", title: "Primera congregación", text: "El 18 de noviembre de 1956, en la casa de Ricardo Moreno en Sogamoso, Boyacá (calle 11 #11-75), comenzaron los primeros cultos y la escuela dominical con 8 a 10 personas." },
            { year: "1960s", title: "Expansión nacional", text: "Se establecieron iglesias en Pajarito Boyacá, Tauramena, Puerto López Meta, y más tarde en Bogotá, Cali, Villavicencio y otros departamentos." },
            { year: "1976", title: "Avivamiento en Bogotá", text: "Bajo el liderazgo del pastor Luis Alfonso Gutiérrez, la iglesia de la calle 68 en Bogotá se convirtió en la más grande del país. Se fundó el Instituto Bíblico y 25 graduados salieron a plantar nuevas iglesias." },
            { year: "2023", title: "Liderazgo actual", text: "El obispo Freddy Palomino fue elegido y ratificado como Supervisor Nacional. La iglesia continúa plantando congregaciones en Cúcuta, Bucaramanga, Casanare, el Meta y la costa Caribe." },
            { year: "Hoy", title: "Nuestra congregación", text: "Nuestra iglesia local en Cartagena es parte de esa historia viva. Somos una iglesia hija, comprometida con la Gran Comisión y con el evangelio de Jesucristo." },
            ].map(({ year, title, text }) => (
            <div key={year} className="tlItem">
                <div className="tlYear">{year}</div>
                <div className="tlDot" />
                <div className="tlBody">
                <h3>{title}</h3>
                <p>{text}</p>
                </div>
            </div>
            ))}
        </div>
        </div>

        {/* Versículo final */}
        <blockquote className="histQuote">
        "Así que, hermanos míos amados, estad firmes y constantes, creciendo en la obra del Señor siempre,
        sabiendo que vuestro trabajo en el Señor no es en vano."
        <cite>— 1 Corintios 15:58</cite>
        </blockquote>

        <div className="histActions">
        <Link href="/" className="btnBack">← Volver al inicio</Link>
        <a href="https://www.iglesiadedioscolombia.com/historia" target="_blank" className="btnExternal">
            Ver historia completa en la iglesia nacional →
        </a>
        </div>

    </div>
    </main>
)
}