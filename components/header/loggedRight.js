import React from "react";
import { useRouter } from "next/navigation";
import Button from "../core/button/button";
import Avatar from "../avatar/avatar";
import redirectPage from "@/utils/redirect";
import PropTypes from "prop-types";

export default function LoggedRight({ user }) {
  const { push } = useRouter();

  const profilePage = redirectPage("profile")[0]?.path;
  const createCommunity = redirectPage("createCommunity");

  if (user?.username)
    return (
      <>
        <Button
          style="secondary"
          text="Create"
          size="small"
          icon="newtab"
          onClick={() => push(createCommunity)}
        />
        <Button style="secondary" size="small" icon="heart" iconOnly />
        <Button style="secondary" size="small" icon="notification" iconOnly />
        <Avatar
          avatar={user?.avatar}
          username={user?.username}
          onClick={() => push(profilePage)}
        />
      </>
    );
}

LoggedRight.propTypes = {
  user: PropTypes.object,
};
