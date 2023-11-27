import { getCurrentUrl } from "./getSearchParams";
import { isClient } from "./devices";

export default function hashEncrypt(url) {
  const currentUrl = getCurrentUrl();
  const newUrl = url || currentUrl;
  if (isClient && newUrl) {
    return new URL(newUrl).hash.substring(1) || null;
  }
}
