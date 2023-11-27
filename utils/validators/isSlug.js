export default function isSlug(str) {
  const slugRegex = /^[a-zA-Z0-9_-]+$/;

  return slugRegex.test(str);
}
