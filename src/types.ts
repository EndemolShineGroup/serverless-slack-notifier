export interface SlackStatus {
  color: string;
  icon: string;
}

export interface Trigger {
  MetricName: string;
}

export interface SNSMessage {
  AlarmDescription: string;
  AlarmName: string;
  NewStateValue: string;
  NewStateReason: string;
  Region: string;
  Trigger: Trigger;
}

export interface SlackMessage {
  attachments: SlackMessageAttachment[];
}

export interface SlackMessageAttachment {
  color: string;
  fallback: string;
  fields: SlackMessageField[];
  pretext: string;
  text: string;
  title: string;
}

export interface SlackMessageField {
  short: boolean;
  title: string;
  value: string;
}
