const apiKey = process.env.WALOOKUP_API_KEY;
if (!apiKey) throw new Error("Set WALOOKUP_API_KEY");

const baseUrl = process.env.API_BASE_URL || "https://walookup.com";
const identifier = process.env.IDENTIFIER || "+14155550100";
const batch = process.env.MODE === "batch";
const path = batch ? "/api/v1/batch-check" : "/api/v1/check";
const body = batch
  ? { service_type: "ws", identifiers: [identifier, "+442079460000"] }
  : { service_type: "ws", identifier };

const response = await fetch(`${baseUrl}${path}`, {
  method: "POST",
  headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
  body: JSON.stringify(body),
});
if (!response.ok) throw new Error(await response.text());
console.log(await response.json());
