import React from "react";
import PropTypes from "prop-types";
export const AppIcons = [
  null,
  "down",
  "google",
  "mail",
  "placeholder",
  "processing",
  "search",
  "success",
  "up",
  "twitter-x",
  "apple",
  "danger",
  "discord",
  "link",
  "user",
  "flash",
  "sandwatch",
  "star",
  "wallet",
  "camera",
  "disconnect",
  "fire",
  "heart",
  "newtab",
  "notification",
  "telegram",
  "close",
  "menu",
];

/**
 * All icons throughout the application should be generated from this component, and only the existing icons can be used. When attempting to display an icon that is not among the existing ones, an icon with a "placeholder" class will be shown.
 */
export default function Icon({ type = "placeholder" }) {
  const view = () => {
    if (type) {
      const findIcon = AppIcons.find((ico) => ico === type);
      return findIcon || "placeholder";
    }

    return null;
  };

  return <i className={`app-icon ${view()}`} />;
}

Icon.propTypes = {
  type: PropTypes.string,
};
