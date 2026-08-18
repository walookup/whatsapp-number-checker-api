# WhatsApp Number Checker API — Single & Batch Checks | WA Lookup

The **WA Lookup WhatsApp Number Checker API** verifies WhatsApp registration for one phone number or a batch of up to 100 numbers. It returns synchronous JSON results through `service_type=ws`, supports E.164 phone numbers, and uses an `X-API-Key` header. This is the official WA Lookup example repository, with integrations in eight languages.

- **Product page:** https://walookup.com/products/ws
- **API documentation:** https://walookup.com/api-docs
- **API base URL:** `https://walookup.com`
- **Authentication:** `X-API-Key`
- **Get an API key:** https://walookup.com/register

## What does the WA Lookup WhatsApp Number Checker verify?

The API returns a `registered` boolean when WhatsApp registration can be determined. A successful single check uses `code=0`. In batch results, `exists=true` means a determined result is present; `exists=false` means the item is undetermined and must not be treated as unregistered. The repository covers only the `ws` registration product—not avatar, Business-account, activity, or profile checks.

| API fact | Value |
|---|---|
| Product code | `ws` |
| Input | E.164 phone number |
| Single endpoint | `POST /api/v1/check` |
| Batch endpoint | `POST /api/v1/batch-check` |
| Batch size | 1–100 numbers |
| Processing mode | Synchronous |
| Primary result | `registered` |

## How do I check one WhatsApp number?

Send one E.164 phone number to the single-check endpoint:

```bash
curl -X POST 'https://walookup.com/api/v1/check' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"service_type":"ws","identifier":"+14155550100"}'
```

A determined response uses this envelope:

```json
{
  "code": 0,
  "msg": "ok",
  "data": {
    "service_type": "ws",
    "identifier": "+14155550100",
    "registered": true
  }
}
```

Accept `registered=false` only when `code=0`. Error code `42200` represents an undetermined check and returns no result data.

## How do I check WhatsApp numbers in a batch?

Submit 1–100 numbers with one `service_type`. Results preserve input order.

```bash
curl -X POST 'https://walookup.com/api/v1/batch-check' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"service_type":"ws","identifiers":["+14155550100","+442079460000"]}'
```

The batch response contains `service_type`, `total`, `succeeded`, `failed`, and an ordered `results` array. Every item has `identifier` and `exists`; `registered` is present only when `exists=true`.

## What are the response fields?

| Field | Description |
|---|---|
| `service_type` | Product code used for the check. |
| `identifier` | Submitted phone number echoed by the API. |
| `registered` | Whether WhatsApp registration was detected. |
| `exists` | In a batch item, whether a determined result exists. |

## What are the limits and error codes?

- The shared user limit is 200 submitted numbers per UTC minute and 5 concurrent checks. A batch counts by number, not by HTTP request.
- Only one batch may be in flight per user. A second batch is rejected with code `42901`.
- The whole batch is rejected before processing when the balance cannot cover all submitted numbers; successful batch items are billed independently.
- `42900` means rate limited; honor `Retry-After`. `42901` means all applicable concurrency slots are occupied. Neither rejection is charged.
- `40000`/`40001`/`40002` are request, JSON, or phone-format errors; `40100` is an invalid key; `40200` is insufficient balance; `42200` is undetermined and uncharged; `50300` is temporary maintenance.
- `GET /api/v1/balance` returns the current balance in `data.balance_micros`.

Keep the key on a trusted server and read it from `WALOOKUP_API_KEY`. Never commit it or expose it in production browser code. Retry only rate-limited or transient failures.

## Runnable examples in eight languages

| Language | Example |
|---|---|
| Python | [`examples/python`](examples/python) |
| Node.js | [`examples/nodejs`](examples/nodejs) |
| Go | [`examples/go`](examples/go) |
| Java | [`examples/java`](examples/java) |
| C# | [`examples/csharp`](examples/csharp) |
| PHP | [`examples/php`](examples/php) |
| JavaScript (browser) | [`examples/javascript`](examples/javascript) |
| Shell / curl | [`examples/shell`](examples/shell) |

Python and Node.js also support `MODE=batch`. The curl examples above document the same single and batch contracts used by every client.

## Frequently asked questions

### Does `exists=false` mean the number is not registered?

No. It means the batch item is undetermined. Treat a number as unregistered only when a determined result explicitly returns `registered=false`.

### How many numbers can one batch contain?

Between 1 and 100 E.164 phone numbers. The shared rate limit counts submitted numbers, not requests.

### Where can I find current pricing?

See the [WA Lookup pricing page](https://walookup.com/pricing). This repository intentionally does not hard-code a price.

## Official resources and responsible use

- **Product:** https://walookup.com/products/ws
- **Documentation:** https://walookup.com/api-docs
- **Registration:** https://walookup.com/register
- **Pricing:** https://walookup.com/pricing
- **OpenAPI contract:** [`openapi.yaml`](openapi.yaml)
- **License:** [MIT](LICENSE) for the sample code

Use this API only for identifiers you are authorized to process and comply with applicable privacy laws and platform terms. WhatsApp and Meta trademarks belong to their respective owners; no affiliation or endorsement is implied.

---

*Last reviewed: 2026-08-18 · Maintained by WA Lookup. Canonical product page: https://walookup.com/products/ws*
