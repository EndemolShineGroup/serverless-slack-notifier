import { SlackStatus } from '../../../types/types';

export default (NewStateValue: string): SlackStatus => {
  let status: SlackStatus;
  // Extract into mapStatusToSlack()
  switch (NewStateValue) {
    case 'OK':
      status = {
        color: 'good',
        icon: ':white_check_mark:',
      };
      break;

    case 'ALARM':
      status = {
        color: 'danger',
        icon: ':bangbang:',
      };
      break;

    default:
      status = {
        color: 'warning',
        icon: ':interrobang:',
      };
      break;
  }

  return status;
};
