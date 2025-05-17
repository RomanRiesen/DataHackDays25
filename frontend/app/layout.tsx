import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Grosser Rat',
  description: 'Womit Beschäftigt sich der Grosser Rat',
  generator: 'meeeee (jk v0)',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
