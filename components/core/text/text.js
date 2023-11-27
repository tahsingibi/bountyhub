import React from "react";
import PropTypes from "prop-types";
import styles from "./text.module.scss";
import renderClass from "../../../utils/renderClass";
import propTypeCheck from "../../../utils/propTypeCheck";

export const useableHTMLElements = [
  { value: "p", element: "p" },
  { value: "span", element: "span" },
];

/**
 * All texts throughout the application should be generated from this component.
 */
export default function Text({
  htmlElement = "p",
  size = "default",
  weight = "regular",
  children,
}) {
  const Element = propTypeCheck(useableHTMLElements, htmlElement);

  return (
    <Element
      className={renderClass([styles.text, styles[size], styles[weight]])}
    >
      {children}
    </Element>
  );
}

export const validElements = useableHTMLElements.map((item) => item.value);

Text.propTypes = {
  /**
   * It specifies which HTML tag should be used to display the Text component.
   */
  htmlElement: PropTypes.oneOf(validElements),
  /**
   * It is used to determine the Text size.
   */
  size: PropTypes.oneOf(["default", "small"]),
  /**
   * It is used to determine the Text weight.
   */
  weight: PropTypes.oneOf(["regular", "bold"]),
};
