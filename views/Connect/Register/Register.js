"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import getCdnUrl from "@/utils/getCdnUrl";
import styles from "../connect.module.scss";
import Logo from "@/components/core/logo/logo";
import Heading from "@/components/core/heading/heading";
import Text from "@/components/core/text/text";
import Form from "@/components/core/form/form";
import { useSelector } from "react-redux";
import MembershipActions from "@/services/membershipServices/membershipServices";
import Message from "@/components/core/message/message";

const _content = {
  heading: "Tell us a bit about yourself",
  description: `Help us customize your Bountyhub experience.`,
  image: "app/images/connect/register.png",
  form: {
    name: "connect/register",
    button: {
      text: `I'm ready to start!`,
    },
    username: {
      name: "username",
      label: "Username",
      placeholder: "example",
      control_type: "username",
      delay: 200,
    },
    email: {
      name: "email",
      label: "Email",
      placeholder: "example@mail.com",
      control_type: "email",
    },
    additional: {
      name: "additionalData~What is your main objective?",
      label: "What is your main objective?",
      placeholder: "Select your option",
      values: [
        {
          label: "Option 1",
          value: "1",
        },
        {
          label: "Option 2",
          value: "2",
        },
        {
          label: "Option 3",
          value: "3",
        },
      ],
    },
  },
};

export default function RegisterView() {
  const { email, username, additional, connectMessage } = useSelector(
    (state) => state.membership.membership
  );

  const [isVisibleEmailInput, setIsVisibleEmailInput] = useState(false);

  useEffect(() => {
    if (!email || connectMessage) setIsVisibleEmailInput(true);
  }, [email, connectMessage]);

  const { connectRegister } = MembershipActions();

  const submitRegister = async (val) => await connectRegister(val);

  return (
    <>
      <div id="connectContainer" className={styles.content}>
        <Logo />
        <div className={styles.heading}>
          <Heading text={_content.heading} size="large" />
          <Text>{_content.description}</Text>
        </div>
        <Form
          name={_content.form.name}
          isPristineControl
          initialValues={{
            email,
            username,
            [_content.form.additional.name]: additional,
          }}
          buttons={{
            primary: { ..._content.form.button },
          }}
          onSubmit={submitRegister}
        >
          <>
            {connectMessage && <Message text={connectMessage} />}
            <Form.Field
              controlType={_content.form.username.control_type}
              initialValue={username}
              input={{
                placeholder: _content.form.username.placeholder,
              }}
              isRealtimeValidation
              processing
              delay={_content.form.username.delay}
              label={{
                text: _content.form.username.label,
              }}
              name={_content.form.username.name}
            />
            {isVisibleEmailInput && (
              <Form.Field
                controlType={_content.form.email.control_type}
                initialValue={email}
                input={{
                  placeholder: _content.form.email.placeholder,
                }}
                isRealtimeValidation
                label={{
                  text: _content.form.email.label,
                }}
                name={_content.form.email.name}
              />
            )}
            <Form.Field
              name={_content.form.additional.name}
              label={{
                text: _content.form.additional.label,
              }}
              required={false}
              selectbox={{
                placeholder: _content.form.additional.placeholder,
                values: _content.form.additional.values,
              }}
            />
          </>
        </Form>
      </div>

      <figure>
        <Image
          src={getCdnUrl({ path: _content.image })}
          width={1080}
          height={1080}
          alt="Bounthub Register"
          priority
        />
      </figure>
    </>
  );
}
