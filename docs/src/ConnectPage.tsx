import { Head } from "zudoku/components";
import { useAuth } from "zudoku/hooks";
import { Callout } from "zudoku/ui/Callout";
import { CodeTabs, CodeTabPanel } from "zudoku/ui/CodeTabs";

// The production MCP Gateway endpoint. Update this if the custom domain
// or route path changes.
const MCP_URL = "https://mcp.investair.com.au/mcp/prefect-v1";

const MARKETPLACE_REPO = "Investair-com-au/investair-claude-marketplace";

// The connector name the Investair plugin expects. Must match exactly.
const CONNECTOR_NAME = "Investair_data";

const styles = {
  page: {
    maxWidth: "48rem",
    lineHeight: 1.7,
  },
  lead: {
    fontSize: "1.05rem",
    lineHeight: 1.75,
    margin: "0 0 2rem",
  },
  section: {
    margin: "3rem 0 0",
  },
  heading: {
    margin: "0 0 0.75rem",
  },
  paragraph: {
    margin: "0 0 1.25rem",
    lineHeight: 1.75,
  },
  steps: {
    display: "grid",
    gap: "1.25rem",
    margin: "0",
    paddingLeft: "1.25rem",
    lineHeight: 1.75,
  },
  codeBlock: {
    margin: "1rem 0 0",
  },
} as const;

export const ConnectPage = () => {
  const { isAuthenticated, isPending, profile, login } = useAuth();

  return (
    <section style={styles.page}>
      <Head>
        <title>Connect</title>
      </Head>

      <h1 style={styles.heading}>Connect to Investair Insights</h1>
      <p style={styles.lead}>
        Follow the steps below to add Investair to Claude. No files to edit
        and nothing to install — it all happens in Claude&rsquo;s settings
        screen.
      </p>

      {isPending ? null : !isAuthenticated ? (
        <Callout type="info" title="Sign in first">
          <button type="button" onClick={() => login()}>
            Sign in
          </button>{" "}
          to get started.
        </Callout>
      ) : (
        <Callout
          type="tip"
          title={`Signed in as ${profile?.email ?? profile?.name ?? "you"}`}
        >
          Follow the steps below to connect Claude to Investair Insights.
        </Callout>
      )}

      <div style={styles.section}>
        <h2 style={styles.heading}>
          Step 1 &mdash; Add the Investair marketplace in Claude
        </h2>
        <p style={styles.paragraph}>
          This installs the Investair plugin, which provides the tools that use
          the connector you set up in the next step.
        </p>
        <ol style={styles.steps}>
          <li>
            In Claude, open <strong>Settings &rarr; Plugins</strong>.
          </li>
          <li>
            Click <strong>Add a marketplace</strong>, then choose{" "}
            <strong>Add from a repository</strong>.
          </li>
          <li>
            Enter this repository:
            <div style={styles.codeBlock}>
              <CodeTabs>
                <CodeTabPanel
                  language="text"
                  title="Repository"
                  code={MARKETPLACE_REPO}
                />
              </CodeTabs>
            </div>
          </li>
          <li>
            Leave <strong>Sync</strong> enabled, then click{" "}
            <strong>Sync</strong>.
          </li>
          <li>
            Install the <strong>Investair</strong> plugin from the marketplace
            listing.
          </li>
        </ol>
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading}>Step 2 &mdash; Paste the server URL</h2>
        <p style={styles.paragraph}>
          Open <strong>Settings &rarr; Connectors</strong> and click{" "}
          <strong>Add custom connector</strong>. Name it exactly{" "}
          <strong>{CONNECTOR_NAME}</strong> so the plugin can find it, then
          paste this as the remote MCP server URL.
        </p>
        <div style={styles.codeBlock}>
          <CodeTabs>
            <CodeTabPanel language="text" title="Server URL" code={MCP_URL} />
          </CodeTabs>
        </div>
        <p style={styles.paragraph}>
          Once you&rsquo;ve pasted the URL, click through and leave the default
          settings for <strong>Authentication</strong> and{" "}
          <strong>OAuth Client</strong>, then click <strong>Add</strong>.
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading}>
          Step 3 &mdash; Check the connector is ready
        </h2>
        <p style={styles.paragraph}>
          Go back to the <strong>Connectors</strong> menu and open the{" "}
          <strong>{CONNECTOR_NAME}</strong> connector. Confirm that it shows as{" "}
          <strong>Connected</strong>, that its tools are listed, and that they
          are set to <strong>Always Allow</strong>.
        </p>
      </div>

      <div style={styles.section}>
        <Callout type="tip" title="You're connected">
          The Investair tools now appear in Claude. Try asking Claude a
          question about an ASX small-cap stock and watch it pull real data
          from Investair.
        </Callout>
      </div>

      <div style={styles.section}>
        <Callout type="caution" title="Adding this for a team?">
          A connector added under Organization settings uses{" "}
          <strong>one shared connection for everyone</strong> in the
          organisation. If each person needs their own access, have them add
          the marketplace and connector individually under their own{" "}
          <strong>Settings &rarr; Connectors</strong>.
        </Callout>
      </div>
    </section>
  );
};
