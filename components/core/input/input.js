import React, { memo, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./input.module.scss";
import Icon from "../icon/icon";
import renderClass from "../../../utils/renderClass";
import NextImage from "next/image";
import controlTypes from "@/utils/controlTypes";

/**
 * All inputs throughout the application should be generated from this component.
 */
function Input({
  id = "Bountyhub",
  placeholder = "Enter your key",
  icon = null,
  size = "default",
  isRealtimeValidation = false,
  realtimeValidationStatus = false,
  reference = null,
  align = "",
  type = "text",
  isLoading = false,
  disabled = false,
  onChange = () => {},
  defaultValue = null,
  prefix = null,
  controller = null,
  accept = null,

  ...props
}) {
  const initialRef = useRef();
  const inputRef = reference || initialRef;

  const handleClick = () => {
    if (type == "file") {
      initialRef?.current.click();
    }
  };

  const [imageFile, setImageFile] = useState(defaultValue);

  const hasIcon = !!icon?.trim() && size != "large" && align != "center";
  const hasValidator = isRealtimeValidation && size != "large";

  const isValidate = realtimeValidationStatus ? "success" : "danger";
  const validState =
    realtimeValidationStatus == null ? "processing" : isValidate;

  const isDisabled = props?.disabled || isLoading;

  const Element = type == "file" ? "button" : "div";

  function handleChange(e) {
    const file = (e?.target?.files && e?.target?.files[0]) || null;
    const result = file || e;

    function callback(res) {
      setImageFile(null);

      if (!res) {
        if (file?.type?.includes("image")) {
          const image = new Image();
          image.src = URL.createObjectURL(file);
          setImageFile(image.src);
        }
        return onChange(result);
      }
      setImageFile(defaultValue);
      onChange(res);
    }

    if (controller) {
      return controlTypes(controller, result).then((res) => {
        const _result = res ? { message: res } : null;
        callback(_result);
      });
    }

    return callback();
  }

  return (
    <Element
      className={renderClass([
        styles.input,
        styles["size_" + size],
        styles["type_" + type],
        isLoading ? styles.loader : "",
      ])}
      onClick={handleClick}
      type="button"
    >
      {prefix && (
        <span className={styles.prefix} {...props}>
          {prefix}
        </span>
      )}
      {imageFile && (
        <span className={styles.body}>
          <NextImage src={imageFile} fill alt={id} />
        </span>
      )}

      {isLoading && (
        <div className={styles.loading}>
          <Icon type="processing" />
        </div>
      )}
      {(hasIcon || (icon && type == "file")) && <Icon type={icon} />}
      <input
        placeholder={placeholder}
        {...props}
        ref={inputRef}
        type={type}
        disabled={isDisabled}
        onChange={handleChange}
        accept={accept}
      />
      {hasValidator && <Icon type={validState} />}
    </Element>
  );
}

Input.propTypes = {
  /**
   * Input placeholder text
   */
  placeholder: PropTypes.string,
  /**
   * Input reference with useRef
   */
  reference: PropTypes.object,
  /**
   * Icons cannot be used in large size inputs.
   */
  icon: PropTypes.string,
  /**
   * It is used to determine the input size.
   */
  size: PropTypes.oneOf(["large", "default", "small"]),

  /**
   *
   */
  align: PropTypes.oneOf(["center", "left"]),

  /**
   * Enables real-time validation of the entered value in the input, and this cannot be used in Large Size inputs.
   */
  isRealtimeValidation: PropTypes.bool,
  /**
   * Controls the real-time validation status of the entered value in the input, and this cannot be used in Large Size inputs.
   */
  realtimeValidationStatus: PropTypes.any,
  /**
   * Controls the type attribute of the input component.
   */
  type: PropTypes.any,
  /**
   * Controls the loader feature in the file input type.
   */
  isLoading: PropTypes.bool,
  /**
   * Controls the disabled the input .
   */
  disabled: PropTypes.bool,
  /**
   * Controls the onChange function the input .
   */
  onChange: PropTypes.func,
  /**
   * Controls the default value the input .
   */
  defaultValue: PropTypes.func,
  /**
   * Controls the static text the input .
   */
  prefix: PropTypes.string,
  controller: PropTypes.any,
  accept: PropTypes.any,
  id: PropTypes.string,
};

export default memo(Input);
