import Selectbox from "./selectbox";
import { AppIcons } from "../icon/icon";

export default {
  title: "Core/Selectbox",
  component: Selectbox,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/rkbHBYZo2EGt0yZCLcXFat/BountyHub?type=design&node-id=276-718&mode=design&t=NqfoW9E0iazaaouH-4",
    },
  },

  argTypes: {
    icon: {
      type: "select",
      default: null,
      options: AppIcons,
    },
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
  },
};

export const Default = {
  args: {
    placeholder: "Select your option",
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
    ],
  },
};
