"use client";
import React from "react";
import PropTypes from "prop-types";
import styles from "./linkedaccount.module.scss";
import SingleForm from "@/components/core/singleform/singleform";
import UserActions from "@/services/userServices/userServices";
import { useSelector } from "react-redux";

const _content = {
  name: "userDiscordUpdate",
  input: {
    name: "discordUsername",
    icon: "discord",
    placeholder: "Connect your Discord",
  },
  label: "Discord",
  description:
    "Aenean porttitor mauris et diam lacinia, id accumsan ex convallis. ",
  button: {
    disabled: true,
    style: "secondary",
  },
};

export default function DiscordUpdate({ user }) {
  const { connectState } = useSelector((state) => state.user.user);

  const isDiscordState = connectState?.type == "discord";
  const connectStateMessage = isDiscordState ? connectState : null;

  const isLoading = isDiscordState && !connectState?.message;

  const { discordUsername } = user;
  const isConnected = !!discordUsername;

  const { connectDiscord, setConnectState } = UserActions();

  async function handleConnect() {
    await connectDiscord({
      username: discordUsername,
    });
  }

  if (user?.username)
    return (
      <div className={styles.item} key={discordUsername}>
        <SingleForm
          onSubmit={handleConnect}
          name={_content.name}
          fieldName={_content.input.name}
          label={_content.label}
          description={_content.description}
          icon={_content.input.icon}
          placeholder={discordUsername || _content.input.placeholder}
          initialValues={{ [_content.input.name]: discordUsername }}
          isReadOnly
          resultMessage={connectStateMessage}
          setResultMessage={setConnectState}
          button={{
            text: isConnected ? "Disconnect" : "Connect",
            disabled: _content.button.disabled,
            style: _content.button.style,
            isLoading,
          }}
        />
      </div>
    );
}

DiscordUpdate.propTypes = {
  user: PropTypes.object,
};
