import { isLength } from "validator";
import getMessage from "../getMessage";
import { fetchApiRequest, FE_API_URL } from "../fetchRequest";
import GetToken from "../getToken";

const regex = /^[a-zA-Z0-9]+$/;

export default async function isUsername(value) {
  if (!regex.test(value)) return getMessage("1011");
  if (!isLength(value, { min: 3 })) return getMessage("1002");
  if (!isLength(value, { max: 20 })) return getMessage("1003");

  const _tokens = await GetToken();
  const authorization = _tokens?.token;
  const access = _tokens?.access;

  const headers = { authorization: authorization, access: access };

  const body = new URLSearchParams();
  body.append("username", value);

  const setting = { method: "POST", headers, body, abort: true };

  const url = FE_API_URL + "membership/username-check";
  const isTaken = await fetchApiRequest(url, setting);

  return isTaken?.success ? null : isTaken?.message;
}
