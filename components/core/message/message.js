import React, { memo } from "react";
import PropTypes from "prop-types";
import styles from "./message.module.scss";
import Text from "../text/text";
import renderClass from "../../../utils/renderClass";

/**
 * All messages throughout the application should be generated from this component.
 */
function Message({ text = null, type = "default", style = "danger" }) {
  return (
    <div
      className={renderClass([styles.wrap, text?.length ? styles.show : ""])}
    >
      <div
        className={renderClass([styles.message, styles[type], styles[style]])}
      >
        <Text htmlElement="span">{text}</Text>
      </div>
    </div>
  );
}

Message.propTypes = {
  /**
   *The text to be displayed in the Message component.
   */
  text: PropTypes.string,
  /**
   * Please select a type for the Message component.
   */
  type: PropTypes.oneOf(["default", "text"]),
  /**
   * Message component warning style has been selected.
   */
  style: PropTypes.oneOf(["success", "danger", "info", "warning"]),
};

export default memo(Message);
