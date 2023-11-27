import Message from "./message";
/**
 * All messages throughout the application should be generated from this component.
 */
export default {
  title: "Core/Message",
  component: Message,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/rkbHBYZo2EGt0yZCLcXFat/BountyHub?type=design&node-id=233-58&mode=design&t=jG2Gs1iEzpWPxqpL-4",
    },
  },
  argTypes: {
    text: "Message Component",
    type: "default",
    style: "danger",
  },
};

export const Default = {
  args: {
    text: "Message Component",
    type: "default",
    style: "danger",
  },
};

export const Text = {
  args: {
    text: "Message Component",
    type: "text",
    style: "danger",
  },
};
