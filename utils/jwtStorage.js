import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";
import pageRedirect from "./redirect";

export const SECRETKEY = process.env.APP_CLIENT_SECRET + process.env.APP_SCOPE;

export async function createJWTToken(req) {
  const userAgent = req.headers.get("user-agent") || null;
  const token = await new SignJWT({ userAgent })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(new TextEncoder().encode(SECRETKEY));

  return token;
}

export function badRequest() {
  return NextResponse.json(
    {
      success: false,
    },
    { status: 401 }
  );
}

export function disconnectRedirect() {
  const response = NextResponse.redirect(pageRedirect("disconnect"));
  return response;
}

export default async function verifyRequest(req) {
  const { pathname } = req.nextUrl;

  const isTokenRequest =
    pathname.includes("/api/membership/callback") ||
    pathname.includes("/api/token");

  const isLoggedIn = pathname.includes("/api/user");

  const feToken = req.headers.get("access") || null;

  if (!isTokenRequest) {
    try {
      const verified = await jwtVerify(
        feToken,
        new TextEncoder().encode(SECRETKEY)
      );

      const encryptedAgent = verified.payload.userAgent;
      const requestAgent = req.headers.get("user-agent") || null;

      if (encryptedAgent !== requestAgent) {
        if (isLoggedIn) {
          return disconnectRedirect();
        }
        return badRequest();
      }

      return { success: true, data: verified.payload };
    } catch (error) {
      return badRequest();
    }
  }

  return { success: true };
}
