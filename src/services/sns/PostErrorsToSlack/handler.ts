import { SNSEvent } from 'aws-lambda';
import { SlackStatus, SNSMessage } from '../../../types/types';
import createSlackMessage from './createSlackMessage';
import mapStatus from './mapStatus';
import publishToSlack from './publishToSlack';

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
