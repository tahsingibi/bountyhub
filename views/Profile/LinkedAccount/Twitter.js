"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./linkedaccount.module.scss";
import SingleForm from "@/components/core/singleform/singleform";
import UserActions from "@/services/userServices/userServices";

const _content = {
  name: "userTwitterUpdate",
  input: {
    name: "twitter",
    icon: "twitter-x",
    placeholder: "Connect your Twitter",
  },
  label: "Twitter",
  description:
    "Aenean porttitor mauris et diam lacinia, id accumsan ex convallis. ",
  button: {
    disabled: true,
    style: "secondary",
  },
};

export default function TwitterUpdate({ user }) {
  const { twitterUsername } = user;
  const isConnected = !!twitterUsername;

  const [errorMessage, setErrorMessage] = useState(null);

  const { connectTwitter } = UserActions();

  async function handleConnect() {
    await connectTwitter({
      username: twitterUsername,
      onResult: setErrorMessage,
    });
  }

  return (
    <div className={styles.item}>
      <SingleForm
        onSubmit={handleConnect}
        name={_content.name}
        fieldName={_content.input.name}
        label={_content.label}
        description={_content.description}
        icon={_content.input.icon}
        placeholder={twitterUsername || _content.input.placeholder}
        isReadOnly
        resultMessage={errorMessage}
        setResultMessage={setErrorMessage}
        button={{
          text: isConnected ? "Disconnect" : "Connect",
          disabled: _content.button.disabled,
          style: _content.button.style,
        }}
      />
    </div>
  );
}

TwitterUpdate.propTypes = {
  user: PropTypes.object,
};
