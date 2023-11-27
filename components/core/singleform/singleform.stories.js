import Form from "./singleform";
import StoreProvider from "../../../stores/StoreProvider";

export default {
  title: "Core/SingleForm",
  component: Form,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoreProvider>
        <Story />
      </StoreProvider>
    ),
  ],

  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/rkbHBYZo2EGt0yZCLcXFat/BountyHub?type=design&node-id=238-53&mode=design&t=9bVjRVOmYzwUH6hx-4",
    },
  },

  argTypes: {
    name: "SingleFormExample",
    fieldName: "email",
    onSubmit: (val) => alert(JSON.stringify(val)),
    controlType: "email",
    isPristineControl: true,
    isRealtimeValidation: true,
    processing: true,
    delay: 0,
    button: { text: "Update", style: "secondary" },
    label: "Email",
    description: "Please enter your email",
  },
};

export const Default = {
  args: {
    name: "SingleFormExample",
    fieldName: "email",
    onSubmit: (val) => alert(JSON.stringify(val)),
    controlType: "email",
    isPristineControl: true,
    isRealtimeValidation: true,
    processing: true,
    delay: 0,
    button: { text: "Update", style: "secondary" },
    label: "Email",
    description: "Please enter your email",
  },
};
