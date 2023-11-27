"use client";
import { useState } from "react";
import Modal from "@/components/modal/modal";
import Form from "@/components/core/form/form";
import ModalActions from "@/services/modalServices/modalServices";
import styles from "./linkedaccount.module.scss";
import UserActions from "@/services/userServices/userServices";
import TelegramVerifyNumber from "./TelegramVerifyNumber";
import Message from "@/components/core/message/message";
import renderClass from "@/utils/renderClass";

const _content = {
  form: {
    name: "UserConnectTelegramNumber",
    label: "Phone Number",
  },
  input: {
    name: "phoneNumber",
    controlType: "mobile",
    placeholder: "+442071234567",
    type: "number",
  },
  getNumber: {
    heading: "Link your Telegram account",
    description:
      "To link your Telegram account, please enter the phone number associated with your Telegram account. A verification code will be sent to your phone number by Telegram",
    button: "Send verification code",
  },
};

export default function AddNumber() {
  const [message, setMessage] = useState();

  const { createModal, destroyAllModal } = ModalActions();
  const { connectTelegram } = UserActions();

  async function handleConnect(value) {
    await connectTelegram({
      value,
      onSuccess: (val) => {
        createModal({
          name: "VerifyNumber",
          data: () => TelegramVerifyNumber(val),
        });
      },

      onError: (error) => setMessage(error),
    });
  }

  return (
    <div className={styles.addNumber}>
      <Modal.Heading heading={_content.getNumber.heading}>
        {_content.getNumber.description}
      </Modal.Heading>
      <div
        className={renderClass([styles.message, message ? styles.show : ""])}
      >
        <Message text={message} />
      </div>
      <Form
        buttons={{
          primary: {
            isDisabled: true,
            text: _content.getNumber.button,
          },
          link: {
            text: "Cancel",
            onClick: destroyAllModal,
          },
        }}
        isPristineControl
        name={_content.form.name}
        onSubmit={handleConnect}
      >
        <Form.Field
          controlType={_content.input.controlType}
          input={{
            placeholder: _content.input.placeholder,
            type: _content.input.type,
          }}
          isRealtimeValidation
          label={{
            text: _content.form.label,
          }}
          name={_content.input.name}
        />
      </Form>
    </div>
  );
}
