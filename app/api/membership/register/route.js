import { NextResponse } from "next/server";
import { fetchApiRequest } from "@/utils/fetchRequest";
import getMessage from "@/utils/getMessage";

export async function POST(req) {
  const formData = await req.formData();
  const username = formData.get("username") || null;
  const email = formData.get("email") || null;
  const additionalData = formData.get("additionalData") || null;
  const key = formData.get("key") || null;
  const recaptcha = formData.get("recaptcha") || null;

  const raw = JSON.stringify({
    username,
    email,
    key,
    additionalData: JSON.parse(additionalData),
    recaptcha,
  });

  const requestOptions = {
    method: "POST",
    body: raw,
  };

  const request = await fetchApiRequest(`register`, requestOptions, req);

  if (!request.success) {
    return NextResponse.json({
      success: false,
      message: getMessage(request.message),
    });
  }

  const response = {
    success: true,
    ...request?.data,
  };

  return NextResponse.json(response);
}
