import { SNSEvent } from 'aws-lambda';

import createSlackMessage from '@lib/createSlackMessage';
import mapStatus from '@lib/mapStatus';
import publishToSlack from '@lib/publishToSlack';
import { SlackStatus, SNSMessage } from '@src/types';

export default async (event: SNSEvent) => {
  const slackMessages = event.Records.map((record) => {
    const message: SNSMessage = JSON.parse(record.Sns.Message);
    const status: SlackStatus = mapStatus(message.NewStateValue);
    return createSlackMessage(message, status);
  });

  try {
    await Promise.all(
      slackMessages.map((slackMessage) => {
        return publishToSlack(slackMessage);
      }),
    );
  } catch (error) {
    return error;
  }
};
