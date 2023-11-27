import { NextResponse } from "next/server";
import { fetchApiRequest } from "@/utils/fetchRequest";
import getMessage from "@/utils/getMessage";
import PageRedirect, { redirectUri } from "@/utils/redirect";

const loginRedirects = PageRedirect("connectRedirect");

export const GET = async (req) => {
  const request = await fetchApiRequest(
    "login/twitter?location=" + redirectUri + "/twitter",
    null,
    req
  );

  return NextResponse.json({
    success: request?.success,
    data: loginRedirects.twitter + request?.data,
    message: getMessage(request.message),
  });
};
