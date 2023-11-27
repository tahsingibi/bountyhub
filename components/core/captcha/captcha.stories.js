import Captcha from "./captcha";

export default {
  title: "Core/Captcha",
  component: Captcha,
  tags: ["autodocs"],

  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/rkbHBYZo2EGt0yZCLcXFat/BountyHub?type=design&node-id=300-2987&mode=design&t=eqLKwwc2YtNMSS9n-4",
    },
  },

  argTypes: {
    isShowLegalText: false,
    theme: "dark",
    onChange: (e) => console.log("onChange", e),
    onExpired: (e) => console.log("expired", e),
  },
};

export const Default = {
  args: {
    theme: "dark",
    isShowLegalText: false,
    onChange: (e) => console.log("onChange", e),
    onExpired: (e) => console.log("expired", e),
  },
};
