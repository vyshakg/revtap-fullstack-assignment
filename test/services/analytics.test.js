const app = require('../../src/app');

describe('\'analytics\' service', () => {
  it('registered the service', () => {
    const service = app.service('analytics');
    expect(service).toBeTruthy();
  });
});
