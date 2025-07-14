// src/app/layout.tsx

import './globals.css'

export const metadata = {
  title: 'RareCurve - Competitor Analysis System',
  description: 'Generate competitor analysis reports for local businesses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
