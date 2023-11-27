import { useRef, createRef } from "react";

export default function useRefArray(length) {
  const arr = useRef([]);
  if (arr.current.length !== length) {
    arr.current = Array(length)
      .fill()
      .map((_, i) => ({
        id: i,
        ref: arr.current[i] || createRef(),
      }));
  }
  return arr.current;
}
