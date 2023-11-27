/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    APP_CLIENT_ID: process.env.APP_CLIENT_ID,
    APP_CLIENT_SECRET: process.env.APP_CLIENT_SECRET,
    APP_GRANT_TYPE: process.env.APP_GRANT_TYPE,
    APP_SCOPE: process.env.APP_SCOPE,

    APP_ADDRESS: process.env.APP_ADDRESS,

    CORS_ORIGIN: process.env.CORS_ORIGIN,

    BE_API_URL: process.env.BE_API_URL,

    CDN_STATIC: process.env.CDN_STATIC_URL,
    CDN_UPLOAD: process.env.CDN_UPLOAD_URL,
    DEMO_AVATAR: process.env.DEMO_AVATAR,

    CAPTCHA_KEY: process.env.RECAPTCHA_KEY,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_ID: process.env.GOOGLE_SECRET_ID,

    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_SECRET_ID: process.env.DISCORD_SECRET_ID,

    TELEGRAM_BOT: process.env.TELEGRAM_BOT,
    TELEGRAM_BOT_ID: process.env.TELEGRAM_BOT_ID,

    APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID,

    WALLETCONNECT_ID: process.env.WALLETCONNECT_ID,
    SIGN_MESSAGE: process.env.SIGN_MESSAGE,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bountyhub-static.azureedge.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bountyhub-upload.azureedge.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bountyhub-upload-test.azureedge.net",
        port: "",
        pathname: "/**",
      },
    ],
  },

  swcMinify: false,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
