import React from "react";
import styles from "../verifycode.module.scss";
import Message from "../../core/message/message";
import { useSelector } from "react-redux";

export default function SendedMessage() {
  const { isSended } = useSelector((state) => state.verification.verification);

  if (!isSended) return null;

  return (
    <div className={styles.sended}>
      <Message
        style="success"
        text="A new verification code has been sent to your email address, please check
      your email inbox."
        type="text"
      />
    </div>
  );
}
