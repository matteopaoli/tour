/** @jest-environment node */
import { createMocks } from 'node-mocks-http';
import handleSearch from '../../pages/api/search';

describe('API: /api/search', () => {
  test('?departure=Bangkok&destination=Chiang%20Mai returns at least one result', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        departure: "Bangkok",
        destination: "Chiang Mai"
      },
    });

    await handleSearch(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData().length)).toBeGreaterThanOrEqual(1)
  });
});