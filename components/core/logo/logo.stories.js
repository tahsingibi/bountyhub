import LogoComponent from "./logo";

export default {
  title: "Core/Logo",
  component: LogoComponent,
  tags: ["autodocs"],

  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/rkbHBYZo2EGt0yZCLcXFat/BountyHub?type=design&node-id=202-157&mode=design&t=Afw5LDLFJQn6bZ8C-4",
    },
  },

  argTypes: {
    type: "logo",
  },
};

export const Logo = {
  args: {
    type: "logo",
  },
};

export const Icon = {
  args: {
    type: "icon",
  },
};
