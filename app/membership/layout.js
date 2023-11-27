"use client";
import React, { useEffect } from "react";
import styles from "./layout.module.scss";
import { useSelector } from "react-redux";
import {
  useRouter,
  usePathname,
  useSelectedLayoutSegment,
} from "next/navigation";
import redirectPage from "@/utils/redirect";
import PropTypes from "prop-types";

export default function MembershipLayout({ children }) {
  const layout = useSelectedLayoutSegment();
  const { key } = useSelector((state) => state.membership.membership);
  const { replace } = useRouter();
  const path = usePathname();
  const connectPage = redirectPage("connect");

  useEffect(() => {
    if (!key && path != connectPage && layout == "connect")
      replace(connectPage);
  }, [key]);

  return <div className={styles.layout}>{children}</div>;
}

MembershipLayout.propTypes = {
  children: PropTypes.node,
};
