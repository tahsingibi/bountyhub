"use client";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "./ErrorBoundary";
import CommunityServices from "@/services/communityServices/communityServices";
import styles from "./layout.module.scss";

export default function CommunitiesLayout({ children }) {
  const { getCommunityInfo } = CommunityServices();

  useEffect(() => {
    const getCommunity = async () => await getCommunityInfo();

    getCommunity();
  }, []);

  return (
    <ErrorBoundary>
      <div className={styles.communities}>{children}</div>
    </ErrorBoundary>
  );
}

CommunitiesLayout.propTypes = {
  children: PropTypes.node,
};
