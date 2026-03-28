"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("admin@familieplan.no");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("Logger inn...");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Innlogging feilet");
        return;
      }

      setMessage("Innlogging virker!");
    } catch (error) {
      setMessage("Noe gikk galt.");
    }
  }

  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif", maxWidth: 420 }}>
      <h1>FamiliePlan</h1>
      <p>Logg inn for å fortsette</p>

      <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <label>E-post</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", width: "100%", padding: 10, marginTop: 6 }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>Passord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: "block", width: "100%", padding: 10, marginTop: 6 }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 16px" }}>
          Logg inn
        </button>

        {message ? <p style={{ marginTop: 16 }}>{message}</p> : null}
      </form>
    </main>
  );
}
