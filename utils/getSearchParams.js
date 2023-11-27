import { isClient } from "./devices";

export const getCurrentUrl = () => (isClient ? window.location.href : null);

export default function getSearchParams(url) {
  const currentUrl = getCurrentUrl();
  if (url || currentUrl) {
    const newUrl = new URL(url || currentUrl);

    const searchParams = newUrl?.searchParams || null;
    const params = {};

    if (searchParams) {
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return params;
  }
}
