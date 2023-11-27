import { fetchApiRequest } from "@/utils/fetchRequest";
import { NextResponse } from "next/server";
import getMessage from "@/utils/getMessage";

function successMessage(social) {
  let socialName = social[0]?.toUpperCase() + social?.slice(1);

  if (social == "web3-wallet") {
    socialName = "Web3 Wallet";
  }

  const message = getMessage("T002")?.replace("{socialName}", socialName);

  return message;
}

export async function POST(req) {
  const formData = await req.formData();
  const social = formData?.get("type") || null;

  const path = `me/disconnect/${social}`;
  const request = await fetchApiRequest(path, { method: "POST" }, req);

  const messages = {
    error: getMessage(request?.message),
    success: successMessage(social),
  };

  const message = request?.message ? messages?.error : messages?.success;

  const response = {
    success: request?.success,
    message: message,
  };

  return NextResponse.json(response);
}
