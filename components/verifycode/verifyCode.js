"use client";
import { memo, useEffect } from "react";
import styles from "./verifycode.module.scss";
import Heading from "../core/heading/heading";
import Text from "../core/text/text";
import Form from "../core/form/form";
import OTPBoxes from "./otpBoxes/otpBoxes";

import ErrorMessage from "./errorMessage/errorMessage";
import ResendableMessage from "./resendableMessage/resendableMessage";
import CountingMessage from "./countingMessage/countingMessage";
import { useSelector } from "react-redux";
import SendedMessage from "./sendedMessage/sendedMessage";
import VerifyActions from "../../services/verifyServices/verifyServices";
import PropTypes from "prop-types";
import getMessage from "../../utils/getMessage";
import CounterActions from "../../services/verifyServices/counterServices";
import OTPActions from "../../services/verifyServices/otpServices";

function VerifyCode({
  title = "",
  description = "",
  resend = "",
  buttons = {},
  onSubmit = async () => {},
  manyChar = 4,
}) {
  const { clearlyOTPBox } = OTPActions();
  const { counter } = useSelector((state) => state.verification);
  const { isLoading, reload, verifyCode } = useSelector(
    (state) => state.verification.verification
  );

  const { isFilled, setErrorMessage, setLoading } = VerifyActions();

  const { counterShow } = CounterActions();

  useEffect(() => {
    clearlyOTPBox(manyChar);
    return () => counterShow(false);
  }, []);

  async function handleSubmit() {
    if (!isFilled) return setErrorMessage(getMessage("F001"));

    setErrorMessage(null);
    setLoading(true);

    try {
      await onSubmit(verifyCode);
    } catch (error) {
      setErrorMessage(JSON.stringify(error));
      await onSubmit(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.verifycode}>
      <div className={styles.headline}>
        <Heading text={title} size="large" />
        <Text>
          <font dangerouslySetInnerHTML={{ __html: description }} />
        </Text>
      </div>
      <ErrorMessage />
      <Form onSubmit={handleSubmit} name="otp">
        <>
          <OTPBoxes />
          <div className={styles.stateMessage}>
            <ResendableMessage content={resend} />

            <div className={counter.isShow ? styles.show : ""}>
              <CountingMessage key={reload} second={180} />
            </div>

            <SendedMessage />
          </div>
          <Form.Buttons
            primary={{
              ...buttons.primary,
              isLoading: isLoading,
              isDisabled: !isFilled,
              type: "submit",
            }}
            secondary={
              buttons.secondary && { ...buttons.secondary, type: "button" }
            }
            link={{ ...buttons.link, type: "button" }}
          />
        </>
      </Form>
    </div>
  );
}

export default memo(VerifyCode);

VerifyCode.propTypes = {
  /**
   * It specifies the title related to the area where the component will be displayed.
   */
  title: PropTypes.string,
  /**
   * It specifies the description related to the area where the component will be displayed.
   */
  description: PropTypes.string,
  /**
   * It includes the message text and button label for the Resend Message Component. To specify the link text that triggers the resend function within the component, place the link text within the scope {...} in the text..
   */
  resend: PropTypes.string,
  /**
   * It receives the properties of the buttons it will contain as a single object and accepts all the props of the Button component. _[Click to view the documentation.](/?path=/docs/core-form-form-field--docs)_
   */
  buttons: PropTypes.object,
  /**
   * The action to be taken when the form is submitted.
   */
  onSubmit: PropTypes.func,
  /**
   * Many Box
   */
  manyChar: PropTypes.number,
};
