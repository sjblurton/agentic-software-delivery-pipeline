import type { Preview } from "@storybook/nextjs";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    a11y: {
      test: "error",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    docs: {
      container: ({ children, context }) => {
        return (
          <div
            className="dark"
            style={{ background: "#0a0a0a", minHeight: "100vh" }}
          >
            {children}
          </div>
        );
      },
    },
  },
  decorators: [
    (Story) => {
      // Force dark mode for all stories
      return (
        <div className="dark">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
