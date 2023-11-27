"use client";
import React from "react";
import { useSelector } from "react-redux";
import Heading from "@/components/core/heading/heading";

export default function CommunitiesView() {
  const state = useSelector(
    (state) => state.community.community.singleCommunity?.community
  );

  return (
    <div>
      <Heading text={"Community: " + state?.title} />
    </div>
  );
}
