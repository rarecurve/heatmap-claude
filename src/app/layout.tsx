// src/app/layout.tsx

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
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
