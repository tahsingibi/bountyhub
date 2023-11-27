"use client";

export const isClient = typeof window !== "undefined";

export const userAgent = () => {
  if (isClient) return window?.navigator?.userAgent || window?.opera;
};

export const isMobile = () => {
  if (isClient) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  }
};

export const isApple = () => {
  if (isClient) return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
};

export const isDesktop = !isMobile();

export default function clientDevices() {
  if (isClient) {
    if (isDesktop) {
      return isApple ? "web_apple" : "web";
    }
    return isApple ? "mobile_apple" : "mobile";
  }
}
