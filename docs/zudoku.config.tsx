import { zuploMonetizationPlugin } from "@zuplo/zudoku-plugin-monetization";
import type { ZudokuConfig } from "zudoku";

/**
 * Developer Portal Configuration
 * For more information, see:
 * https://zuplo.com/docs/dev-portal/zudoku/configuration/overview
 */
const config: ZudokuConfig = {
  site: {
    title: "InvestAir Data",
    banner: {
      message: "InvestAir Data is in early access — free during the trial period.",
      color: "info",
      dismissible: true,
    },
  },
  metadata: {
    title: "InvestAir Data — ASX market intelligence for AI assistants",
    description:
      "Connect Claude, ChatGPT or Cursor to InvestAir's proprietary ASX data: cash runway, capital raises, substantial holders, announcements and peer analysis.",
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
      type: "link",
      to: "/api",
      label: "API Reference",
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
    // IMPORTANT: This is a demo Auth0 configuration.
    // Replace with your own identity provider before going to production.
    // https://zuplo.com/docs/dev-portal/zudoku/configuration/authentication
    type: "auth0",
    domain: "auth.zuplo.site",
    clientId: "f8I87rdsCRo4nU2FHf0fHVwA9P7xi7Ml",
    audience: "https://api.example.com/",
  },
  apiKeys: {
    enabled: true,
  },
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
