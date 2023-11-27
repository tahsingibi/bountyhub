import { NextResponse } from "next/server";
import { fetchApiRequest } from "@/utils/fetchRequest";
import getMessage from "@/utils/getMessage";

export async function POST(req) {
  const formData = await req.formData();
  const verifyToken = formData.get("verifyToken") || null;
  const verifyCode = formData.get("verifyCode") || null;
  const registerToken = formData.get("registerToken") || null;
  const type = formData.get("type") || null;

  const body = JSON.stringify({
    verifyCode,
    verifyToken,
    type,
  });

  const setting = { method: "POST", body };

  const request = await fetchApiRequest(`verify`, setting, req);

  if (!request.success) {
    return NextResponse.json({
      success: false,
      message: getMessage(request.message),
    });
  }

  const processBody = JSON.stringify({
    verifyToken,
    registerToken,
  });

  const processSetting = { method: "POST", body: processBody };

  const processRequest = await fetchApiRequest(`process`, processSetting, req);

  if (!processRequest.success) {
    return NextResponse.json({
      success: false,
      message: getMessage(processRequest.message),
    });
  }

  const response = {
    success: true,
    ...request,
    ...processRequest?.data,
  };

  return NextResponse.json(response);
}
