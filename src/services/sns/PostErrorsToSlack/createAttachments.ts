import { SlackStatus, SNSMessage } from '../../../types/types';

export const createAttachments = (
  message: SNSMessage,
  status: SlackStatus,
): object => {
  let { color, icon } = status;
  let {
    AlarmDescription,
    AlarmName,
    NewStateValue,
    NewStateReason,
    Region,
    Trigger,
  } = message;

  return {
    attachments: [
      {
        color,
        fallback: NewStateReason,
        fields: [
          {
            short: true,
            title: 'Region',
            value: Region,
          },
          {
            short: true,
            title: 'State',
            value: NewStateValue,
          },
          {
            short: true,
            title: 'Metric',
            value: Trigger.MetricName,
          },
        ],
        pretext: icon + ' ' + AlarmDescription,
        text: NewStateReason,
        title: AlarmName,
      },
    ],
  };
};
