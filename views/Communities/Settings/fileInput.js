import React, { useState, memo } from "react";
import Label from "@/components/core/label/label";
import Input from "@/components/core/input/input";
import styles from "../communities.module.scss";
import { useForm } from "react-final-form";
import Message from "@/components/core/message/message";
import Text from "@/components/core/text/text";
import PropTypes from "prop-types";

function FileInput({
  label,
  name,
  defaultValue,
  size = "default",
  callback = () => {},
  controller = null,
  description = null,
}) {
  let form = useForm();

  const [errorMessage, setErrorMessage] = useState();

  function handleChange(val) {
    setErrorMessage(null);
    callback(null);

    if (val && !val.message) form.change(name, val);

    setErrorMessage(val?.message);
    callback(val);
  }

  return (
    <div className={styles.field}>
      <Label text={label} htmlFor={name} />
      <Input
        type="file"
        icon="camera"
        id={name}
        defaultValue={defaultValue}
        size={size}
        onChange={handleChange}
        controller={controller}
        accept=".jpg, .jpeg, .png, .gif"
      />

      {description && (
        <div className={styles.description}>
          <Text size="small">{description}</Text>
        </div>
      )}
      <Message text={errorMessage} />
    </div>
  );
}

export default memo(FileInput);

FileInput.propTypes = {
  label: PropTypes.any,
  name: PropTypes.any,
  defaultValue: PropTypes.any,
  size: PropTypes.any,
  callback: PropTypes.any,
  controller: PropTypes.any,
  description: PropTypes.any,
};
