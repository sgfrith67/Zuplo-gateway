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

const COMMANDS: Array<[string, string]> = [
  ["/company-snapshot", "Quick company overview in chat"],
  [
    "/initiation-report",
    "Full company initiation report as an editable Word document",
  ],
  [
    "/sector-report",
    "Longer research report for a sector or company basket, as an editable Word document",
  ],
  ["/peer-cash-comparison", "Peer cash and enterprise value comparison table"],
  [
    "/peer-cash-runway",
    "Peer cash runway comparison and funding-timeline analysis",
  ],
  ["/investor-targeting", "Institutional holder-style investor targeting list"],
  [
    "/weekly-runway-screen",
    "Cash-runway and funding-risk screening / raise radar",
  ],
  ["/weekly-raises-digest", "Recent capital raisings digest"],
  ["/setup-scheduled-reports", "Set up the two built-in weekly Monday reports"],
];

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
  subSection: {
    margin: "2rem 0 0",
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
  bullets: {
    display: "grid",
    gap: "0.75rem",
    margin: "0",
    paddingLeft: "1.25rem",
    lineHeight: 1.75,
  },
  codeBlock: {
    margin: "1rem 0 0",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "1rem 0 0",
    fontSize: "0.95rem",
  },
  th: {
    textAlign: "left",
    padding: "0.6rem 0.75rem 0.6rem 0",
    borderBottom: "1px solid var(--border, #d4d4d8)",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "0.6rem 0.75rem 0.6rem 0",
    borderBottom: "1px solid var(--border, #e4e4e7)",
    verticalAlign: "top",
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
        Connect Claude or ChatGPT to Investair&rsquo;s ASX data. There&rsquo;s no
        API key to copy &mdash; you simply sign in with the account you
        registered here when your assistant asks.
      </p>

      {isPending ? null : !isAuthenticated ? (
        <Callout type="info" title="Sign in first">
          <button type="button" onClick={() => login()}>
            Sign in
          </button>{" "}
          and subscribe on the <a href="/pricing">Pricing</a> page before
          connecting. The trial is free &mdash; no credit card required.
        </Callout>
      ) : (
        <Callout
          type="tip"
          title={`Signed in as ${profile?.email ?? profile?.name ?? "you"}`}
        >
          Make sure you&rsquo;ve subscribed to a plan on the{" "}
          <a href="/pricing">Pricing</a> page, then follow the steps below.
        </Callout>
      )}

      <div style={styles.section}>
        <h2 style={styles.heading}>Claude</h2>
        <p style={styles.paragraph}>
          Install the Investair plugin &mdash; it adds ready-made{" "}
          <code>/commands</code> and works with scheduled reports.
        </p>
        <ol style={styles.steps}>
          <li>
            In Claude Desktop, open <strong>Plugins &rarr; Manage plugins</strong>.
          </li>
          <li>
            Click <strong>Add</strong>, then choose <strong>Add marketplace</strong>.
          </li>
          <li>
            Choose <strong>Add from a repository</strong>.
          </li>
          <li>
            Enter the repository below, leave <strong>Sync automatically</strong>{" "}
            on, and click <strong>Sync</strong>:
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
            Once synced, go back to <strong>Plugins</strong>, open the Investair
            marketplace, and install / enable the <strong>Investair</strong>{" "}
            plugin.
          </li>
          <li>
            Restart Claude Desktop and start a new conversation. The first time
            you use an Investair command, Claude shows a sign-in screen &mdash;
            sign in with the same account you created here.
          </li>
        </ol>
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading}>
          Turn on Investair tools permanently (skip the &ldquo;Allow&rdquo;
          prompts)
        </h2>
        <p style={styles.paragraph}>
          By default Claude asks permission each time it uses an Investair tool.
          Longer workflows such as an initiation or sector report can trigger a
          dozen or more prompts, and scheduled reports stall if nobody is there
          to click <strong>Allow</strong>. Set the tools to{" "}
          <strong>Always allow</strong> once and Claude runs them without
          asking.
        </p>

        <div style={styles.subSection}>
          <h3 style={styles.heading}>Option A &mdash; from Settings (recommended)</h3>
          <ol style={styles.steps}>
            <li>
              Open <strong>Settings &rarr; Customize &rarr; Connectors</strong>.
            </li>
            <li>
              Find <strong>{CONNECTOR_NAME}</strong> in the list and click it to
              expand its tools.
            </li>
            <li>
              For each tool (or the whole tool group, if one is shown), change{" "}
              <strong>Needs approval</strong> to <strong>Always allow</strong>.
            </li>
            <li>
              Close Settings and start a new conversation.
            </li>
          </ol>
        </div>

        <div style={styles.subSection}>
          <h3 style={styles.heading}>Option B &mdash; from a chat</h3>
          <ol style={styles.steps}>
            <li>
              Run any Investair command, e.g. <code>/company-snapshot</code>.
            </li>
            <li>
              When the permission prompt appears, choose{" "}
              <strong>Always allow</strong> rather than{" "}
              <strong>Allow once</strong>.
            </li>
            <li>
              Repeat for each tool the first time it appears.
            </li>
          </ol>
        </div>

        <div style={styles.subSection}>
          <h3 style={styles.heading}>Notes</h3>
          <ul style={styles.bullets}>
            <li>
              <strong>Always allow</strong> is set per tool, not per plugin. A
              newly added Investair tool will prompt once until you allow it.
            </li>
            <li>
              Claude Desktop updates can reset connector permissions back to{" "}
              <strong>Needs approval</strong>. If prompts reappear after an
              update, repeat Option A.
            </li>
            <li>
              If a scheduled report fails with{" "}
              <em>&ldquo;No approval received&rdquo;</em>, its tools aren&rsquo;t
              set to <strong>Always allow</strong> &mdash; set them in Settings
              and re-run the report.
            </li>
            <li>
              Optional: turn on <strong>Response completions</strong> under{" "}
              <strong>Settings &rarr; General &rarr; Notifications</strong> to be
              alerted when a longer workflow finishes.
            </li>
          </ul>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading}>ChatGPT</h2>
        <p style={styles.paragraph}>
          ChatGPT doesn&rsquo;t use the Claude plugin &mdash; connect it directly
          to the Investair MCP server, then sign in with the account you created
          here. Once connected, ask in plain English; <code>/commands</code> are
          a Claude-only feature.
        </p>
        <ol style={styles.steps}>
          <li>
            Open <strong>Settings &rarr; Connectors</strong>, then{" "}
            <strong>Advanced settings</strong>, and turn on{" "}
            <strong>Developer mode</strong>. This one-time step is what allows
            custom connectors.
          </li>
          <li>
            Back in <strong>Settings &rarr; Connectors</strong>, click{" "}
            <strong>Add custom connector</strong>.
          </li>
          <li>
            Give it a name, e.g. <strong>Investair</strong>, and enter this URL:
            <div style={styles.codeBlock}>
              <CodeTabs>
                <CodeTabPanel language="text" title="Server URL" code={MCP_URL} />
              </CodeTabs>
            </div>
          </li>
          <li>
            Click <strong>Create</strong> (or <strong>Add</strong>), then sign in
            when prompted &mdash; use the same account you created here.
          </li>
          <li>
            In a chat, turn the Investair connector on &mdash; usually from the
            paperclip or tools menu &mdash; then ask your question in plain
            English.
          </li>
        </ol>
        <Callout type="note" title="Menu names change">
          ChatGPT&rsquo;s menu names shift from time to time. If the wording
          above doesn&rsquo;t match what you see, look for{" "}
          <strong>Connectors</strong> or <strong>Custom connector</strong> under
          Settings.
        </Callout>
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading}>Quick start</h2>
        <p style={styles.paragraph}>
          This walkthrough uses <code>/commands</code> from the Claude plugin. On
          ChatGPT, just ask in plain English.
        </p>
        <ol style={styles.steps}>
          <li>
            Type <code>/company-snapshot</code> in Claude.
          </li>
          <li>Enter an ASX ticker when prompted &mdash; e.g. SKM.</li>
          <li>Claude pulls the Investair data and generates the overview.</li>
        </ol>
        <p style={{ ...styles.paragraph, margin: "1.25rem 0 0" }}>
          Or just ask naturally:{" "}
          <em>&ldquo;Give me an Investair company snapshot for SKM.&rdquo;</em>
        </p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.heading}>Available commands</h2>
        <p style={styles.paragraph}>
          Type any of these in Claude Desktop or the web app. The{" "}
          <code>/</code> menu appears as you type, so you can pick the command
          from the list.
        </p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Command</th>
              <th style={styles.th}>What it does</th>
            </tr>
          </thead>
          <tbody>
            {COMMANDS.map(([command, description]) => (
              <tr key={command}>
                <td style={styles.td}>
                  <code>{command}</code>
                </td>
                <td style={styles.td}>{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <Callout type="tip" title="Questions, or not sure about something?">
          Email <a href="mailto:Stuart@investair.com.au">Stuart@investair.com.au</a>{" "}
          or <a href="mailto:Tim@investair.com.au">Tim@investair.com.au</a>.
        </Callout>
      </div>
    </section>
  );
};
