"use client";
import React, { useContext, useState } from "react";
import { Field as FinalField } from "react-final-form";
import controlTypes from "../../../../utils/controlTypes";
import styles from "../form.module.scss";
import Label from "../../label/label";
import Text from "../../text/text";
import Input from "../../input/input";
import Selectbox from "../../selectbox/selectbox";
import Message from "../../message/message";
import PropTypes from "prop-types";
import { FormContext } from "../form";
import renderClass from "../../../../utils/renderClass";
import Textarea from "../../textarea/textarea";
import Toggle from "../../toggle/toggle";

/**
 * The Form.Field component, like the Form component, is created using the React Final Form library. It cannot be used independently of the Form component and accepts all the props that the React Final Form's Field library supports. _(doc: https://final-form.org/react)_
 */

let handleChangeTimeout;

export default function Field({
  label = null,
  input = null,
  toggle = null,
  textarea = null,
  selectbox = null,
  controlType = "",
  required = true,
  isRealtimeValidation,
  delay = 0,
  initialValue = "",
  processing = false,

  ...props
}) {
  const { isPristineControl } = useContext(FormContext);
  const fieldValidate = isRealtimeValidation && controlType;

  const [inputValue, setInputValue] = useState(initialValue || "");

  const [lastResult, setLastResult] = useState([]);

  async function validate(value) {
    let lastControl =
      lastResult?.find(({ controlType: cType }) => cType == controlType) ||
      null;

    if (!lastControl || lastControl.controlType === controlType) {
      if (lastControl?.value !== value || !value) {
        const newValue = value || "";
        const result = controlType ? controlTypes(controlType, newValue) : null;

        setLastResult((prevState) => {
          if (lastControl) {
            lastControl.result = result;
            lastControl.value = value;

            return prevState;
          }

          return [...prevState, { controlType, result, value }];
        });

        return result;
      }
    }
    return lastControl?.result;
  }

  async function handleChange(value, input) {
    setInputValue(value);
    clearTimeout(handleChangeTimeout);
    handleChangeTimeout = setTimeout(() => {
      input?.onChange(value);
    }, delay);
  }

  const finalProps = controlType ? { ...props, validate } : { ...props };

  return (
    <FinalField {...finalProps} component="input">
      {(fieldsState) => {
        const { input: fieldInput, meta } = fieldsState;

        const isValidate =
          (isPristineControl ? !meta.pristine : true) &&
          meta.visited &&
          !!meta.data &&
          !!fieldValidate;

        const validateStatus = fieldValidate && meta.valid;

        const isMessageView = isValidate;
        const message = isMessageView || meta.submitFailed ? meta.error : null;

        return (
          <div
            className={renderClass([
              styles.formfield,
              toggle ? styles.toggle : "",
            ])}
          >
            {!!label && !toggle && (
              <Label {...label} htmlFor={props.name} isOptional={!required} />
            )}

            <div className={styles.item}>
              {!!toggle && (
                <div className={styles.toggle}>
                  <div className={styles.left}>
                    <Label
                      {...label}
                      htmlFor={props.name}
                      isOptional={!required}
                    />
                    {toggle.description && (
                      <Text htmlElement="span">{toggle.description}</Text>
                    )}
                  </div>
                  <Toggle
                    id={props.name}
                    {...toggle}
                    {...fieldInput}
                    checked={!!initialValue}
                  />
                </div>
              )}
              {!!input && (
                <Input
                  {...input}
                  {...fieldInput}
                  value={inputValue}
                  onChange={(e) => handleChange(e.target.value, fieldInput)}
                  id={props.name}
                  isRealtimeValidation={isValidate}
                  realtimeValidationStatus={
                    processing && meta.validating ? null : validateStatus
                  }
                />
              )}
              {!!textarea && (
                <Textarea
                  {...textarea}
                  {...fieldInput}
                  value={inputValue}
                  onChange={(e) => handleChange(e.target.value, fieldInput)}
                  id={props.name}
                />
              )}
              {!!selectbox && <Selectbox {...selectbox} {...fieldInput} />}
            </div>

            <div
              className={renderClass([
                styles.formfieldMessage,
                message ? styles.show : "",
              ])}
            >
              <Message text={message} />
            </div>
          </div>
        );
      }}
    </FinalField>
  );
}

Field.propTypes = {
  /**
   * This field contains information about which key in the form the entered value will be stored under.
   */
  name: PropTypes.string,
  /**
   * It enables real-time validation to be performed. It cannot be used on its own; the controlType information must also be provided.
   */
  isRealtimeValidation: PropTypes.bool,
  /**
   * In cases where real-time control relies on backend requests, it is recommended to use the "delay" property, with a suggested value of 200ms.
   */
  delay: PropTypes.number,
  /**
   * While providing real-time control, it monitors the display status of the process icon throughout the operation.
   */
  processing: PropTypes.bool,
  /**
   * It checks the initial value state of the field.
   */
  initialValue: PropTypes.any,
  /**
   *It receives information about which service will be used to validate the value entered into the Input. When used in conjunction with isRealtimeValidation, it performs real-time validation, and when isRealtimeValidation is deactivated, it is only displayed at the time of form submission.
   */
  controlType: PropTypes.string,
  /**
   * The Label component accepts its props as a single object. The "isOptional" prop works in conjunction with the "required" prop. When "required" is set to false, "isOptional" is set to true.
   */
  label: PropTypes.object,
  /**
   * It takes all the props for the Input component within a single object. [click here](/?path=/docs/core-input--docs)
   */
  input: PropTypes.any,
  /**
   * It takes all the props for the Textarea component within a single object. [click here](/?path=/docs/core-textarea--docs)
   */
  textarea: PropTypes.any,
  /**
   * It takes all the props for the Selectbox component within a single object. [click here](/?path=/docs/core-selectbox--docs)
   */
  selectbox: PropTypes.any,
  /**
   *
   */
  toggle: PropTypes.any,
  /**
   * It determines whether this field is required in the created form.
   */
  required: PropTypes.bool,
};
