import Heading, { validSizes } from "./heading";

export default {
  title: "Core/Heading",
  component: Heading,
  tags: ["autodocs"],

  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/rkbHBYZo2EGt0yZCLcXFat/BountyHub?type=design&node-id=210-872&mode=design&t=Afw5LDLFJQn6bZ8C-4",
    },
  },

  argTypes: {
    text: "Heading ",
    size: {
      type: "select",
      options: validSizes,
      default: "default",
    },
  },
};

export const Default = {
  args: {
    text: "Heading Default Sizing",
    size: "default",
  },
};

export const Large = {
  args: {
    text: "Heading Large Sizing",
    size: "large",
  },
};

export const Small = {
  args: {
    text: "Heading Small Sizing",
    size: "small",
  },
};
