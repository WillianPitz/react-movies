import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    video: false,
    screenshotOnRunFailure: false,
    specPattern: "**/*{test,spec}.{ts,tsx}",
    fileServerFolder: "src",
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
