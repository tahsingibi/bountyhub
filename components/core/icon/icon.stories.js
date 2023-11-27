import Icon, { AppIcons } from "./icon";

export default {
  title: "Core /Icon",
  component: Icon,
  tags: ["autodocs"],

  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/rkbHBYZo2EGt0yZCLcXFat/BountyHub?type=design&node-id=233-15&mode=design&t=Afw5LDLFJQn6bZ8C-4",
    },
  },

  argTypes: {
    type: {
      type: "select",
      default: "placeholder",
      options: AppIcons,
    },
  },
};

export const Default = {
  type: "select",
};
