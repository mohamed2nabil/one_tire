import { SignJWT, jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'fallback-secret-for-development-only-must-change'
);

export async function createLocalSession(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5d')
    .sign(secretKey);
}

export async function verifyLocalSession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    return null;
  }
}
