const apiKey = process.env.WALOOKUP_API_KEY;
if (!apiKey) throw new Error("Set WALOOKUP_API_KEY");
const baseUrl = (process.env.API_BASE_URL || "https://walookup.com").replace(/\/$/, "");
const identifier = process.env.IDENTIFIER || "+14155550100";
const batch = process.env.MODE === "batch";
const path = batch ? "/api/v1/batch-check" : "/api/v1/check";
const body = batch
  ? { service_type: "ws", identifiers: [identifier, "+442079460000"] }
  : { service_type: "ws", identifier };
const timeout = Number(process.env.REQUEST_TIMEOUT_SECONDS || (batch ? "330" : "60")) * 1000;
if (!Number.isFinite(timeout) || timeout <= 0) throw new Error("Invalid REQUEST_TIMEOUT_SECONDS");
const response = await fetch(`${baseUrl}${path}`, {
  method: "POST", headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
  body: JSON.stringify(body), signal: AbortSignal.timeout(timeout),
});
if (!response.ok) throw new Error(await response.text());
const result = await response.json();
if (result.code !== 0) throw new Error(JSON.stringify(result));
console.log(result);
// Classify only exists=true batch items. Never blindly retry an uncertain network timeout.
