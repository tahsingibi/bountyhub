import Label from "./label";

export default {
  title: "Core/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/rkbHBYZo2EGt0yZCLcXFat/BountyHub?type=design&node-id=233-33&mode=design&t=jG2Gs1iEzpWPxqpL-4",
    },
  },
  argTypes: {
    text: "Label text",
    isOptional: false,
  },
};

export const Default = {
  args: {
    text: "Label text",
    isOptional: false,
  },
};
