import PropTypes from "prop-types";

const STATIC = process.env.CDN_STATIC;
const UPLOAD = process.env.CDN_UPLOAD;

if (!STATIC || !UPLOAD) {
  throw new Error("CDN links have not been defined; please define them.");
}
export default function getCdnUrl({ type = "static", path = "" }) {
  let base = type == "upload" ? UPLOAD : STATIC;

  return base + path;
}

getCdnUrl.propTypes = {
  type: PropTypes.oneOf(["static", "upload"]),
  static: PropTypes.string,
};
