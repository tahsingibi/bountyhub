import Text, { validElements } from "./text";

export default {
  title: "Core/Text",
  component: Text,
  tags: ["autodocs"],

  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/rkbHBYZo2EGt0yZCLcXFat/BountyHub?type=design&node-id=210-891&mode=design&t=Afw5LDLFJQn6bZ8C-4",
    },
  },

  argTypes: {
    htmlElement: {
      type: "select",
      options: validElements,
      default: "p",
    },
    children: "Text Component",
    size: "default",
    weight: "regular",
  },
};

export const Default = {
  args: {
    htmlElement: "p",
    children: "Text Component",
    size: "default",
    weight: "regular",
  },
};

export const Small = {
  args: {
    htmlElement: "p",
    children: "Small Text Component",
    size: "small",
    weight: "regular",
  },
};
