"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UseStorage from "@/utils/useStorage";
import MembershipActions from "@/services/membershipServices/membershipServices";
import UserActions from "@/services/userServices/userServices";
import Splash from "@/components/splash/splash";

export default function DisconnectView() {
  const { clear } = UseStorage();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const { clearMembership } = MembershipActions();
  const { disconnectUser } = UserActions();

  const redirect = searchParams.get("redirect") || null;

  useEffect(() => {
    async function disconnect() {
      disconnectUser();
      clear();
      clearMembership();

      replace(redirect || "/");
    }

    disconnect();
  }, []);

  return <Splash isView />;
}
