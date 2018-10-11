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
