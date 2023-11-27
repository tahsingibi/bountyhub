import React, { Fragment, memo } from "react";
import Link from "next/link";
import Text from "../../core/text/text";
import styles from "../verifycode.module.scss";
import { useSelector } from "react-redux";
import VerifyActions from "../../../services/verifyServices/verifyServices";
import { v4 as uuid } from "uuid";
import PropTypes from "prop-types";

function ResendableMessage({
  content = `Can't find your code? Check the spam folder or {resend} it`,
}) {
  const { sendVerificationCode } = VerifyActions();
  const { isShow } = useSelector((state) => state.verification.counter);
  const { isSended } = useSelector((state) => state.verification.verification);

  if (isShow || isSended) return null;

  function handleClick(e) {
    e.preventDefault();
    sendVerificationCode();
  }

  const buttonRegex = RegExp(/{\w+}/g);
  const contentArray = content
    .split(" ")
    ?.map((string) => ({ id: uuid, string }));

  const replacedText = contentArray.map((part) => {
    if (buttonRegex.test(part?.string)) {
      let newPart = part?.string?.replace("{", "").replace("}", "");

      return (
        <Fragment key={part?.id}>
          <Link href="" onClick={handleClick}>
            {newPart}
          </Link>{" "}
        </Fragment>
      );
    }
    return part?.string + " ";
  });

  return (
    <div className={styles.resendable}>
      <Text>{replacedText}</Text>
    </div>
  );
}

export default memo(ResendableMessage);

ResendableMessage.propTypes = {
  content: PropTypes.any,
};
