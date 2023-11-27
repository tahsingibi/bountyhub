import React from "react";
import PropTypes from "prop-types";
import styles from "./heading.module.scss";
import renderClass from "../../../utils/renderClass";
import propTypeCheck from "../../../utils/propTypeCheck";

export const useableHTMLElements = [
  { value: "small", element: "h3" },
  { value: "default", element: "h2" },
  { value: "large", element: "h1" },
];

/**
 * All headings throughout the application should be generated from this component.
 */
export default function Heading({ text = "Heading Text", size = "default" }) {
  const Element = propTypeCheck(useableHTMLElements, size);

  return (
    <Element className={renderClass([styles.heading, styles[size]])}>
      {text}
    </Element>
  );
}

export const validSizes = useableHTMLElements.map((item) => item.value);
Heading.propTypes = {
  /**
   * The text to be displayed in the heading component.
   */
  text: PropTypes.string.isRequired,
  /**
   * It is used to determine the heading size.
   */
  size: PropTypes.oneOf(validSizes),
};
