import getCdnUrl from "../../../utils/getCdnUrl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PropTypes from "prop-types";

/**
 * Throughout the application, the application's logo is exclusively used through this component.
 */

export default function Logo({ type = "logo" }) {
  let iconimg = {
    path: "bussiness/logo/bountyhub-icon.svg",
    height: 26,
    width: 27,
  };

  let logoimg = {
    path: "bussiness/logo/bountyhub-logo.svg",
    height: 32,
    width: 161.71,
  };

  const base = type == "icon" ? iconimg : logoimg;

  return (
    <Link href="/">
      <Image
        src={getCdnUrl({ path: base.path })}
        width={base.width}
        height={base.height}
        alt="Bountyhub"
      />
    </Link>
  );
}

Logo.propTypes = {
  /**
   * It is used to determine the type of the Logo component.
   */
  type: PropTypes.oneOf(["logo", "icon"]),
};
