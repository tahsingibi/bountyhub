import { NextResponse } from "next/server";
import { fetchApiRequest } from "@/utils/fetchRequest";
import { createJWTToken } from "@/utils/jwtStorage";

export const GET = async (req) => {
  const TOKEN_HEADER = {
    client: process.env.APP_CLIENT_ID,
    secret: process.env.APP_CLIENT_SECRET,
    grant: process.env.APP_GRANT_TYPE,
    scope: process.env.APP_SCOPE,
  };

  const requestToken = req?.headers?.get("token") || null;
  let header = new Headers();
  header.append("Content-Type", "application/x-www-form-urlencoded");

  let body = new URLSearchParams();
  body.append("client_id", TOKEN_HEADER.client);
  body.append("client_secret", TOKEN_HEADER.secret);
  body.append("grant_type", TOKEN_HEADER.grant);
  body.append("scope", TOKEN_HEADER.scope);
  if (requestToken) {
    body.append("token", requestToken);
  }

  let requestOptions = {
    method: "POST",
    headers: header,
    body: body,
    redirect: "follow",
  };

  const request = await fetchApiRequest("connect/token", requestOptions);
  const jwtToken = await createJWTToken(req);

  const token = {
    success: true,
    token: request.access_token,
    access: jwtToken,
  };

  return NextResponse.json(token);
};
