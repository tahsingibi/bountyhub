import Component from "./verifyCode";
import StoreProvider from "../../stores/StoreProvider";

/**
 * It is used in every field where the verification process of the application is carried out.
 */
export default {
  title: "Component/Verify Code",

  component: Component,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoreProvider>
        <Story />
      </StoreProvider>
    ),
  ],

  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/rkbHBYZo2EGt0yZCLcXFat/BountyHub?type=design&node-id=300-3726&mode=design&t=9bVjRVOmYzwUH6hx-4",
    },
  },

  argTypes: {
    title: "Verify your account",
    description: `We've sent a code to <b>lorem@ipsum.com</b>. Please check your email inbox to verify your account and enter the 4-digit verification code.`,
    resend: "Can't find your code? Check the spam folder or {resend} it",
    onSubmit: (val) => alert(`Verify Code: ${val}`),
    buttons: {
      primary: {
        text: "Verify my account",
      },
      secondary: {
        text: "Open mail",
        icon: "mail",
      },
      link: {
        text: "Cancel and back to connect",
      },
    },
  },
};

export const Default = {
  args: {
    title: "Verify your account",
    description: `We've sent a code to <b>lorem@ipsum.com</b>. Please check your email inbox to verify your account and enter the 4-digit verification code.`,
    resend: "Can't find your code? Check the spam folder or {resend} it.",
    onSubmit: (val) => alert(`Verify Code: ${val}`),
    buttons: {
      primary: {
        text: "Verify my account",
      },
      secondary: {
        text: "Open mail",
        icon: "mail",
      },
      link: {
        text: "Cancel and back to connect",
      },
    },
  },
};
