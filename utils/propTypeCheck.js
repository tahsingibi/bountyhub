export default function propTypeCheck(arr, value) {
  const findItem = arr?.find((element) => element?.value == value);
  if (findItem) return findItem.element;
  throw new Error("You can only use the values accepted by the component.");
}
