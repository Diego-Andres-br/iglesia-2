import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Iglesia de Dios — Jesucristo Es El Señor",
  description: "Iglesia de Dios Jesucristo Es El Señor en Cartagena, Colombia.",
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