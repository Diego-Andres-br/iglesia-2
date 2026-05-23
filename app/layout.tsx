import type { Metadata } from "next"
import "./styles/globals.css"
import "./styles/iglesia.css"

export const metadata: Metadata = {
  title: "Iglesia de Dios — Jesucristo Es El Señor",
  description: "Iglesia de Dios Jesucristo Es El Señor en Cartagena, Colombia. Parte de la Iglesia de Dios en Colombia fundada en 1886. Únete a nuestros cultos presenciales y en línea.",
  keywords: "iglesia, cartagena, colombia, jesucristo, culto, dios, cristiana",
  openGraph: {
    title: "Iglesia de Dios — Jesucristo Es El Señor",
    description: "Únete a nuestra congregación en Cartagena. Cultos presenciales y en línea, gratis.",
    locale: "es_CO",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
