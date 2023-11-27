import { NextResponse } from "next/server";
import redirectPage from "@/utils/redirect";

const APP_ADDRESS = process.env.APP_ADDRESS;

export async function POST(req) {
  return handleCallback(req);
}

export async function GET(req) {
  return handleCallback(req);
}

async function handleCallback(req) {
  const { searchParams } = req?.nextUrl || null;
  const socialCode = searchParams?.get("id_token") || "";

  const newRedirectUrl = `${
    APP_ADDRESS + redirectPage("connect")
  }?type=apple&code=${socialCode}`;

  return NextResponse.redirect(newRedirectUrl);
}
