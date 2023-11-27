import { NextResponse } from "next/server";
import getMessage from "@/utils/getMessage";
import { fetchApiRequest } from "@/utils/fetchRequest";

export const GET = async (req) => {
  const request = await fetchApiRequest("me", null, req);
  const userKey = req?.headers?.get("token") || null;

  let response = {
    success: request?.success,
    data: {
      key: userKey,
      ...request?.data,
    },
  };

  if (request?.message) response.message = getMessage(request?.message);

  return NextResponse.json(response);
};

export const PUT = async (req) => {
  const formData = await req.formData();
  const username = formData.get("Username") || null;
  const avatar = formData.get("Avatar") || null;
  const avatarFile = formData.get("AvatarFile") || null;

  const newRequestBody = new FormData();
  if (username) newRequestBody.append("Username", username);
  if (avatar) newRequestBody.append("Avatar", avatar);
  if (avatarFile) newRequestBody.append("AvatarFile", avatarFile);

  const setting = {
    method: "PUT",
    body: newRequestBody,
    bodyType: "formData",
  };

  const request = await fetchApiRequest("me", setting, req);

  const whichUpdate = username ? "Username" : "Avatar";
  const successMessage = getMessage("T003")?.replace("{updated}", whichUpdate);

  const _message = request?.message
    ? getMessage(request?.message)
    : successMessage;

  const response = {
    success: request?.success,
    message: _message,
  };

  return NextResponse.json(response);
};
