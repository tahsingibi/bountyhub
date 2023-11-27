import { fetchApiRequest } from "@/utils/fetchRequest";
import { NextResponse } from "next/server";
import arrayToSelectbox from "@/utils/arrayToSelectbox";

export async function GET(req) {
  let request = await fetchApiRequest("categories", null, req);

  if (request?.success) {
    const format = arrayToSelectbox({ array: request?.data });
    request.data = format;
  }

  return NextResponse.json(request);
}
