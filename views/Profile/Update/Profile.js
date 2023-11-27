"use client";
import React from "react";
import Heading from "@/components/core/heading/heading";
import Text from "@/components/core/text/text";
import styles from "./profile.module.scss";

import UpdateUsername from "./UpdateUsername";
import AvatarSection from "./AvatarSection";

import UserActions from "@/services/userServices/userServices";

const _content = {
  title: "Profile",
  description:
    "Duis ac sem in ex molestie vulputate at vel lacus. Aenean porttitor mauris et diam lacinia, id accumsan ex convallis. Sed tristique ornare lacus a luctus.",
};

function PageHeading() {
  return (
    <div className={styles.pageheading}>
      <Heading size="large" text={_content.title} />
      <Text>{_content.description}</Text>
    </div>
  );
}

export default function ProfileView() {
  const { getLoggedUser } = UserActions();
  const user = getLoggedUser();
  return (
    <div className={styles.profile}>
      <PageHeading />
      <AvatarSection user={user} />
      <UpdateUsername user={user} />
    </div>
  );
}
