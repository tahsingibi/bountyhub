import { AppIcons } from "../icon/icon";
import Button from "./button";
/**
 * All buttons throughout the application should be generated from this component.
 */
export default {
  title: "Core/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/rkbHBYZo2EGt0yZCLcXFat/BountyHub?type=design&node-id=233-67&mode=design&t=Afw5LDLFJQn6bZ8C-4",
    },
  },
  argTypes: {
    text: "Primary",
    style: "primary",
    icon: {
      type: "select",
      options: AppIcons,
      description: `You can choose the icons to be displayed on the buttons from here. If you don't want to display an icon, you just need to omit sending the 'icon' prop when using the component.`,
      default: null,
    },
    isLoading: false,
    isDisabled: false,
  },
};

export const Default = {
  args: {
    text: "Primary",
    style: "primary",
    icon: null,
    isLoading: false,
    isDisabled: false,
  },
};

export const Secondary = {
  args: {
    text: "Secondary",
    style: "secondary",
    icon: null,
    isLoading: false,
    isDisabled: false,
  },
};

export const Link = {
  args: {
    text: "Link",
    icon: null,
    style: "link",
    isLoading: false,
    isDisabled: false,
  },
};
