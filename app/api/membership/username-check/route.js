import { NextResponse } from "next/server";
import { fetchApiRequest } from "@/utils/fetchRequest";
import getMessage from "@/utils/getMessage";

export async function POST(req) {
  const formData = await req.formData();
  const username = formData.get("username") || null;

  const setting = {
    method: "POST",
  };

  const request = await fetchApiRequest(
    `check-username/${username}`,
    setting,
    req
  );

  if (!request.success) {
    return NextResponse.json({
      success: false,
      message: getMessage(request.message),
    });
  }

  const response = {
    success: true,
  };

  return NextResponse.json(response);
}
