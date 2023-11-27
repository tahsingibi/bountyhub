import Script from "next/script";
import { AuthProvider } from "@/components/auth/AuthProvider";
import StoreProvider from "@/stores/StoreProvider";
import "@/styles/themes/default.scss";
import PropTypes from "prop-types";
import { Web3Modal } from "@/components/web3modal/web3modal";

export const metadata = {
  title: "Bountyhub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Web3Modal>
          <StoreProvider>
            <AuthProvider>{children}</AuthProvider>
          </StoreProvider>
        </Web3Modal>
      </body>
      <Script src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js" />
      <script
        async
        src="https://telegram.org/js/telegram-widget.js?22"
        data-telegram-login={process.env.TELEGRAM_BOT}
        data-size="large"
        data-userpic="false"
        data-auth-url={process.env.APP_ADDRESS}
        data-request-access="write"
      ></script>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
