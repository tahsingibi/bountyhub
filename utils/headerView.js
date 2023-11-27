export default function headerView(path) {
  return (
    !path?.startsWith("/membership/connect") &&
    !path.startsWith("/membership/disconnect") &&
    !path.startsWith("/create-community")
  );
}
