import { Pledge } from '../../src/models/pledge';

test('parse pledge', () => {
  // sample input with structure from https://docs.patreon.com/#pledge and data
  // from https://docs.patreon.com/#paging-through-a-list-of-pledges
   const input = {
    type: 'pledge',
    id: '2745627',
    attributes: {
      amount_cents: 100,
      created_at: '2016-07-25T20:59:52+00:00',
      declined_since: null,
      pledge_cap_cents: null,
      patron_pays_fees: false,
      total_historical_amount_cents: 300,
      is_paused: false,
      has_shipping_address: false
    },
    relationships: {
      patron: null,
      reward: null,
      creator: null,
      address: null
    }
  };
   const expectedResult: Pledge = new Pledge(
     '2745627',
     100,
     new Date('2016-07-25T20:59:52+00:00'),
     null,
     null,
     false,
     300,
     false,
     false,
     null,
     null,
     null,
     null
   );
   expect(Pledge.parse(input)).toEqual<Pledge>(expectedResult);
});