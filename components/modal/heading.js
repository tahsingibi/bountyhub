import React from "react";
import styles from "./modal.module.scss";
import Heading from "../core/heading/heading";
import Text from "../core/text/text";
import PropTypes from "prop-types";

export default function ModalHeading({ heading = "", children = null }) {
  return (
    <div className={styles.heading}>
      {!!heading && <Heading size="large" text={heading} />}
      {!!children && (
        <Text htmlElement="p" size="default" weight="regular">
          {children}
        </Text>
      )}
    </div>
  );
}

ModalHeading.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node,
};
