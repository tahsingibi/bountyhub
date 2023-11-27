import { NextResponse } from "next/server";
import redirectPage from "@/utils/redirect";

const APP_ADDRESS = process.env.APP_ADDRESS;

export async function GET(req) {
  const { searchParams } = req?.nextUrl || null;

  const getState = searchParams?.get("state") || null;

  const link = redirectPage("profile")[1]?.path;

  const _redirect = getState == "connect" ? link : redirectPage("connect");

  const socialCode = searchParams?.get("code") || "";

  const newRedirectUrl = `${
    APP_ADDRESS + _redirect
  }?type=discord&code=${socialCode}`;

  return NextResponse.redirect(newRedirectUrl);
}
