import { isClient } from "./devices";

export default function encodeBase64(text) {
  if (isClient) {
    const cleanedText = encodeURIComponent(text);

    return btoa(cleanedText);
  }
}

export function decodeBase64(text) {
  if (isClient) {
    const decodedText = atob(text);
    const value = decodeURIComponent(decodedText);

    return value;
  }
}
