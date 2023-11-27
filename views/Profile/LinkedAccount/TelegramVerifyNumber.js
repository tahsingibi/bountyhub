import React from "react";
import VerifyCode from "@/components/verifycode/verifyCode";
import ModalActions from "@/services/modalServices/modalServices";
import styles from "./linkedaccount.module.scss";
import UserActions from "@/services/userServices/userServices";
import VerifyActions from "@/services/verifyServices/verifyServices";
import PropTypes from "prop-types";

const _content = {
  title: "Verify your Telegram account",
  description:
    "Verification code has been sent to <b>{number}</b>. To confirm that the Telegram account belongs to you, please check your messages and enter the 5-digit verification code.",
  button: {
    link: "Cancel and go back",
    primary: "Verify my Telegram account",
  },
};

export default function TelegramVerifyNumber({ info }) {
  const { destroyAllModal } = ModalActions();
  const { verifyTelegram } = UserActions();
  const { setErrorMessage } = VerifyActions();

  async function handleSubmit(val) {
    const body = {
      hash: info?.hash,
      phoneNumber: info?.phoneNumber,
      code: val,
    };
    await verifyTelegram({
      info: body,
      onSuccess: destroyAllModal,
      onError: setErrorMessage,
    });
  }

  const description = _content.description.replace(
    "{number}",
    info?.phoneNumber
  );

  return (
    <div className={styles.verify}>
      <VerifyCode
        title={_content.title}
        description={description}
        onSubmit={handleSubmit}
        manyChar={5}
        buttons={{
          primary: { text: _content.button.primary },
          link: {
            text: _content.button.link,
            onClick: destroyAllModal,
          },
        }}
      />
    </div>
  );
}

TelegramVerifyNumber.propTypes = {
  info: PropTypes.object,
};
