"use client";
import React, { useState } from "react";
import styles from "./createcommunity.module.scss";
import Image from "next/image";
import getCdnUrl from "@/utils/getCdnUrl";
import Logo from "@/components/core/logo/logo";
import Heading from "@/components/core/heading/heading";
import Text from "@/components/core/text/text";
import CreateCommunityForm from "./CreateCommunityForm";
import ReviewCard from "./ReviewCard";
import Button from "@/components/core/button/button";
import { useRouter } from "next/navigation";

const _content = {
  heading: "Let's create your community",
  description: `Our users like to know more about a community before they get involved. Please include any information they may need.`,
  image: "app/images/community/create@2x.png",

  success: {
    heading:
      "You're all set, all you need to do now is create your first quests",
    description: (
      <>
        Your community has been created. You&apos;re just a few steps away from
        going live by creating quests for your community.
        <br />
        <br />
        Don&apos;t forget that you can access the necessary information to
        change your settings from your community page before launching your
        community.
      </>
    ),
    button: "Continue to my community",
  },
};

export default function CreateCommunityView() {
  const [actionResult, setActionResult] = useState(null);
  const router = useRouter();

  const content = {
    heading: actionResult ? _content.success.heading : _content.heading,
    description: actionResult
      ? _content.success.description
      : _content.description,
  };

  function handleRedirect() {
    const redirectPath = "/" + actionResult?.data?.slug + "/settings";
    router.replace(redirectPath);
  }

  return (
    <div className={styles.createCommunity}>
      <div id="connectContainer" className={styles.content}>
        <Logo />
        <div className={styles.heading}>
          <Heading text={content.heading} size="large" />
          <Text>{content.description}</Text>
        </div>

        {!actionResult && (
          <CreateCommunityForm setActionResult={setActionResult} />
        )}
        {actionResult && (
          <Button text={_content.success.button} onClick={handleRedirect} />
        )}
      </div>

      <figure>
        <Image
          src={getCdnUrl({ path: _content.image })}
          width={1080}
          height={1080}
          alt="Bounthub Connect"
          priority
          quality={74}
        />
        <ReviewCard />
      </figure>
    </div>
  );
}
