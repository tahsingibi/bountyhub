import { NextResponse } from "next/server";
import { fetchApiRequest } from "@/utils/fetchRequest";
import getMessage from "@/utils/getMessage";

export async function POST(req) {
  const formData = await req.formData();
  const type = formData.get("connect_type") || null;
  const value = formData.get(type) || null;
  const email = formData.get("email") || null;

  let scopes = {
    token: "oauth_token",
    verifier: "oauth_verifier",
  };

  let _path = `login/${type}/${value}`;

  if (type == "twitter") {
    const token = formData.get(scopes.token) || "";
    const verifier = formData.get(scopes.verifier) || "";

    _path = `login/${type}?${scopes.token}=${token}&${scopes.verifier}=${verifier}`;
  }

  const request = await fetchApiRequest(_path, { method: "POST" }, req);

  if (!request.success) {
    return NextResponse.json({
      success: false,
      message: getMessage(request.message),
    });
  }

  let response = {
    success: true,
    email: email || request?.data?.email,
    [type]: value,
    ...request.data,
  };

  return NextResponse.json(response);
}
