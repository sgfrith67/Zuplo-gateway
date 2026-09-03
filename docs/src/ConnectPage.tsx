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

export const ConnectPage = () => {
  const { isAuthenticated, isPending, profile, login } = useAuth();
  const [apiKey, setApiKey] = useState("");

  const hasKey = apiKey.trim().length > 0;
  const urlWithKey = hasKey
    ? `${MCP_URL}?apiKey=${encodeURIComponent(apiKey.trim())}`
    : `${MCP_URL}?apiKey=YOUR_API_KEY`;

  const claudeCodeCommand = hasKey
    ? `claude mcp add --transport http investair "${MCP_URL}" --header "Authorization: Bearer ${apiKey.trim()}"`
    : `claude mcp add --transport http investair "${MCP_URL}" --header "Authorization: Bearer YOUR_API_KEY"`;

  const claudeDesktopConfig = `{
  "mcpServers": {
    "investair": {
      "url": "${urlWithKey}"
    }
  }
}`;

  const cursorConfig = `{
  "mcpServers": {
    "investair": {
      "url": "${urlWithKey}"
    }
  }
}`;

  return (
    <section>
      <Head>
        <title>Connect</title>
      </Head>
      <h1>Connect to InvestAir Data</h1>
      <p>
        Paste your subscription API key below to generate a ready-to-use
        connection string and setup commands for your AI client.
      </p>

      {isPending ? null : !isAuthenticated ? (
        <Callout type="info" title="Sign in first">
          <button type="button" onClick={() => login()}>
            Sign in
          </button>{" "}
          to subscribe to a plan and get your API key, or paste an existing
          key below.
        </Callout>
      ) : (
        <Callout type="tip" title={`Signed in as ${profile?.email ?? profile?.name ?? "you"}`}>
          Find your API key on the{" "}
          <a href="/subscriptions">Subscriptions</a> page, then paste it below.
        </Callout>
      )}

      <div style={{ display: "grid", gap: "0.375rem", maxWidth: "32rem", margin: "1.5rem 0" }}>
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
          The snippets below use a placeholder until you paste your real key.
          Never share your API key or commit it to a public repository.
        </Callout>
      )}

      <h2>Claude Code (CLI)</h2>
      <CodeTabs>
        <CodeTabPanel language="sh" title="Claude Code" code={claudeCodeCommand} />
      </CodeTabs>

      <h2>Claude Desktop / Claude.ai</h2>
      <p>Add this to your MCP server configuration:</p>
      <CodeTabs>
        <CodeTabPanel language="json" title="claude_desktop_config.json" code={claudeDesktopConfig} />
      </CodeTabs>

      <h2>Cursor</h2>
      <CodeTabs>
        <CodeTabPanel language="json" title="mcp.json" code={cursorConfig} />
      </CodeTabs>

      <h2>Generic / raw URL</h2>
      <CodeTabs>
        <CodeTabPanel language="text" title="MCP URL" code={urlWithKey} />
      </CodeTabs>
    </section>
  );
};
