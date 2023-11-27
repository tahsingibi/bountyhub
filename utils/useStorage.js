import { isClient } from "./devices";

export const storages = {
  beStorage: "_acc",
  feStorage: "_ctr",
  userStorage: "user",
  keyStorage: "_key",
  communityUpdateResult: "_communityUpdateResult",
};

function getItem(key) {
  try {
    if (isClient) return localStorage.getItem(key) || null;

    return null;
  } catch (error) {
    return null;
  }
}

function setItem(key, value) {
  if (isClient) localStorage.setItem(key, value);
}

function removeItem(key) {
  if (isClient) localStorage.removeItem(key);
}

function clear() {
  if (isClient) localStorage.clear();
}

export default function UseStorage() {
  return { getItem, setItem, removeItem, clear };
}
