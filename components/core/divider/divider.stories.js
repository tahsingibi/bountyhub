import Divider from "./divider";

export default {
  title: "Core/Divider",
  component: Divider,
  tags: ["autodocs"],

  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/rkbHBYZo2EGt0yZCLcXFat/BountyHub?type=design&node-id=233-49&mode=design&t=jG2Gs1iEzpWPxqpL-4",
    },
  },

  argTypes: {
    text: "Or",
  },
};

export const Default = {
  args: {
    text: "or",
  },
};
