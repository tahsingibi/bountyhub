import { NextResponse } from "next/server";
import verifyRequest from "./utils/jwtStorage";

const METHODS = "GET, UPDATE, PUT, POST";
const ORIGINS = process.env.CORS_ORIGIN;
const HEADERS = "Content-Type, Authorization";

export async function middleware(req) {
  const response = NextResponse.next();

  const verifiedToken = await verifyRequest(req).catch((err) => err.message);

  if (!verifiedToken.success) return verifiedToken;

  const origin = req.headers.get("origin") || null;
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Allow-Methods", METHODS.split(","));
  response.headers.set("Access-Control-Allow-Headers", HEADERS.split(","));

  if (ORIGINS.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
