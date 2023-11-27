"use client";
import React from "react";
import { usePathname } from "next/navigation";
import styles from "./header.module.scss";
import Logo from "../core/logo/logo";
import Link from "next/link";
import HeaderRight from "./headerRight";
import UserActions from "@/services/userServices/userServices";
import headerView from "@/utils/headerView";
import PageRedirect from "@/utils/redirect";

const _page = PageRedirect("static");

function AppNav() {
  return (
    <nav className={styles.static}>
      {_page.map(({ id, name, route }) => (
        <Link href={route} key={id}>
          {name}
        </Link>
      ))}
    </nav>
  );
}

function HeaderLeft() {
  return (
    <div className={styles.left}>
      <div className={styles.left}>
        <Logo />
        <AppNav />
      </div>
    </div>
  );
}

export default function Header() {
  const { getLoggedUser } = UserActions();
  const user = getLoggedUser();
  const path = usePathname();
  const isView = headerView(path);

  if (!isView) return null;

  return (
    <header className={styles.header}>
      <HeaderLeft />
      <HeaderRight user={user} />
    </header>
  );
}

Header.Left = HeaderLeft;
Header.Nav = AppNav;
Header.Right = HeaderRight;
