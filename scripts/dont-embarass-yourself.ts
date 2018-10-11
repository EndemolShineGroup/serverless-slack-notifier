const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

let sns = new AWS.SNS();

const success = (data: string) => {
  console.log(`Message sent to the topic`);
  console.log("Data: " + data);
};

const failure = (err: Error) => {
  console.error(err, err.stack);
};

const publishToTopic = async () => {

  try {
    const { TopicArn } = await sns.createTopic({Name: "SlackAlarmsTopic"}).promise();

    const params = {
      Message: JSON.stringify({
        AlarmDescription: 'Stuffed Wombles',
        AlarmName: 'sw',
        NewStateValue: 'ALARM',
        NewStateReason: 'You',
        Region: 'us-east-1',
        Trigger: {
          MetricName: 'social-justice',
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
