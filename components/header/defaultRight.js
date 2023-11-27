"use client";
import React from "react";
import Button from "../core/button/button";
import { useRouter } from "next/navigation";
import redirectPage from "@/utils/redirect";
import PropTypes from "prop-types";

export default function DefaultRight({ user }) {
  const { push } = useRouter();
  const loginPage = redirectPage("connect");
  const createCommunity = redirectPage("createCommunity");

  if (!user?.username)
    return (
      <>
        <Button
          text="Create community"
          style="secondary"
          size="small"
          onClick={() => push(createCommunity)}
        />
        <Button text="Connect" size="small" onClick={() => push(loginPage)} />
      </>
    );
}

DefaultRight.propTypes = {
  user: PropTypes.object,
};
