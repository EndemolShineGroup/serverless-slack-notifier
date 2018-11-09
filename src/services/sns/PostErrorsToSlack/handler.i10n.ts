import {
  createSnsTopic,
  createTestService,
  deployService,
  publishSnsMessage,
  removeService,
  sleep,
} from '@endemolshinegroup/serverless-test-utils';
import 'isomorphic-fetch';
import uuid from 'uuid/v4';

describe('PostErrorsToSlack', () => {
  const hashCode: string = uuid();
  let serviceName;

  beforeAll(async () => {
    serviceName = createTestService('aws-nodejs-typescript', process.cwd());
    deployService();
    await sleep(50000);
  });

  afterAll(async () => {
    await removeService();
  });

  it(
    'when a CloudWatch event is sent to the Lambda it calls the Slack API',
    async () => {
      const TOPIC_NAME = 'SlackAlarmsTopic';
      await createSnsTopic(TOPIC_NAME);

      // Post a message to the SNS topic in the correct format
      await publishSnsMessage(
        TOPIC_NAME,
        JSON.stringify({
          AlarmDescription: 'A short test message',
          AlarmName: 'Test',
          NewStateReason: hashCode,
          NewStateValue: 'ALARM',
          Region: 'us-east-1',
          Trigger: {
            MetricName: 'things',
          },
        }),
      );

      // Sleep for maybe 5 seconds
      await sleep(5000);

      // Check the Slack channel to see if the message arrived successfully
      const response = await fetch(
        `https://slack.com/api/channels.history?channel=${
          process.env.SLACK_CHANNEL_ID
        }`,
        {
          headers: {
            Authorization: `Bearer ${process.env.SLACK_APP_WORKSPACE_TOKEN}`,
          },
        },
      );
      const json = await response.json();

      const [firstMessage] = json.messages;
      const [firstAttachment] = firstMessage.attachments;
      expect(firstAttachment.fallback).toEqual(hashCode);
    },
    60000,
  );
});
