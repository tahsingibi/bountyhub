import "../styles/themes/default.scss";

const preview = {
  parameters: {
    layout: "centered",
    type: "default",
    actions: { argTypesRegex: "^on[A-Z].*" },
    nextjs: {
      appDirectory: true,
    },
    options: {
      storySort: {
        order: ["Design System", "Core"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "Default",
      values: [
        {
          name: "Default",
          value: "black",
        },
      ],
    },
    reactLive: {},
  },
};

export default preview;
