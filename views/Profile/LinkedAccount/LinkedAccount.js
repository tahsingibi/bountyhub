"use client";
import React from "react";
import Heading from "@/components/core/heading/heading";
import Text from "@/components/core/text/text";
import styles from "./linkedaccount.module.scss";
import EmailUpdate from "./Email";
import UserActions from "@/services/userServices/userServices";
import DiscordUpdate from "./Discord";
import TwitterUpdate from "./Twitter";
import TelegramUpdate from "./Telegram";
import WalletUpdate from "./Wallet";

function PageHeading() {
  return (
    <div className={styles.pageheading}>
      <Heading size="large" text="Profile" />
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in magna
        sed purus efficitur lacinia. Integer vel sagittis leo. Aenean porta
        sollicitudin ligula, ac venenatis risus.
      </Text>
    </div>
  );
}

export default function LinkedAccount() {
  const { getLoggedUser } = UserActions();
  const user = getLoggedUser();

  return (
    <div className={styles.linkedAccount}>
      <PageHeading />
      <div className={styles.list}>
        <EmailUpdate user={user} />
        <DiscordUpdate user={user} />
        <TwitterUpdate user={user} />
        <TelegramUpdate user={user} />
        <WalletUpdate user={user} />
      </div>
    </div>
  );
}
