"use client";
import React from "react";
import styles from "../communities.module.scss";
import Heading from "@/components/core/heading/heading";
import Text from "@/components/core/text/text";
import SettingsForm from "./SettingsForm";
import ResultMessage from "./ResultMessage";

const _content = {
  heading: "General informations",
  description:
    "Duis ac sem in ex molestie vulputate at vel lacus. Aenean porttitor mauris et diam lacinia, id accumsan ex convallis. Sed tristique ornare lacus a luctus.",
};

export default function CommunitySettingsView() {
  return (
    <div>
      <div className={styles.heading}>
        <Heading text={_content.heading} size="large" />
        <Text>{_content.description}</Text>
      </div>

      <ResultMessage />
      <SettingsForm />
    </div>
  );
}
