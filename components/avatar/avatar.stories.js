import Component from "./avatar";
import StoreProvider from "../../stores/StoreProvider";

export default {
  title: "Component/Avatar",
  component: Component,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoreProvider>
        <Story />
      </StoreProvider>
    ),
  ],
};

export const Default = {
  args: {
    avatar: null,
    username: "bountyhub",
    size: "default",
    onClick: null,
    update: null,
  },
};

export const Image = {
  args: {
    avatar: process.env.DEMO_AVATAR,
    username: "bountyhub",
    size: "default",
    onClick: null,
    update: null,
  },
};
