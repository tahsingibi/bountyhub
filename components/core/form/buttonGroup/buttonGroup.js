"use client";
import React from "react";
import styles from "../form.module.scss";
import Button from "../../button/button";
import PropTypes from "prop-types";
import { AppIcons } from "../../icon/icon";

/**
 * If you're going to use multiple buttons in a view area, they should be used together with the ButtonGroup component.
 */
export default function ButtonGroup({
  primary = null,
  secondary = null,
  link = null,
}) {
  return (
    <div className={styles.buttonGroup}>
      {!!primary && <Button {...primary} type="submit" style="primary" />}
      {!!secondary && <Button {...secondary} type="button" style="secondary" />}
      {!!link && <Button {...link} type="button" style="link" />}
    </div>
  );
}

ButtonGroup.propTypes = {
  /**
   * It carries the prop attributes of the Primary Button.
   */
  primary: PropTypes.shape({
    /**
     * Button text
     */
    text: PropTypes.string,
    /**
     * You can choose the icons to be displayed on the buttons from here. If you don't want to display an icon, you just need to omit sending the "icon" prop when using the component.
     */
    icon: PropTypes.oneOf(AppIcons),

    /**
     * The button's unique loading state works with the "isLoading" parameter.
     */
    isLoading: PropTypes.bool,
    /**
     * The button's "disabled" style works with the "isDisabled" parameter.
     */
    isDisabled: PropTypes.bool,
    /**
     * All operations except for the specified prop types work with "...props." (ex: onClick event)
     */
    props: PropTypes.object,
  }),
  /**
   * It carries the prop attributes of the Secondary Button.
   */
  secondary: PropTypes.shape({
    /**
     * Button text
     */
    text: PropTypes.string,
    /**
     * You can choose the icons to be displayed on the buttons from here. If you don't want to display an icon, you just need to omit sending the "icon" prop when using the component.
     */
    icon: PropTypes.oneOf(AppIcons),

    /**
     * The button's unique loading state works with the "isLoading" parameter.
     */
    isLoading: PropTypes.bool,
    /**
     * The button's "disabled" style works with the "isDisabled" parameter.
     */
    isDisabled: PropTypes.bool,
    /**
     * All operations except for the specified prop types work with "...props." (ex: onClick event)
     */
    props: PropTypes.object,
  }),
  /**
   * It carries the prop attributes of the Link Button.
   */
  link: PropTypes.shape({
    /**
     * Button text
     */
    text: PropTypes.string,
    /**
     * You can choose the icons to be displayed on the buttons from here. If you don't want to display an icon, you just need to omit sending the "icon" prop when using the component.
     */
    icon: PropTypes.oneOf(AppIcons),

    /**
     * The button's unique loading state works with the "isLoading" parameter.
     */
    isLoading: PropTypes.bool,
    /**
     * The button's "disabled" style works with the "isDisabled" parameter.
     */
    isDisabled: PropTypes.bool,
    /**
     * All operations except for the specified prop types work with "...props." (ex: onClick event)
     */
    props: PropTypes.object,
  }),
};
