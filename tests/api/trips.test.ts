/** @jest-environment node */
import { createMocks } from 'node-mocks-http';
import handleTrip from '../../pages/api/trip';

describe('API: /api/trip', () => {
  test('?id=63a87f4dabad146fad0a509d returns one result', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: "63a87f4dabad146fad0a509d"
      },
    });

    await handleTrip(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData().length)).toBeGreaterThanOrEqual(1)
  });
});