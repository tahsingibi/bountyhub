import Form from "./form";
import StoreProvider from "../../../stores/StoreProvider";

export default {
  title: "Core/Form",
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
    name: "StorybookFormExample",
    buttons: {
      primary: { text: "Connect with email adress", isDisabled: true },
    },
    onSubmit: (value) => alert(JSON.stringify(value, null, 2)),
  },
};

export const Default = {
  args: {
    name: "StorybookFormExample",
    initialValues: {},
    isPristineControl: true,
    buttons: {
      primary: { text: "Connect with email adress", isDisabled: true },
    },
    onSubmit: (value) => alert(JSON.stringify(value, null, 2)),
    children: (
      <Form.Field
        name="email"
        isRealtimeValidation
        controlType="email"
        label={{ text: "Email address" }}
        input={{ placeholder: "example@mail.com" }}
      />
    ),
  },
};
