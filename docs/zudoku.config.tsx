import { zuploMonetizationPlugin } from "@zuplo/zudoku-plugin-monetization";
import type { ZudokuConfig } from "zudoku";
import { ConnectPage } from "./src/ConnectPage";

/**
 * Developer Portal Configuration
 * For more information, see:
 * https://zuplo.com/docs/dev-portal/zudoku/configuration/overview
 */

// Clerk uses separate publishable keys per instance (live vs. development),
// and live keys only work on their configured production domain. Production
// gets the pk_live_ key; Preview and Working Copy get a pk_test_ key from a
// Clerk development instance so sign-in works on *.zuplo.site / *.zuplo.dev
// preview URLs. Configure ZUDOKU_PUBLIC_CLERK_PUB_KEY per environment in
// Project Settings → Environment Variables.
const clerkPubKey = import.meta.env.ZUDOKU_PUBLIC_CLERK_PUB_KEY;

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
    clerkPubKey,
    jwtTemplateName: "dev-portal",
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
