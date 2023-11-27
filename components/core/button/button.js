"use client";
import React, { memo, useEffect, useState } from "react";
import renderClass from "../../../utils/renderClass";
import styles from "./button.module.scss";
import PropTypes from "prop-types";
import Text from "../text/text";
import Icon, { AppIcons } from "../icon/icon";

/**
 * All buttons throughout the application should be generated from this component.
 */
function Button({
  type = "submit",
  text = "Button",
  icon = null,
  iconOnly = false,
  style = "primary",
  size = "default",
  isLoading = false,
  isDisabled = false,
  onClick = () => {},
  reference = null,
  data = [{ key: null, value: null }],
}) {
  const loading = isLoading && style != "link";
  const [loader, setLoader] = useState(loading);
  const disabled = isDisabled && style != "link" && !loader;
  const hasIcon = !!icon?.trim();

  const dataAttributes = Object.fromEntries(
    data.map(({ key, value }) => [`data-${key}`, value])
  );

  useEffect(() => {
    setLoader(loading);
  }, [isLoading]);

  return (
    <button
      {...dataAttributes}
      className={renderClass([
        styles.button,
        styles[style],
        styles[`size_` + size],
        iconOnly ? styles.iconOnly : "",
      ])}
      data-loading={loader.toString()}
      data-disabled={disabled.toString()}
      disabled={loader || disabled}
      onClick={onClick}
      ref={reference}
      type={type}
    >
      <span className={styles.loading}>
        <Icon type="processing" />
      </span>

      {hasIcon && <Icon type={icon} />}
      {!iconOnly && <Text htmlElement="span">{text}</Text>}
    </button>
  );
}

Button.propTypes = {
  /**
   * Button text
   */
  text: PropTypes.string,
  /**
   * Button type
   */
  type: PropTypes.string,
  /**
   * You can choose the icons to be displayed on the buttons from here. If you don't want to display an icon, you just need to omit sending the "icon" prop when using the component.
   */
  icon: PropTypes.oneOf(AppIcons),
  /**
   * It allows only the icon to be displayed on the button.
   */
  iconOnly: PropTypes.bool,
  /**
   * Button size.
   */
  size: PropTypes.oneOf(["default", "small"]),
  /**
   * It is used to determine the button style.
   */
  style: PropTypes.oneOf(["primary", "secondary", "link"]),
  /**
   * The button's unique loading state works with the "isLoading" parameter.
   */
  isLoading: PropTypes.bool,
  /**
   * The button's "disabled" style works with the "isDisabled" parameter.
   */
  isDisabled: PropTypes.bool,
  /**
   * It controls the onClick event of the Button.
   */
  onClick: PropTypes.func,
  /**
   *It is used to set a reference to the Button component using useRef.
   */
  reference: PropTypes.any,
  /**
   *It is used to send data attributes to the Button component and accepts an array for this purpose.
   */
  data: PropTypes.array,
};

export default memo(Button);
