# WhatsApp Number Checker API

Check WhatsApp registration for one phone number or up to 100 numbers synchronously.

- **Landing page:** https://walookup.com/products/ws
- **API base:** `https://walookup.com`
- **Authentication:** `X-API-Key`
- **Documentation:** https://walookup.com/api-docs
- **Get an API key:** https://walookup.com/register

## Products

| service_type | Product | Input |
|---|---|---|
| `ws` | WhatsApp Registration Check | phone |

## Single check

```bash
curl -X POST 'https://walookup.com/api/v1/check' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"service_type":"ws","identifier":"+14155550100"}'
```

Success response:

```json
{"code":0,"msg":"ok","data":{"service_type":"ws","identifier":"+14155550100","registered":true}}
```

## Batch check

Submit 1–100 numbers with one service type. Results preserve input order. An item with `exists=false` is undetermined and must not be treated as unregistered.

```bash
curl -X POST 'https://walookup.com/api/v1/batch-check' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"service_type":"ws","identifiers":["+14155550100","+442079460000"]}'
```

The response envelope contains `service_type`, `total`, `succeeded`, `failed`, and an ordered `results` array. Each item always has `identifier` and `exists`; `registered` is present only when `exists=true`.

## Response fields

### WhatsApp Registration Check

| Field | Description |
|---|---|
| `service_type` | Product code used for the check. |
| `identifier` | Submitted identifier echoed by the API. |
| `registered` | Whether the identifier is registered. |

A single-check success uses the envelope `{ "code": 0, "msg": "ok", "data": ... }`. Accept `registered=false` only when `code=0`; error code `42200` is undetermined and returns no result data.

## Limits, billing, and errors

- Phone numbers must use E.164 format.
- The shared user limit is 200 submitted numbers per UTC minute and 5 concurrent checks. A batch counts by number, not by HTTP request.
- Only one batch may be in flight per user. A second batch is rejected with code `42901`.
- The whole batch is rejected before processing when the balance cannot cover every submitted number; successful batch items are billed independently.
- `42900` means rate limited; honor `Retry-After`. `42901` means all applicable concurrency slots are occupied. Neither rejection is charged.
- `40000`/`40001`/`40002` are request, JSON, or phone-format errors; `40100` is an invalid key; `40200` is insufficient balance; `42200` is undetermined and uncharged; `50300` is temporary maintenance.
- `GET /api/v1/balance` returns the current balance in `data.balance_micros`.

Keep the key on a trusted server and read it from `WALOOKUP_API_KEY`. Never commit it or expose it in production browser code.

Failed or undetermined checks are not confirmed negative results. Respect HTTP and business error codes, and retry only rate-limited or transient failures.

## Runnable examples

Clients are available for [Python](examples/python), [Node.js](examples/nodejs), [Go](examples/go), [Java](examples/java), [C#](examples/csharp), [PHP](examples/php), [JavaScript](examples/javascript), and [Shell](examples/shell). Python and Node.js also support `MODE=batch`; the README curl demonstrates the same batch contract for every language.

## Pricing and responsible use

See https://walookup.com/pricing for current pricing. Use the API only for identifiers you are authorized to process and comply with applicable privacy laws and WhatsApp platform terms. WhatsApp and Meta trademarks belong to their respective owners; no affiliation or endorsement is implied.

_Last reviewed: 2026-08-17_
