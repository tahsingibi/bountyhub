import React from "react";
import styles from "./splash.module.scss";
import Logo from "../core/logo/logo";
import renderClass from "@/utils/renderClass";
import PropTypes from "prop-types";

export default function Splash({ isView }) {
  return (
    <div className={renderClass([styles.splash, isView ? styles.show : ""])}>
      <Logo type="icon" />
    </div>
  );
}

Splash.propTypes = {
  isView: PropTypes.bool,
};
