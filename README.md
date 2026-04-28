<p align="center">
  <img src="https://www.seven.io/wp-content/uploads/Logo.svg" width="250" alt="seven logo" />
</p>

<h1 align="center">seven RCS - GitHub Action</h1>

<p align="center">
  Send RCS messages from any GitHub Actions workflow via the seven gateway.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-teal.svg" alt="MIT License" /></a>
  <a href="https://github.com/marketplace/actions/seven-rcs"><img src="https://img.shields.io/badge/GitHub-Marketplace-181717" alt="GitHub Marketplace" /></a>
  <img src="https://img.shields.io/badge/Node.js-runtime-brightgreen" alt="Node.js runtime" />
</p>

---

## Features

- **Plain Text or Rich RCS** - Send simple text or full RCS objects with images, suggested replies and more
- **Performance Tracking** - Optional URL shortening + click tracking
- **Scheduling & TTL** - Delayed dispatch and custom validity windows
- **Foreign IDs & Labels** - Tag messages for downstream tracking

## Prerequisites

- A [seven account](https://www.seven.io/) with API key ([How to get your API key](https://help.seven.io/en/developer/where-do-i-find-my-api-key))
- An RCS-capable sender / agent ID configured under [Settings](https://app.seven.io/) in your seven account
- The `SEVEN_API_KEY` secret configured under **Settings > Secrets and variables > Actions**

## Usage

```yaml
- name: Send RCS
  uses: seven-io/github-action-rcs@master
  with:
    from: 'agent-id-or-leave-empty'
    text: 'seven.io wishes you a nice day!'
    to:   '+4901234567890'
  env:
    SEVEN_API_KEY: ${{ secrets.SEVEN_API_KEY }}
```

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| `apiKey` | yes* | seven API key. *Optional if `SEVEN_API_KEY` env var is set. |
| `to` | yes | Recipient phone number, contact name or group name |
| `text` | yes | Plain RCS text or a full RCS object as JSON |
| `from` | no | Agent ID. Defaults to the first RCS-capable sender if omitted |
| `delay` | no | Delayed dispatch (Unix timestamp or `yyyy-mm-dd hh:ii`) |
| `ttl` | no | Time-to-live in minutes. Default `2880` (48h) |
| `foreign_id` | no | Foreign ID for callbacks. Allowed: `a-z A-Z 0-9 .-_@` |
| `label` | no | Custom label. Allowed: `a-z A-Z 0-9 .-_@` |
| `performance_tracking` | no | Enable URL shortening + click tracking |

## Outputs

| Output | Description |
|--------|-------------|
| `response` | API [return code](https://docs.seven.io/en/rest-api/endpoints/sms#return-codes) |

## Support

Need help? Feel free to [contact us](https://www.seven.io/en/company/contact/) or [open an issue](https://github.com/seven-io/github-action-rcs/issues).

## License

[MIT](LICENSE)
