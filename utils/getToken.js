import UseStorage, { storages } from "./useStorage";
import { fetchApiRequest, FE_API_URL } from "./fetchRequest";

export default async function GetToken(
  settings = {
    force: false,
    key: null,
  }
) {
  const { beStorage, feStorage } = storages;
  const { setItem, getItem } = UseStorage();
  const beToken = getItem(beStorage) || null;
  const feToken = getItem(feStorage) || null;

  let headers = new Headers();
  if (settings?.key) headers.append("token", settings?.key);

  if (beToken && feToken && !settings.force) {
    return { token: beToken, access: feToken };
  }

  const _url = FE_API_URL + "token";
  const newToken = await fetchApiRequest(_url, { headers }, null);
  setItem(feStorage, newToken?.access);
  setItem(beStorage, newToken?.token);

  return newToken;
}
