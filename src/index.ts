import {debug, error, getInput, setFailed, setOutput} from '@actions/core';
import {Client, RcsDispatchParams, RcsResource} from '@seven.io/client';
import fetch from 'node-fetch';
import {ok} from 'node:assert';

(global as any).fetch = fetch;

type Type = Pick<RcsDispatchParams, 'delay' | 'foreign_id' | 'from' | 'label' | 'text' | 'to' | 'ttl'>;

const rcsParams: Type = {
    delay: undefined,
    foreign_id: undefined,
    from: undefined,
    label: undefined,
    text: '',
    to: '',
    ttl: undefined,
};

const send = async () => {
    (<(keyof Type)[]>Object.keys(rcsParams))
        .forEach(k => (<Type[typeof k]>rcsParams[k]) = getInput(k));

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
