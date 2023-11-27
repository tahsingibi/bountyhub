"use client";
import { useState, useEffect } from "react";
import styles from "./profile.module.scss";
import PropTypes from "prop-types";

import Heading from "@/components/core/heading/heading";
import Avatar from "@/components/avatar/avatar";
import Message from "@/components/core/message/message";
import renderClass from "@/utils/renderClass";
import UserActions from "@/services/userServices/userServices";

const _content = {
  title: "Avatar",
  description: "You can choose one of our existing avatars or upload your own.",
};

export default function AvatarSection({ user = null }) {
  const [resultMessage, setResultMessage] = useState(null);
  const { userUpdate } = UserActions();

  useEffect(() => {
    if (resultMessage?.success) setTimeout(() => setResultMessage(null), 10000);
  }, [resultMessage]);

  return (
    <div className={styles.avatarSection}>
      <div className={styles.heading}>
        <Heading size="small" text={_content.title} />
      </div>
      <div className={styles.avatar}>
        <Avatar
          size="large"
          avatar={user?.avatar}
          username={user?.username}
          update={{ setMessage: setResultMessage, callback: userUpdate }}
          description={_content.description}
          border
          icon
          message={resultMessage}
        />
      </div>
    </div>
  );
}

AvatarSection.propTypes = {
  user: PropTypes.object,
};
