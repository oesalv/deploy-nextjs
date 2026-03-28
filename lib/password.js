import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
  // Midlertidig overgang:
  // hvis gammel bruker har plain tekst-passord i DB,
  // godtar vi det én gang og kan oppgradere til hash etterpå.
  if (!storedHash.startsWith("scrypt:")) {
    const ok = password === storedHash;
    return { ok, needsUpgrade: ok };
  }

  const [, salt, key] = storedHash.split(":");
  const hashedBuffer = Buffer.from(key, "hex");
  const suppliedBuffer = scryptSync(password, salt, 64);

  const ok =
    hashedBuffer.length === suppliedBuffer.length &&
    timingSafeEqual(hashedBuffer, suppliedBuffer);

  return { ok, needsUpgrade: false };
}
