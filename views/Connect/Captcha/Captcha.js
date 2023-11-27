"use client";
import React from "react";
import Image from "next/image";
import getCdnUrl from "@/utils/getCdnUrl";
import styles from "../connect.module.scss";
import Logo from "@/components/core/logo/logo";
import Heading from "@/components/core/heading/heading";
import Text from "@/components/core/text/text";
import MembershipActions from "@/services/membershipServices/membershipServices";
import Captcha from "@/components/core/captcha/captcha";

const _content = {
  heading: "Help us make sure it's you",
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan, ex vel suscipit vehicula, ligula tortor suscipit.`,
  image: "app/images/connect/captcha.png",
};

export default function CaptchaView() {
  const { connectCaptcha } = MembershipActions();

  return (
    <>
      <div id="connectContainer" className={styles.content}>
        <Logo />
        <div className={styles.heading}>
          <Heading text={_content.heading} size="large" />
          <Text>{_content.description}</Text>
        </div>
        <Captcha
          isShowLegalText
          onChange={connectCaptcha}
          onExpired={connectCaptcha}
          theme="dark"
        />
      </div>

      <figure>
        <Image
          src={getCdnUrl({ path: _content.image })}
          width={1080}
          height={1080}
          alt="Bounthub Connect"
          priority
        />
      </figure>
    </>
  );
}
