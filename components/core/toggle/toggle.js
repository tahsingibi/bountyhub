import React, { memo, useState } from "react";
import styles from "./toggle.module.scss";
import PropTypes from "prop-types";

function Toggle({ onChange = () => {}, checked, ...props }) {
  const [isChecked, setIsChecked] = useState(checked || false);

  function toggle() {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  }

  return (
    <label className={styles.toggleSwitch}>
      <input type="checkbox" checked={isChecked} onChange={toggle} {...props} />
      <span className={styles.switch} />
    </label>
  );
}

export default memo(Toggle);

Toggle.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};
