import { useState } from "react";
import { Head } from "zudoku/components";
import { useAuth } from "zudoku/hooks";
import { Callout } from "zudoku/ui/Callout";
import { Input } from "zudoku/ui/Input";
import { Label } from "zudoku/ui/Label";
import { CodeTabs, CodeTabPanel } from "zudoku/ui/CodeTabs";

// The production MCP Gateway endpoint. Update this if the custom domain
// or route path changes.
const MCP_URL =
  "https://investair-test-main-28c3f39.zuplo.app/mcp/prefect-v1";

const MARKETPLACE_REPO = "Investair-com-au/investair-claude-marketplace";

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
  const urlWithKey = hasKey
    ? `${MCP_URL}?apiKey=${encodeURIComponent(apiKey.trim())}`
    : `${MCP_URL}?apiKey=YOUR_API_KEY`;

  return (
    <section style={styles.page}>
      <Head>
        <title>Connect</title>
      </Head>

      <h1 style={styles.heading}>Connect to Investair Insights</h1>
      <p style={styles.lead}>
        Paste your subscription API key below to generate your personal
        connection URL, then follow the three steps to add Investair to Claude.
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
          The connection URL below uses a placeholder until you paste your real
          key. Never share your API key or commit it to a public repository.
        </Callout>
      )}

      <div style={styles.section}>
        <h2 style={styles.heading}>
          Step 1 &mdash; Add the Investair marketplace in Claude
        </h2>
        <p style={styles.paragraph}>
          This installs the Investair connector into your Claude client.
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
        </ol>
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading}>Step 2 &mdash; Copy your connection URL</h2>
        <p style={styles.paragraph}>
          This single string contains both the Investair endpoint and your API
          key. Copy it now &mdash; you&rsquo;ll paste it in the last step.
        </p>
        <div style={styles.codeBlock}>
          <CodeTabs>
            <CodeTabPanel
              language="text"
              title="Connection URL"
              code={urlWithKey}
            />
          </CodeTabs>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading}>
          Step 3 &mdash; Open the connector and paste your URL
        </h2>
        <ol style={styles.steps}>
          <li>
            Go to the <strong>Connectors</strong> menu.
          </li>
          <li>
            Open the <strong>Investair_data</strong> connector.
          </li>
          <li>Paste the connection URL you copied in Step 2.</li>
        </ol>
      </div>

      <div style={styles.section}>
        <Callout type="tip" title="You're connected">
          The Investair tools now appear in Claude. Ask a question in plain
          English and Claude will pick the right tool automatically.
        </Callout>
      </div>
    </section>
  );
};
