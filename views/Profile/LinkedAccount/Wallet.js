"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./linkedaccount.module.scss";
import SingleForm from "@/components/core/singleform/singleform";
import UserActions from "@/services/userServices/userServices";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useSignMessage, useDisconnect } from "wagmi";
import { useSelector } from "react-redux";
import getMessage from "@/utils/getMessage";
import Message from "@/components/core/message/message";

const _content = {
  name: "userWalletUpdate",
  field: {
    name: "web3Wallet",
    icon: "wallet",
    placeholder: "Connect your Wallet",
  },
  label: "Web3 Wallet",
  description:
    "Aenean porttitor mauris et diam lacinia, id accumsan ex convallis. ",
  button: {
    disabled: true,
    style: "secondary",
  },
  signMessage: process.env.SIGN_MESSAGE,
};

export default function WalletUpdate({ user }) {
  const { web3Wallet, username } = user;
  const isWalletConnected = !!web3Wallet && !!username;

  const { connectState } = useSelector((state) => state.user.user);
  const isWalletState = connectState?.type == "web3-wallet";
  const connectStateMessage = isWalletState ? connectState : null;

  const isLoading = isWalletState && !connectState?.message;

  const { connectWallet, disconnectSocial, setConnectState } = UserActions();

  const [signWaitingMessage, setSignWaitingMessage] = useState();

  const { open: web3ModalOpen } = useWeb3Modal();
  const { isConnected: web3IsConnected, address: web3walletID } = useAccount();
  const { disconnect: web3Disconnect } = useDisconnect();

  const {
    data: signID,
    isError: signIsError,
    isSuccess: signIsSuccess,
    isLoading: signIsLoading,
    signMessage: web3SignMessage,
  } = useSignMessage({
    message: _content.signMessage,
  });

  useEffect(() => {
    setSignWaitingMessage(signIsLoading ? getMessage("F002") : null);
  }, [signIsLoading]);

  useEffect(() => {
    if (!isWalletConnected && web3IsConnected && web3walletID)
      web3SignMessage();
  }, [isWalletConnected, web3IsConnected]);

  useEffect(() => {
    if (signIsError) web3Disconnect();
  }, [signIsError]);

  useEffect(() => {
    async function connectSignMessage() {
      if (!isWalletConnected && signID && signIsSuccess && web3walletID) {
        await connectWallet(signID, () => {
          web3Disconnect();
        });
      }
    }

    connectSignMessage();
  }, [signID, isWalletConnected]);

  async function handleConnect() {
    if (!isWalletConnected) return web3ModalOpen();
    await disconnectSocial("web3-wallet", () => {
      web3Disconnect();
    });
  }

  if (user?.username)
    return (
      <div className={styles.item} key={web3Wallet}>
        <SingleForm
          name={_content.name}
          fieldName={_content.field.name}
          label={_content.label}
          description={_content.description}
          initialValues={{ [_content.field.name]: web3Wallet }}
          onSubmit={handleConnect}
          icon={_content.field.icon}
          placeholder={web3Wallet || _content.field.placeholder}
          isReadOnly
          isPristineControl={false}
          resultMessage={connectStateMessage}
          setResultMessage={setConnectState}
          button={{
            text: isWalletConnected ? "Disconnect" : "Connect",
            disabled: _content.button.disabled,
            style: _content.button.style,
            isLoading: isLoading || signIsLoading,
          }}
        />
        <Message style="info" text={signWaitingMessage} />
      </div>
    );
}

WalletUpdate.propTypes = {
  user: PropTypes.object,
};
