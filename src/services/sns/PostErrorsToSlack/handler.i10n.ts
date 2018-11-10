import {
  createTestService,
  deployService,
  publishSnsMessage,
  removeService,
  sleep,
} from '@endemolshinegroup/serverless-test-utils';
import 'isomorphic-fetch';
import uuid from 'uuid/v4';

const { SLACK_APP_WORKSPACE_TOKEN, SLACK_CHANNEL_ID } = process.env;

describe('PostErrorsToSlack', () => {
  const TOPIC_NAME = 'SlackAlarmsTopic';
  const hashCode: string = uuid();
  let serviceName;

  beforeAll(async () => {
    serviceName = createTestService('aws-nodejs-typescript', process.cwd());
    deployService();
  });

  afterAll(async () => {
    await removeService();
  });

  it('when a CloudWatch event is sent to the Lambda it calls the Slack API', async (done) => {
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
      `https://slack.com/api/channels.history?channel=${SLACK_CHANNEL_ID}`,
      {
        headers: {
          Authorization: `Bearer ${SLACK_APP_WORKSPACE_TOKEN}`,
        },
      },
    );

    expect(response.status).toEqual(200);
    const json = await response.json();

    const [firstMessage] = json.messages;
    const [firstAttachment] = firstMessage.attachments;
    expect(firstAttachment.fallback).toEqual(hashCode);
    done();
  }, 10000);
});
