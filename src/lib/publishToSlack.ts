import 'isomorphic-fetch';

export default (message: object) => {
  const body = JSON.stringify(message);
  const fetchConfig = {
    body,
    headers: {
      'Content-Length': Buffer.byteLength(body).toString(),
      'Content-Type': 'application/json',
    },
    method: 'POST',
  };

  return fetch(process.env.SLACK_HOOK_URL!, fetchConfig);
};
