import React from "react";
import styles from "./divider.module.scss";
import PropTypes from "prop-types";
import Text from "../text/text";

/**
 * All separators to be used throughout the application are derived from this component.
 */
export default function Divider({ text = null }) {
  return (
    <div className={styles.divider}>
      {!!text && (
        <Text htmlElement="span" weight="bold">
          {text}
        </Text>
      )}
    </div>
  );
}

Divider.propTypes = {
  /**
   * If you want to use a label inside the Divider, you can simply send the text, and it will be sufficient.
   */
  text: PropTypes.string,
};
