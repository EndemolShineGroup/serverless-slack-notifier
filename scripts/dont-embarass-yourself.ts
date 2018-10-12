const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

let sns = new AWS.SNS();

const success = (data: object) => {
  console.log(`Message sent to the topic`);
  console.log('Data: ' + JSON.stringify(data));
};

const failure = (err: Error) => {
  console.error(err, err.stack);
};

const publishToTopic = async () => {

  try {
    const { TopicArn } = await sns.createTopic({Name: 'SlackAlarmsTopic'}).promise();

    const params = {
      Message: JSON.stringify({
        AlarmDescription: 'A short test message',
        AlarmName: 'Test',
        NewStateValue: 'ALARM',
        NewStateReason: 'Something happened',
        Region: 'us-east-1',
        Trigger: {
          MetricName: 'things',
        },
      }),
      TopicArn,
    };

    const data = await sns.publish(params).promise();
    success(data);
  } catch (err) {
    failure(err);
  }
};

publishToTopic();
