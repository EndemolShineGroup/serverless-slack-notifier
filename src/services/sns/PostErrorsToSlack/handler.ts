import { Callback, Context, SNSEvent } from 'aws-lambda';
import fetch from 'isomorphic-fetch';
import { SlackStatus, SNSMessage } from '../../../types/types';
import { createAttachments } from './createAttachments';
import { mapStatus } from './mapStatus';

export default (event: SNSEvent, context: Context, callback: Callback) => {
  const attachments = event.Records.map((record) => {
    const message: SNSMessage = JSON.parse(record.Sns.Message);
    const status: SlackStatus = mapStatus(message.NewStateValue);
    return createAttachments(message, status);
  });

  const promises = attachments.map(publishToSlack);

  // Use async/await
  Promise.all(promises)
    .then(() => {
      callback(null);
    })
    .catch((error) => {
      callback(error);
    });
};

const publishToSlack = (attachment: object) => {
  const body = JSON.stringify(attachment);
  const fetchConfig = {
    body,
    headers: {
      'Content-Length': Buffer.byteLength(body),
      'Content-Type': 'application/json',
    },
    method: 'POST',
  };

  return fetch(process.env.SLACK_HOOK_URL, fetchConfig);
};
