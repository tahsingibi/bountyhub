"use client";

import { Fragment, useEffect } from "react";
import getToken from "@/utils/getToken";
import getScreenSize from "@/utils/getScreenSize";
import MembershipActions from "@/services/membershipServices/membershipServices";
import PropTypes from "prop-types";
import Splash from "../splash/splash";
import { useSelector } from "react-redux";
import AppActions from "@/services/appServices/appServices";
import Header from "../header/header";
import UserActions from "@/services/userServices/userServices";
import Modal from "../modal/modal";
import getSearchParams from "@/utils/getSearchParams";
import CommunityServices from "@/services/communityServices/communityServices";

export function AuthProvider({ children }) {
  const { connectOAuth } = MembershipActions();
  const { getLoggedUser, connectSocial } = UserActions();
  const { setReady } = AppActions();
  const { ready } = useSelector((state) => state.app.app);
  const { getCommunityCategory } = CommunityServices();

  const params = getSearchParams();

  useEffect(() => {
    getScreenSize();
    window.addEventListener("resize", getScreenSize);
    getToken();

    async function appStart() {
      await connectOAuth();
      await getLoggedUser();
      await connectSocial(params);
      await getCommunityCategory();
      setReady(true);
    }

    appStart();
  }, []);

  return (
    <Fragment>
      <Splash isView={!ready} />
      <Modal />
      <Header />
      {children}
    </Fragment>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
