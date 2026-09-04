import { zuploMonetizationPlugin } from "@zuplo/zudoku-plugin-monetization";
import type { ZudokuConfig, ZudokuPlugin } from "zudoku";
import { ConnectPage } from "./src/ConnectPage";

/**
 * Developer Portal Configuration
 * For more information, see:
 * https://zuplo.com/docs/dev-portal/zudoku/configuration/overview
 */

// TEMPORARY WORKAROUND: ZUDOKU_PUBLIC_CLERK_PUB_KEY (config var, targeted at
// production) is not being injected into the dev-portal build environment on
// this project — confirmed as a platform-side issue (raised with Zuplo
// support, ref build 8a747d98-3664-4093-95eb-9533fec491e5). The identical
// value works when hardcoded here, so we're doing that temporarily to unblock
// production. REVERT to `import.meta.env.ZUDOKU_PUBLIC_CLERK_PUB_KEY?.trim()`
// once support confirms the env var injection is fixed.
//
// NOTE: this is a Clerk *live* key, which Clerk restricts to the
// investair.com.au domain. Preview and working-copy portals served from
// *.zuplo.site will therefore fail to initialise Clerk ("Production Keys are
// only allowed for domain investair.com.au"). Authenticated pages such as
// Pricing and Connect can only be exercised on insights.investair.com.au.
const clerkPubKey = "pk_live_Y2xlcmsuaW52ZXN0YWlyLmNvbS5hdSQ";

// The monetization plugin adds a "Pricing" entry to the profile menu (the
// dropdown next to the signed-in user's name). Pricing already has its own tab
// in the main navigation, so strip that duplicate menu item out of the plugin
// while leaving all of its other behaviour untouched.
const withoutPricingProfileMenuItem = (plugin: ZudokuPlugin): ZudokuPlugin => {
  const getProfileMenuItems = (plugin as any).getProfileMenuItems;
  if (typeof getProfileMenuItems !== "function") {
    return plugin;
  }

  return {
    ...plugin,
    getProfileMenuItems: (...args: any[]) => {
      const items = getProfileMenuItems.apply(plugin, args) ?? [];
      return items.filter(
        (item: { label?: string }) =>
          item?.label?.trim().toLowerCase() !== "pricing",
      );
    },
  } as ZudokuPlugin;
};

const monetizationPlugins = [zuploMonetizationPlugin()]
  .flat()
  .map(withoutPricingProfileMenuItem);

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
    {
      type: "link",
      to: "/pricing",
      label: "Pricing",
      icon: "credit-card",
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
    enabled: false,
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
  plugins: monetizationPlugins,
};

export default config;
