// Demonstration only. Never expose an API key in production browser code.
const API_KEY="YOUR_API_KEY";
fetch("https://walookup.com/api/v1/check",{method:"POST",headers:{"X-API-Key":API_KEY,"Content-Type":"application/json"},body:JSON.stringify({service_type:"ws",identifier:"+14155550100"})}).then(async r=>{if(!r.ok)throw new Error(await r.text());return r.json()}).then(console.log);
