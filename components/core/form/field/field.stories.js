import Form from "../form";
import Field from "./field";
import StoreProvider from "../../../../stores/StoreProvider";
import { controllers } from "../../../../utils/controlTypes";

export default {
  title: "Core/Form/Form.Field",
  component: Field,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StoreProvider>
        <Form>
          <Story />
        </Form>
      </StoreProvider>
    ),
  ],

  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/rkbHBYZo2EGt0yZCLcXFat/BountyHub?type=design&node-id=238-89&mode=design&t=9bVjRVOmYzwUH6hx-4",
    },
  },

  argTypes: {
    name: "email",
    label: { text: "Email address" },
    input: { placeholder: "example@mail.com" },
    isRealtimeValidation: true,
    controlType: {
      type: "select",
      default: "email",
      options: controllers,
    },
  },
};

export const Default = {
  args: {
    name: "email",
    required: true,
    label: { text: "Email address" },
    input: { placeholder: "example@mail.com" },
    controlType: "email",
    isRealtimeValidation: true,
  },
};
