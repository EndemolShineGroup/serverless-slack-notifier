import fetchMock from 'fetch-mock';

import publishToSlack from './publishToSlack';

describe('Incoming web hooks', () => {
  beforeEach(() => {
    fetchMock.post('*', { hello: 'world' });
    process.env.SLACK_HOOK_URL = 'https://www.test.com/test-it-mate';
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it('calls the slack web hook', async () => {
    await publishToSlack({ text: 'snoop' });
    expect(fetchMock.called()).toEqual(true);
  });
});
