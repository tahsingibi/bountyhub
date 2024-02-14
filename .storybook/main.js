const config = {
  stories: [
    "../components/**/*.stories.@(js|jsx)",
    "../components/**/*.mdx",
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-designs",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        sass: {
          implementation: require("sass"),
        },
        postCss: {
          implementation: require.resolve("postcss"),
        },
      },
    },
    "@storybook/addon-mdx-gfm",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  env: (config) => ({
    ...config,
    CDN_STATIC: process.env.CDN_STATIC_URL,
    CDN_UPLOAD: process.env.CDN_UPLOAD_URL,
    CAPTCHA_KEY: process.env.RECAPTCHA_KEY,
    DEMO_AVATAR: process.env.DEMO_AVATAR,
  }),
};
export default config;
