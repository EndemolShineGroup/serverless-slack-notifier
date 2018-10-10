import fetch from 'isomorphic-fetch';
import {map} from 'lodash';

import {Callback, Context, SNSEvent} from 'aws-lambda';

export default (event: SNSEvent, context: Context, callback: Callback) => {

  const messages = map(event.Records, (record) => {

    console.log(typeof record);
    console.log(JSON.stringify(record, null, 2));

    const {
      AlarmDescription,
      AlarmName,
      NewStateValue,
      NewStateReason,
      Region,
      Trigger,
    } = JSON.parse(record.Sns.Message);

    let color: string;
    let icon: string;
    switch (NewStateValue) {

      case 'OK':
        color = 'good';
        icon = ':white_check_mark:';
        break;

      case 'ALARM':
        color = 'danger';
        icon = ':bangbang:';
        break;

      default:
        color = 'warning';
        icon = ':interrobang:';
        break;
    }

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
          pretext: AlarmDescription,
          text: NewStateReason,
          title: AlarmName,
        },
      ],
      icon_emoji: icon,
    };
  });

  const promises = map(messages, (message) => {

    const body = JSON.stringify(message);
    const fetchConfig = {
      body,
      headers: {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'application/json',
      },
      method: 'POST',
    };

    return fetch(process.env.SLACK_HOOK_URL, fetchConfig);
  });

  Promise.all(promises)
    .then(() => {

      callback(null);
    })
    .catch((error) => {

      // console.error(error, error.stack);
      callback(error);
    });
};
