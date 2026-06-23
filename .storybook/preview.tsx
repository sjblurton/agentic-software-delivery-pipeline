import type { Preview } from "@storybook/nextjs";
import { themes } from "storybook/theming";
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
      theme: themes.dark,
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
