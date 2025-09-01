import {debug, error, getInput, setFailed, setOutput} from '@actions/core';
import {Client, RcsDispatchParams, RcsResource} from '@seven.io/client';
import fetch from 'node-fetch';
import {ok} from 'node:assert';

(global as any).fetch = fetch;

type Type = Pick<RcsDispatchParams, 'delay' | 'foreign_id' | 'from' | 'label' | 'text' | 'to' | 'ttl'>;

const getCleanInput = <T extends keyof Type>(k: T, defaultValue: Type[T]): Type[T] => {
    const input = getInput(k)
    return input === '' ? defaultValue : input as Type[T]
}

const send = async () => {
    const rcsParams: Type = {
        delay: getCleanInput('delay', undefined),
        foreign_id: getCleanInput('foreign_id', undefined),
        from: getCleanInput('from', undefined),
        label: getCleanInput('label', undefined),
        text: '',
        to: '',
        ttl: getCleanInput('ttl', undefined),
    };

    debug('Sending RCS');

    try {
        const apiKey = getInput('apiKey') || process.env.SEVEN_API_KEY;
        ok(apiKey);

        const client = new Client({apiKey, sentWith: 'github-action-rcs'})
        const resource = new RcsResource(client)
        const response = await resource.dispatch(rcsParams);
        debug('API reached, RCS dispatch ended.');
        setOutput('API response', response);

        return response;
    } catch (e) {
        const message = (e as Error).message
        error(message);
        setFailed(message);
    }
};

export default send;

send();
