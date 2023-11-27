import React from "react";
import styles from "./label.module.scss";
import Text from "../text/text";
import PropTypes from "prop-types";

/**
 * All labels throughout the application should be generated from this component.
 */
export default function Label({
  text = "Label text",
  isOptional = false,
  htmlFor = "",
}) {
  return (
    <label className={styles.label} htmlFor={htmlFor}>
      <Text htmlElement="p" weight="bold">
        {text}
      </Text>
      {isOptional && (
        <Text htmlElement="span" size="small">
          Optional
        </Text>
      )}
    </label>
  );
}

Label.propTypes = {
  /**
   *The text to be displayed in the Label component.
   */
  text: PropTypes.string,
  /**
   *This label indicates whether the target input is optional or not.
   */
  isOptional: PropTypes.bool,
  /**
   *
   */
  htmlFor: PropTypes.string,
};
