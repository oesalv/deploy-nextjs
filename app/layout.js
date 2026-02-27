export const metadata = {
  title: 'Hostinger Next.js Deploy Reference',
  description: 'Minimal Next.js app for Hostinger Node.js web apps hosting deployment'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0 }}>{children}</body>
    </html>
  )
}
