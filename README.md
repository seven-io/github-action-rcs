<img src="https://www.seven.io/wp-content/uploads/Logo.svg" width="250" />

# Official seven.io RCS GitHub Action

Send RCS from GitHub Actions.

## Prerequisites

- An account at seven.io. [Sign up for free](https://app.seven.io/signup)!
- Account balance and an [API Key](https://help.seven.io/en/api-key-access).

## Usage

1. Set up your credentials secrets in your repository settings by
   specifying `SEVEN_API_KEY`.

2. Add the following to your workflow

```yaml
- name: 'Send RCS'
  uses: seven-io/github-action-rcs@master
  with:
    from: 'Tommy Tester'
    text: 'seven.io wishes you a nice day!'
    to: '+4901234567890'
  env:
    SEVEN_API_KEY: ${{ secrets.SEVEN_API_KEY }}
```

## Inputs

`apiKey` **Required**

An API Key from seven.io. Alternatively use environment variable SEVEN_API_KEY.

`to` **Required**

The recipient number for your RCS message. This can also be a contact name or a group name.

`text` **Required**

Text of the RCS message. To send a simple RCS message (without images, suggested replies, etc.), only enter the plain text of the message here. Otherwise, use an RCS object.

`delay`

Delayed dispatch at given time: Unix-Timestamp or format yyyy-mm-dd hh:ii

`foreign_id`

Foreign ID returned in callbacks. Allowed characters: a-z, A-Z, 0-9, .-_@

`from`

The unique ID of your agent. You can view this in the Settings of your account. If not specified, the first RCS-capable sender will be used.

`label`

Custom label. Allowed characters: a-z, A-Z, 0-9, .-_@

`ttl`

Specifies the validity period of the RCS in minutes. The default is 2880, i.e. 48 hours.

## Outputs

`response`

Returns a [return code](https://docs.seven.io/en/rest-api/endpoints/sms#return-codes)
from the API.

## License

[![MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
