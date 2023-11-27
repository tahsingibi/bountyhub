"use client";
import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./linkedaccount.module.scss";
import SingleForm from "@/components/core/singleform/singleform";
import UserActions from "@/services/userServices/userServices";
import redirectPage from "@/utils/redirect";

const loginRedirects = redirectPage("connectRedirect").telegram;

const _content = {
  name: "userTelegramUpdate",
  input: {
    name: "telegramUsername",
    icon: "telegram",
    placeholder: "Connect your Telegram",
  },
  label: "Telegram",
  description:
    "Aenean porttitor mauris et diam lacinia, id accumsan ex convallis. ",
  button: {
    disabled: true,
    style: "secondary",
  },
  forms: {
    getNumber: {
      heading: "Link your Telegram account",
      description:
        "To link your Telegram account, please enter the phone number associated with your Telegram account. A verification code will be sent to your phone number by Telegram",
    },
  },
};

export default function TelegramUpdate({ user }) {
  const { connectState } = useSelector((state) => state.user.user);

  const isTelegramState = connectState?.type == "telegram";
  const connectStateMessage = isTelegramState ? connectState : null;

  const isLoading = isTelegramState && !connectState?.message;

  const telegramUsername = user?.telegramUsername || null;
  const _userTelegram = telegramUsername?.trim();
  const isConnected = !!_userTelegram;

  const { disconnectSocial, setConnectState } = UserActions();

  async function handleConnect() {
    if (isConnected) return await disconnectSocial("telegram");
    window?.open(loginRedirects, "_self");
  }

  if (user?.username)
    return (
      <div className={styles.item} key={telegramUsername}>
        <SingleForm
          onSubmit={handleConnect}
          name={_content.name}
          fieldName={_content.input.name}
          label={_content.label}
          description={_content.description}
          icon={_content.input.icon}
          placeholder={_userTelegram || _content.input.placeholder}
          initialValues={{ [_content.input.name]: _userTelegram }}
          isReadOnly
          resultMessage={connectStateMessage}
          setResultMessage={setConnectState}
          button={{
            text: isConnected ? "Disconnect" : "Connect",
            disabled: _content.button.disabled,
            style: _content.button.style,
            isLoading: isLoading,
          }}
        />
      </div>
    );
}

TelegramUpdate.propTypes = {
  user: PropTypes.object,
};
