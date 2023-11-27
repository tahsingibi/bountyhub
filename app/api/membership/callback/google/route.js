import { NextResponse } from "next/server";
import redirectPage from "@/utils/redirect";

const APP_ADDRESS = process.env.APP_ADDRESS;

export async function GET() {
  const newRedirectUrl = `${APP_ADDRESS + redirectPage("connect")}?type=google`;

  return NextResponse.redirect(newRedirectUrl);
}
