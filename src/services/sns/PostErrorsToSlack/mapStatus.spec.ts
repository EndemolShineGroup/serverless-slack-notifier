import { SlackStatus } from '../../../types/types';
import mapStatus from './mapStatus';

describe('map slack message status', () => {
  it('maps state values to correct `SlackStatus`', () => {
    let state: string;
    let status: SlackStatus;

    state = 'OK';
    status = mapStatus(state);
    expect(status.color).toBe('good');
    expect(status.icon).toBe(':white_check_mark:');

    state = 'ALARM';
    status = mapStatus(state);
    expect(status.color).toBe('danger');
    expect(status.icon).toBe(':bangbang:');

    state = '';
    status = mapStatus(state);
    expect(status.color).toBe('warning');
    expect(status.icon).toBe(':interrobang:');
  });
});
