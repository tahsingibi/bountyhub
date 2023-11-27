"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import getCdnUrl from "@/utils/getCdnUrl";
import styles from "../connect.module.scss";
import Logo from "@/components/core/logo/logo";
import MembershipActions from "@/services/membershipServices/membershipServices";
import VerifyCode from "@/components/verifycode/verifyCode";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import whitelistEmail from "@/utils/whitelistEmail";
import redirectPage from "@/utils/redirect";

const _content = {
  title: "Verify your account",
  description: `We've sent a code to <b>{email}</b>. Please check your email inbox to verify your account and enter the 4-digit verification code.`,
  image: "app/images/connect/verify.png",
  resend: `Can't find your code? Check the spam folder or {resend} it.`,
  buttons: {
    link: {
      text: "Cancel and back to connect",
    },
    primary: {
      text: "Verify my account",
    },
    secondary: {
      icon: "mail",
      text: "Open {mail}",
    },
  },
};

export default function CaptchaView() {
  const { connectVerify } = MembershipActions();
  const { email } = useSelector((state) => state.membership.membership);
  const { replace } = useRouter();

  useEffect(() => {
    window.onpopstate = function (e) {
      window.history.pushState(null, null, window.location.href);
    };
  }, []);

  const pageDescription = _content.description.replace("{email}", email);

  const inWhitelist = whitelistEmail(email);

  const openMailOnClick = () =>
    inWhitelist ? window.open(inWhitelist?.url, "_blank") : null;

  const openMailText = _content.buttons.secondary.text.replace(
    "{mail}",
    inWhitelist?.name
  );

  async function handleSubmit(value) {
    await connectVerify(value);
  }

  async function handleCancel() {
    const redirect = async () => replace(redirectPage("connect"));

    await redirect();
  }

  return (
    <>
      <div id="connectContainer" className={styles.content}>
        <Logo />

        <VerifyCode
          buttons={{
            primary: { ..._content.buttons.primary },
            ...(inWhitelist && {
              secondary: {
                ..._content.buttons.secondary,
                text: openMailText,
                onClick: openMailOnClick,
              },
            }),

            link: {
              ..._content.buttons.link,
              onClick: handleCancel,
            },
          }}
          description={pageDescription}
          onSubmit={handleSubmit}
          resend={_content.resend}
          title={_content.title}
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
