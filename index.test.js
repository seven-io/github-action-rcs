const core = require('@actions/core');
const {RcsResource} = require('@seven.io/client');
const send = require('./dist/index.js').default;

jest.mock('@actions/core');
jest.mock('@seven.io/client');

test('Log errors', async () => {
    const unauthorizedMessage = '900';

    RcsResource.mockImplementation(() => {
        throw new Error(unauthorizedMessage);
    });

    await send();

    expect(core.error.mock.calls.toString()).toStrictEqual(unauthorizedMessage);
    expect(core.setFailed.mock.calls.toString()).toStrictEqual(unauthorizedMessage);
});

test('Returns API response', async () => {
    const response = {
            "success": "100",
            "total_price": null,
            "balance": 3218.988,
            "debug": "false",
            "sms_type": "direct",
            "messages": [
                {
                    "id": "77233319353",
                    "sender": "myfancyagent",
                    "recipient": "49176123456789",
                    "text": "Hello World!",
                    "encoding": "gsm",
                    "label": null,
                    "parts": 0,
                    "udh": null,
                    "is_binary": false,
                    "price": 0,
                    "channel": "RCS",
                    "success": true,
                    "error": null,
                    "error_text": null
                },
            ]
        }

    RcsResource.mockReturnValue({
        dispatch: () => response,
    });

    expect(await send()).toEqual(response);
});
