import { useState } from "react";
import { Head } from "zudoku/components";
import { useAuth } from "zudoku/hooks";
import { Callout } from "zudoku/ui/Callout";
import { Input } from "zudoku/ui/Input";
import { Label } from "zudoku/ui/Label";
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
  field: {
    display: "grid",
    gap: "0.5rem",
    maxWidth: "32rem",
    margin: "2rem 0",
  },
  codeBlock: {
    margin: "1rem 0 0",
  },
} as const;

export const ConnectPage = () => {
  const { isAuthenticated, isPending, profile, login } = useAuth();
  const [apiKey, setApiKey] = useState("");

  const hasKey = apiKey.trim().length > 0;
  const keyValue = hasKey ? apiKey.trim() : "YOUR_API_KEY";
  const headerValue = `Bearer ${keyValue}`;

  return (
    <section style={styles.page}>
      <Head>
        <title>Connect</title>
      </Head>

      <h1 style={styles.heading}>Connect to Investair Insights</h1>
      <p style={styles.lead}>
        Paste your subscription API key below, then follow the three steps to
        add Investair to Claude. No files to edit and nothing to install — it
        all happens in Claude&rsquo;s settings screen.
      </p>

      {isPending ? null : !isAuthenticated ? (
        <Callout type="info" title="Sign in first">
          <button type="button" onClick={() => login()}>
            Sign in
          </button>{" "}
          to subscribe to a plan and get your API key, or paste an existing key
          below.
        </Callout>
      ) : (
        <Callout
          type="tip"
          title={`Signed in as ${profile?.email ?? profile?.name ?? "you"}`}
        >
          Find your API key on the <a href="/subscriptions">Subscriptions</a>{" "}
          page, then paste it below.
        </Callout>
      )}

      <div style={styles.field}>
        <Label htmlFor="apiKey">Your API key</Label>
        <Input
          id="apiKey"
          type="password"
          placeholder="zpka_..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          autoComplete="off"
        />
      </div>

      {!hasKey && (
        <Callout type="caution" title="No key yet?">
          The values below use a placeholder until you paste your real key.
          Never share your API key or post it anywhere public.
        </Callout>
      )}

      <div style={styles.section}>
        <h2 style={styles.heading}>
          Step 1 &mdash; Add the Investair marketplace in Claude
        </h2>
        <p style={styles.paragraph}>
          This installs the Investair plugin, which provides the tools that use
          the connector you set up in the next two steps.
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
          paste this as the remote MCP server URL. Your key does <em>not</em> go
          in the URL.
        </p>
        <div style={styles.codeBlock}>
          <CodeTabs>
            <CodeTabPanel language="text" title="Server URL" code={MCP_URL} />
          </CodeTabs>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading}>Step 3 &mdash; Add your key as a header</h2>
        <ol style={styles.steps}>
          <li>
            Set <strong>Authentication</strong> to <strong>None</strong>.
          </li>
          <li>
            Open <strong>Request headers</strong> and add one header.
          </li>
          <li>
            Choose <strong>authorization</strong> as the header name, and paste
            this as the value:
            <div style={styles.codeBlock}>
              <CodeTabs>
                <CodeTabPanel
                  language="text"
                  title="Header value"
                  code={headerValue}
                />
              </CodeTabs>
            </div>
          </li>
          <li>
            Click <strong>Add</strong> to save the connector.
          </li>
        </ol>
      </div>

      <div style={styles.section}>
        <Callout type="tip" title="You're connected">
          The Investair tools now appear in Claude. Ask a question in plain
          English and Claude will pick the right tool automatically.
        </Callout>
      </div>

      <div style={styles.section}>
        <Callout type="caution" title="Adding this for a team?">
          A connector added under Organization settings uses{" "}
          <strong>one shared key for everyone</strong> in the organisation.
          Claude stores it securely and never shows it again, but usage is not
          separated per person. If each person needs their own key, have them
          add the marketplace and connector individually under their own{" "}
          <strong>Settings &rarr; Connectors</strong>.
        </Callout>
      </div>
    </section>
  );
};
