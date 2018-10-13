import { SNSEvent, SNSEventRecord } from 'aws-lambda';

import createSlackMessage from '@lib/createSlackMessage';
import mapStatus from '@lib/mapStatus';
import publishToSlack from '@lib/publishToSlack';
import { SlackStatus, SNSMessage } from '@src/types';

const processRecord = async (record: SNSEventRecord) => {
  const message: SNSMessage = JSON.parse(record.Sns.Message);
  const status: SlackStatus = mapStatus(message.NewStateValue);
  const slackMessage = await createSlackMessage(message, status);
  return publishToSlack(slackMessage);
};

export default async (event: SNSEvent) => {
  try {
    await Promise.all(event.Records.map(processRecord));
  } catch (error) {
    return error;
  }
};
