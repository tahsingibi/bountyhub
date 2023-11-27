import { AppIcons } from "../icon/icon";
import Input from "./input";
/**
 * All inputs throughout the application should be generated from this component.
 */
export default {
  title: "Core/Input",
  component: Input,
  tags: ["autodocs"],

  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/rkbHBYZo2EGt0yZCLcXFat/BountyHub?type=design&node-id=238-53&mode=design&t=Afw5LDLFJQn6bZ8C-4",
    },
  },

  argTypes: {
    placeholder: "Enter your key",
    icon: {
      type: "select",
      options: AppIcons,
      default: null,
    },
    size: "default",
    isRealtimeValidation: false,
    realtimeValidationStatus: false,
  },
};

export const Default = {
  args: {
    placeholder: "Enter your key",
    icon: null,
    size: "default",
    isRealtimeValidation: false,
    realtimeValidationStatus: false,
  },
};

export const Large = {
  args: {
    placeholder: "Enter your key",
    icon: null,
    size: "large",
    isRealtimeValidation: false,
    realtimeValidationStatus: false,
  },
};
