"use client";
import { useState, createContext, useMemo } from "react";
import { Form as ReactFinalForm } from "react-final-form";
import styles from "./form.module.scss";
import ButtonGroup from "./buttonGroup/buttonGroup";
import Field from "./field/field";
import PropTypes from "prop-types";
import Message from "../message/message";
import FormServices from "../../../services/formServices/formServices";

export const FormContext = createContext(null);

/**
 * The Form component is created using the React Final Form library and can only be used with the Form.Field component. Both the Form component and Form.Field component accept all the parameters that React Final Form library supports._(doc: https://final-form.org/react)_
 */

export default function Form({
  name = "",
  buttons = {},
  isPristineControl = false,
  children,
  onSubmit = () => {},
  ...props
}) {
  const { UpdateForm } = FormServices();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function handleFinalSubmit(val) {
    setLoading(true);

    try {
      setErrorMessage(false);
      await new Promise((resolve, reject) => {
        const result = onSubmit(val);

        if (result instanceof Promise) {
          result
            .then(() => {
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

  const contextValue = useMemo(
    () => ({ isPristineControl }),
    [isPristineControl]
  );

  return (
    <FormContext.Provider value={contextValue}>
      <ReactFinalForm
        onSubmit={handleFinalSubmit}
        {...props}
        render={({
          handleSubmit,
          submitting,
          pristine,
          invalid,
          validating,
        }) => {
          const clientButtonDisabled =
            buttons?.primary?.isDisabled != undefined &&
            buttons?.primary?.isDisabled != null
              ? buttons?.primary?.isDisabled
              : false;

          const submitDisable = isPristineControl ? pristine : false;
          const buttonIsDisable =
            invalid ||
            submitDisable ||
            validating ||
            submitting ||
            (!!errorMessage && !pristine) ||
            clientButtonDisabled;

          return (
            <form onSubmit={handleSubmit} className={styles.form}>
              <UpdateForm form={name} />
              {!!errorMessage && <Message text={errorMessage} />}
              <div className={styles.fields}>{children}</div>
              {!!buttons.primary && (
                <ButtonGroup
                  primary={
                    buttons.primary && {
                      ...buttons.primary,
                      type: "submit",
                      isDisabled: buttonIsDisable,
                      isLoading: loading,
                      disabled: loading,
                    }
                  }
                  secondary={buttons.secondary && { ...buttons.secondary }}
                  link={buttons.link && { ...buttons.link }}
                />
              )}
            </form>
          );
        }}
      />
    </FormContext.Provider>
  );
}

Form.Field = Field;
Form.Buttons = ButtonGroup;

Form.propTypes = {
  /**
   * The Form component uses redux-toolkit, so unique names should be assigned to the forms being used.
   */
  name: PropTypes.string,
  /**
   * It accepts the initial values for the form.
   */
  initialValues: PropTypes.object,
  /**
   *Is used to determine whether the form should be submitted or not, based on whether there have been any changes in the form values.
   */
  isPristineControl: PropTypes.bool,
  /**
   * It takes all the parameters that Button components can accept as a single object.
   */
  buttons: PropTypes.object,

  /**
   * The function to be executed when the form is submitted.
   */
  onSubmit: PropTypes.func,

  /**
   *  The Form component only accepts Form.Field as children. You can [click here](/?path=/docs/core-form-form-field--docs) to access the Form.Field documentation.
   */
  children: PropTypes.element,
};
