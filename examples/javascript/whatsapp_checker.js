// Browser code must never hold an API key. This calls a same-origin backend
// proxy (/api/check-proxy) that attaches the real API key server-side and
// forwards to https://walookup.com/api/v1/check.
fetch("/api/check-proxy", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ service_type: "ws", identifier: "+14155550100" }),
})
  .then(async (r) => {
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  })
  .then(console.log);
