import { fetchApiRequest } from "@/utils/fetchRequest";
import { NextResponse } from "next/server";
import getMessage from "@/utils/getMessage";
import { decodeBase64 } from "@/utils/encodeBase64";

function successMessage(social) {
  let socialName = social[0]?.toUpperCase() + social?.slice(1);

  if (social == "web3-wallet") {
    socialName = "Web3 Wallet";
  }

  const message = getMessage("T001")?.replace("{socialName}", socialName);

  return message;
}

export async function POST(req) {
  const formData = await req.formData();
  const social = {
    type: formData.get("type") || null,
    code: formData.get("code") || null,
  };

  const isWalletConnect = social.type == "web3-wallet" ? "signature" : null;
  const isTelegramConnect = social.type == "telegram" ? "token" : null;

  const _codePrefix = isWalletConnect || isTelegramConnect || "code";
  let path = `me/connect/${social.type}?${_codePrefix}=${social.code}`;
  let settings = {
    method: "POST",
  };

  if (isTelegramConnect) {
    const decodedString = decodeBase64(social.code);
    let parsedInfo = JSON.parse(decodedString);

    settings.body = JSON.stringify({
      id: parsedInfo?.id?.toString(),
      firstName: parsedInfo?.first_name,
      lastName: parsedInfo?.last_name,
      userName: parsedInfo?.username,
    });

    path = "me/connect/telegram";
  }

  const request = await fetchApiRequest(path, settings, req);

  const messages = {
    error: getMessage(request?.message),
    success: successMessage(social?.type),
  };

  const isSuccess = request?.success;

  const message = isSuccess ? messages?.success : messages?.error;

  const response = {
    success: isSuccess,
    message: message,
  };

  return NextResponse.json(response);
}
