"use client";
import React, { memo } from "react";
import Message from "../../core/message/message";
import { useSelector } from "react-redux";

function ErrorMessage() {
  const { message } = useSelector((state) => state.verification.verification);
  if (!message) return null;

  return <Message style="danger" text={message} type="default" />;
}

export default memo(ErrorMessage);
