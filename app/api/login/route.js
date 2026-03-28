export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getDb } from "../../../lib/db";
import { hashPassword, verifyPassword } from "../../../lib/password";

export async function POST(request) {
  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-post og passord er påkrevd." },
        { status: 400 }
      );
    }

    const db = getDb();

    const [rows] = await db.execute(
      "SELECT id, name, email, passwordHash, role, isActive FROM User WHERE email = ? LIMIT 1",
      [email]
    );

    const user = rows[0];

    if (!user) {
      return NextResponse.json(
        { error: "Bruker ikke funnet." },
        { status: 404 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: "Brukeren er deaktivert." },
        { status: 403 }
      );
    }

    const result = verifyPassword(password, user.passwordHash);

    if (!result.ok) {
      return NextResponse.json(
        { error: "Feil passord." },
        { status: 401 }
      );
    }

    if (result.needsUpgrade) {
      const newHash = hashPassword(password);

      await db.execute(
        "UPDATE User SET passwordHash = ? WHERE id = ?",
        [newHash, user.id]
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Innlogging virker!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        error: "Noe gikk galt ved innlogging.",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
