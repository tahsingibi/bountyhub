"use client";
import { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./layout.module.scss";
import { useRouter } from "next/navigation";
import StickyMenu from "@/components/stickymenu/stickymenu";
import PageRedirect from "@/utils/redirect";
import UseStorage, { storages } from "@/utils/useStorage";

const _page = PageRedirect("profile");

export default function ProfilePageLayout({ children }) {
  const { userStorage } = storages;
  const { getItem } = UseStorage();
  const router = useRouter();
  const localUserInfo = getItem(userStorage);

  useEffect(() => {
    if (!localUserInfo) router.replace(PageRedirect("disconnect"));
  }, []);

  return (
    <div className={styles.layout}>
      <StickyMenu pages={_page} />
      <div className={styles.container}>{children}</div>
    </div>
  );
}

ProfilePageLayout.propTypes = {
  children: PropTypes.node,
};
