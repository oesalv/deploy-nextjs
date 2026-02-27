export default function HomePage() {
  return (
    <main style={{ maxWidth: 720, margin: '80px auto', padding: '0 20px' }}>
      <h1>Next.js on Hostinger Node.js web apps hosting</h1>
      <p>
        This repository is a reference template showing the baseline setup for deploying
        a Next.js application on Hostinger Node.js web apps hosting.
      </p>
      <p>
        Run <code>npm run build</code> and deploy with start command <code>npm run start -- -p $PORT</code>.
      </p>
    </main>
  )
}
