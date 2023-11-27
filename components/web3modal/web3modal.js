"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { mainnet } from "viem/chains";
import getCdnUrl from "@/utils/getCdnUrl";
import PropTypes from "prop-types";

const projectId = process.env.WALLETCONNECT_ID;

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: process.env.APP_ADDRESS,
  icons: [getCdnUrl({ type: "upload", path: process.env.DEMO_AVATAR })],
};

const chains = [mainnet];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export function Web3Modal({ children }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}

Web3Modal.propTypes = {
  children: PropTypes.node,
};
