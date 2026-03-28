export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { createSession } from "../../../lib/auth";
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

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: "Ugyldig innlogging." },
        { status: 401 }
      );
    }

    const result = verifyPassword(password, user.passwordHash);

    if (!result.ok) {
      return NextResponse.json(
        { error: "Ugyldig innlogging." },
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

    await createSession(user.id);

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Noe gikk galt ved innlogging." },
      { status: 500 }
    );
  }
}
