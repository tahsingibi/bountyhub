"use client";
import { useState, useEffect } from "react";
import styles from "./singleform.module.scss";
import {
  Form as ReactFinalForm,
  Field as ReactFinalField,
} from "react-final-form";
import Input from "../input/input";
import Message from "../message/message";
import controlTypes from "../../../utils/controlTypes";
import Button from "../button/button";
import Text from "../text/text";
import PropTypes from "prop-types";
import Label from "../label/label";
import { AppIcons } from "../icon/icon";
import renderClass from "../../../utils/renderClass";

let handleChangeTimeout;

/**
 * The SingleForm component is a form component generated using ReactFinalForm, which includes an input and a button. It is used in situations where individual data is to be posted and contains all the properties related to ReactFinalForm. _(doc: https://final-form.org/react)_
 */

export default function SingleForm({
  formName = "SingleForm",
  onSubmit = () => {},
  fieldName = "fieldName",
  label = null,
  description = null,
  placeholder = "Enter your value",
  isPristineControl = false,
  isRealtimeValidation = false,
  processing = false,
  controlType = null,
  button = null,
  delay = 0,
  initialValues = {},
  resultMessage = null,
  setResultMessage = () => {},
  isReadOnly = false,
  isDisabled = false,
  icon = null,

  ...props
}) {
  const fieldInitialValue = initialValues[fieldName];

  const [inputValue, setInputValue] = useState(fieldInitialValue || "");

  const fieldValidate = isRealtimeValidation && controlType;

  const [lastResult, setLastResult] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (resultMessage) {
      setTimeout(() => setResultMessage(null), 10000);
    }
  }, [resultMessage]);

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

  async function handleFinalSubmit(val) {
    setLoading(true);
    setResultMessage(false);

    try {
      setErrorMessage(null);

      await new Promise((resolve, reject) => {
        const result = onSubmit(val);

        if (result instanceof Promise) {
          result
            .then((res) => {
              resolve();
            })
            .catch((error) => {
              setErrorMessage(JSON.stringify(error));
              reject(error);
            });
        } else {
          resolve();
        }
      });
    } catch (error) {
      setErrorMessage(JSON.stringify(error));
      onSubmit(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleFinalChange(value, input) {
    setInputValue(value);
    setResultMessage(null);

    clearTimeout(handleChangeTimeout);
    handleChangeTimeout = setTimeout(() => {
      input?.onChange(value);
    }, delay);
  }

  const finalFieldProps = controlType
    ? { name: fieldName, initialValue: fieldInitialValue, validate }
    : { name: fieldName, initialValue: fieldInitialValue };

  const buttonDisableControl = (forms) => {
    const { submitting, pristine, invalid, validating } = forms;

    const submitDisable = isPristineControl ? pristine : false;

    if (!isPristineControl) return false;

    return (
      invalid ||
      submitDisable ||
      validating ||
      submitting ||
      fieldInitialValue == inputValue ||
      isDisabled ||
      (!!errorMessage && !pristine)
    );
  };

  const fieldIsValidate = (meta) => {
    return (
      (isPristineControl ? !meta.pristine : true) &&
      meta.visited &&
      !!meta.data &&
      !!fieldValidate
    );
  };

  return (
    <ReactFinalForm
      onSubmit={handleFinalSubmit}
      name={formName}
      {...props}
      render={(formStates) => {
        const { handleSubmit, form } = formStates;

        const buttonIsDisable = buttonDisableControl(formStates);

        return (
          <form
            onSubmit={(value) => {
              handleSubmit(value);
              form.restart();
              form.blur();
            }}
            className={styles.form}
          >
            <div className={styles.formText}>
              {label && <Label text={label} htmlFor={fieldName} />}
              {description && <Text htmlElement="span">{description}</Text>}
            </div>

            <ReactFinalField {...finalFieldProps}>
              {({ input: fieldInput, meta }) => {
                const isValidate = fieldIsValidate(meta);

                const validateStatus = fieldValidate && meta.valid;

                const message =
                  isValidate || meta.submitFailed ? meta.error : null;

                const realtimeValidationStatus =
                  processing && meta.validating ? null : validateStatus;

                const selectMessage = resultMessage?.message || message;
                const messageStyle = resultMessage?.success
                  ? "success"
                  : "danger";

                return (
                  <>
                    <div className={styles.field}>
                      <Input
                        {...fieldInput}
                        onChange={(e) =>
                          handleFinalChange(e.target.value, fieldInput)
                        }
                        value={inputValue}
                        isRealtimeValidation={isValidate}
                        id={fieldName}
                        realtimeValidationStatus={realtimeValidationStatus}
                        placeholder={placeholder}
                        readOnly={isDisabled || isReadOnly}
                        icon={icon}
                      />
                      <Button
                        type="submit"
                        isDisabled={buttonIsDisable}
                        isLoading={loading}
                        disabled={loading || buttonIsDisable}
                        {...button}
                      />
                    </div>

                    <div
                      className={renderClass([
                        styles.fieldMessage,
                        selectMessage ? styles.show : "",
                      ])}
                    >
                      <Message text={selectMessage} style={messageStyle} />
                    </div>
                  </>
                );
              }}
            </ReactFinalField>
          </form>
        );
      }}
    />
  );
}

SingleForm.propTypes = {
  placeholder: PropTypes.any,
  initialValues: PropTypes.any,
  resultMessage: PropTypes.any,
  setResultMessage: PropTypes.any,
  /**
   * The Form component uses redux-toolkit, so unique names should be assigned to the forms being used.
   */
  formName: PropTypes.string,
  /**
   * This field contains information about which key in the form the entered value will be stored under.
   */
  fieldName: PropTypes.string,
  /**
   * The Field component accepts a text as a prop that will be displayed as its label.
   */
  label: PropTypes.string,
  /**
   * The Field component accepts a prop for the description that will be displayed in the field.
   */
  description: PropTypes.string,
  /**
   * The function to be executed when the form is submitted.
   */
  onSubmit: PropTypes.func,
  /**
   *It receives information about which service will be used to validate the value entered into the Input. When used in conjunction with isRealtimeValidation, it performs real-time validation, and when isRealtimeValidation is deactivated, it is only displayed at the time of form submission.
   */
  controlType: PropTypes.string,
  /**
   *Is used to determine whether the form should be submitted or not, based on whether there have been any changes in the form values.
   */
  isPristineControl: PropTypes.bool,
  /**
   * It enables real-time validation to be performed. It cannot be used on its own; the controlType information must also be provided.
   */
  isRealtimeValidation: PropTypes.bool,
  /**
   * While providing real-time control, it monitors the display status of the process icon throughout the operation.
   */
  processing: PropTypes.bool,
  /**
   * In cases where real-time control relies on backend requests, it is recommended to use the "delay" property, with a suggested value of 200ms.
   */
  delay: PropTypes.number,
  /**
   * The SingleForm component utilizes a single button, and it includes the properties that the button component accepts, such as "isDisabled," "isLoading," and "disabled." The SingleForm component internally manages the "isDisabled," "isLoading," and "disabled" states.
   */
  button: PropTypes.object,
  /**
   *
   */
  icon: PropTypes.oneOf(AppIcons),
  /**
   * It controls the readonly state of the input.
   */
  isReadOnly: PropTypes.bool,
  /**
   * It controls the disabled state of the input.
   */
  isDisabled: PropTypes.bool,
};
