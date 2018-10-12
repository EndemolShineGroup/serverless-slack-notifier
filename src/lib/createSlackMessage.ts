import {
  SlackMessage,
  SlackMessageField,
  SlackStatus,
  SNSMessage,
} from '@src/types';

export default (message: SNSMessage, status: SlackStatus): SlackMessage => {
  let { color, icon } = status;
  let {
    AlarmDescription,
    AlarmName,
    NewStateValue,
    NewStateReason,
    Region,
    Trigger,
  } = message;

  let fields: SlackMessageField[] = [
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
  ];

  return {
    attachments: [
      {
        color,
        fallback: NewStateReason,
        fields,
        pretext: icon + ' ' + AlarmDescription,
        text: NewStateReason,
        title: AlarmName,
      },
    ],
  };
};
