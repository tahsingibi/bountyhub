"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import getCdnUrl from "@/utils/getCdnUrl";
import styles from "./connect.module.scss";
import Logo from "@/components/core/logo/logo";
import Heading from "@/components/core/heading/heading";
import Text from "@/components/core/text/text";
import Button from "@/components/core/button/button";
import Divider from "@/components/core/divider/divider";
import Form from "@/components/core/form/form";
import Message from "@/components/core/message/message";
import MembershipActions from "@/services/membershipServices/membershipServices";
import { useSelector } from "react-redux";

const _content = {
  heading: "Connect to Bountyhub",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
    accumsan, ex vel suscipit vehicula, ligula tortor suscipit.`,
  image: "app/images/connect/connect.png",

  form_name: "connect",
  email_options: {
    name: "email",
    control_type: "email",
    label: {
      text: "Email address",
    },
    input: {
      placeholder: "example@mail.com",
    },
    button: {
      text: "Connect with email adress",
    },
  },
  connect_options: [
    {
      id: 1,
      text: "Connect with Google",
      icon: "google",
      onClick: "google",
    },
    {
      id: 2,
      text: "Connect with Discord",
      icon: "discord",
      onClick: "discord",
    },
    {
      id: 3,
      text: "Connect with X (Twitter)",
      icon: "twitter-x",
      onClick: "twitter",
    },
    {
      id: 4,
      text: "Connect with Apple",
      icon: "apple",
      onClick: "apple",
    },
  ],
};

export default function ConnectView() {
  const { connectMessage, loginType } = useSelector(
    (state) => state.membership.membership
  );

  const { connectSystem, clearMembership } = MembershipActions();

  useEffect(() => clearMembership(), []);

  async function handleConnect(type, value) {
    await connectSystem(type, value);
  }

  return (
    <>
      <div id="connectContainer" className={styles.content}>
        <Logo />
        <div className={styles.heading}>
          <Heading text={_content.heading} size="large" />
          <Text>{_content.description}</Text>
        </div>
        {!!connectMessage && (
          <div className={styles.errorMessage}>
            <Message text={connectMessage} />
          </div>
        )}

        <div className={styles.buttonList}>
          {_content.connect_options.map(({ id, text, icon, onClick }) => (
            <Button
              key={id}
              icon={icon}
              style="secondary"
              text={text}
              onClick={() => handleConnect(onClick, null)}
              isLoading={loginType == onClick}
            />
          ))}
        </div>

        <Divider text="or" />
        <div className={styles.divider}></div>
        <Form
          name={_content.form_name}
          isPristineControl
          buttons={{
            primary: {
              ..._content.email_options.button,
            },
          }}
          onSubmit={(val) => handleConnect("email", val)}
        >
          <Form.Field
            name={_content.email_options.name}
            controlType={_content.email_options.control_type}
            label={_content.email_options.label}
            input={_content.email_options.input}
          />
        </Form>
      </div>

      <figure>
        <Image
          src={getCdnUrl({ path: _content.image })}
          width={1080}
          height={1080}
          loading="lazy"
          alt="Bounthub Connect"
        />
      </figure>
    </>
  );
}
