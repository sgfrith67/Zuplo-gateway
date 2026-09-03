import { zuploMonetizationPlugin } from "@zuplo/zudoku-plugin-monetization";
import type { ZudokuConfig } from "zudoku";
import { ConnectPage } from "./src/ConnectPage";

/**
 * Developer Portal Configuration
 * For more information, see:
 * https://zuplo.com/docs/dev-portal/zudoku/configuration/overview
 */
const config: ZudokuConfig = {
  site: {
    title: "Investair Insights",
    banner: {
      message: "Investair Insights is in early access — free during the trial period.",
      color: "info",
      dismissible: true,
    },
  },
  metadata: {
    title: "Investair Insights — ASX market intelligence for AI assistants",
    description:
      "Connect Claude, ChatGPT or Cursor to Investair's proprietary ASX data: cash runway, capital raises, substantial holders, announcements and peer analysis.",
  },
  navigation: [
    {
      type: "category",
      label: "Documentation",
      items: [
        {
          type: "category",
          label: "Getting Started",
          icon: "sparkles",
          collapsible: false,
          items: [
            {
              type: "doc",
              file: "introduction",
            },
          ],
        },
      ],
    },
    {
      type: "custom-page",
      path: "/connect",
      label: "Connect",
      icon: "plug",
      element: <ConnectPage />,
    },
  ],
  redirects: [{ from: "/", to: "/introduction" }],
  apis: [
    {
      type: "file",
      input: "../config/routes.oas.json",
      path: "api",
    },
  ],
  authentication: {
    type: "clerk",
    clerkPubKey: "pk_live_Y2xlcmsuaW52ZXN0YWlyLmNvbS5hdSQ",
  },
  apiKeys: {
    enabled: true,
  },
  protectedRoutes: ["/connect"],
  theme: {
    light: {
      primary: "#0b5c8a",
      primaryForeground: "#ffffff",
    },
    dark: {
      primary: "#3aa8dd",
      primaryForeground: "#04202f",
    },
  },
  plugins: [zuploMonetizationPlugin()],
};

export default config;
