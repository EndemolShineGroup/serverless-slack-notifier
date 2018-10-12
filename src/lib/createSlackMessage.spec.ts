import { SlackMessage, SlackStatus, SNSMessage } from '@src/types';
import createSlackMessage from './createSlackMessage';

describe('create slack message', () => {
  let snsMessage: SNSMessage;
  let status: SlackStatus;

  beforeAll(() => {
    snsMessage = {
      AlarmDescription: 'Something snakey happened',
      AlarmName: 'Snakes',
      NewStateReason: 'For Snakes',
      NewStateValue: 'OK',
      Region: 'snaketon-east-1',
      Trigger: {
        MetricName: 'Hisses',
      },
    };

    status = {
      color: 'good',
      icon: ':avocado:',
    };
  });

  it('returns a valid `SlackMessage`', () => {
    let result: SlackMessage = createSlackMessage(snsMessage, status);
    expect(result).not.toBe(null);
    expect(result.attachments.length).toBeGreaterThan(0);
    expect(result.attachments[0].fields.length).toBeGreaterThan(0);
  });

  it('uses the values from the `SNSMessage` correctly', () => {
    let result: SlackMessage = createSlackMessage(snsMessage, status);
    expect(result.attachments[0].title).toBe(snsMessage.AlarmName);
    expect(result.attachments[0].text).toBe(snsMessage.NewStateReason);
    expect(result.attachments[0].color).toBe(status.color);
  });
});
