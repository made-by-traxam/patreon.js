import { Pledge } from '../../src/models/pledge';
import { DataStore } from '../../src/dataStore';

test('parse pledge with empty relationships', () => {
  // sample input with structure from https://docs.patreon.com/#pledge and data
  // from https://docs.patreon.com/#paging-through-a-list-of-pledges
   const input = {
    type: 'pledge',
    id: '2745627',
    attributes: {
      amount_cents: 100,
      currency: 'EUR',
      created_at: '2016-07-25T20:59:52+00:00',
      declined_since: null,
      pledge_cap_cents: null,
      patron_pays_fees: false,
      total_historical_amount_cents: 300,
      is_paused: false,
      has_shipping_address: false
    },
    relationships: {
      patron: {data: {id: null, type: 'user'}}, // null-reference
      reward: {data: {id: null, type: 'reward'}}, // null-reference
      creator: {data: {id: null, type: 'user'}}, // null-reference
      address: {data: {id: null, type: 'address'}} // null-reference
    }
  };
  const expectedResult: Pledge = new Pledge(null, '2745627');
  expectedResult.amount = 100;
  expectedResult.currency = 'EUR';
  expectedResult.createdAt = new Date('2016-07-25T20:59:52+00:00');
  expectedResult.declinedSince = null;
  expectedResult.pledgeCap = null;
  expectedResult.patronPaysFees = false;
  expectedResult.totalHistoricalAmount = 300;
  expectedResult.isPaused = false;
  expectedResult.hasShippingAddress = false;
  expectedResult.patron = undefined;
  expectedResult.reward = undefined;
  expectedResult.creator = undefined;
  expectedResult.address = undefined;

  const dataStore = new DataStore(null);
  const pledge = new Pledge(null, '2745627');
  pledge.parse(input, dataStore);
  expect(pledge).toEqual<Pledge>(expectedResult);
});