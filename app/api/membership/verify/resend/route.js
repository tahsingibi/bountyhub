import { NextResponse } from "next/server";
import { fetchApiRequest } from "@/utils/fetchRequest";
import getMessage from "@/utils/getMessage";

export async function POST(req) {
  const formData = await req.formData();
  const verifyToken = formData.get("verifyToken") || null;
  const type = formData.get("type") || null;

  const body = JSON.stringify({
    verifyToken,
    type,
  });

  const setting = { method: "POST", body };

  const request = await fetchApiRequest(`verify/re-send`, setting, req);

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
