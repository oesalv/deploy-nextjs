export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
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

    const user = await prisma.user.findUnique({
      where: { email },
    });

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

    if (!user.passwordHash) {
      return NextResponse.json(
        { error: "Brukeren mangler passord i databasen." },
        { status: 500 }
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
      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordHash: hashPassword(password),
        },
      });
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
