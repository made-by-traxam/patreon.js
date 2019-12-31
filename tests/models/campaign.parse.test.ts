import { Campaign } from '../../src/models/campaign';

test('parse campaign', () => {
  // sample input with structure from https://docs.patreon.com/#campaign and
  // data from
  // https://docs.patreon.com/#fetch-a-creator-profile-and-campaign-info
  const input = {
    type: 'campaign',
    id: '0000000',
    attributes: {
      summary: 'this is a summary',
      creation_name: 'Documentation',
      pay_per_name: null,
      one_liner: null,
      main_video_embed: null,
      main_video_url: null,
      image_small_url: null,
      image_url: null,
      thanks_video_url: null,
      thanks_embed: null,
      thanks_msg: null,
      is_monthly: false,
      is_nsfw: false,
      created_at: '2017-10-20T21:39:01+00:00',
      published_at: '2017-10-20T21:39:01+00:00',
      pledge_url: '/bePatron?c=0000000',
      pledge_sum: 0,
      patron_count: 0,
      creation_count: 1,
      outstanding_payment_amount_cents: 0
    },
    relationships: {
      creator: null,
      rewards: [],
      goals: [],
      pledges: []
    }
  };
  const expectedResult: Campaign = new Campaign(null,
    '0000000',
    'this is a summary',
    'Documentation',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    false,
    false,
    new Date('2017-10-20T21:39:01+00:00'),
    new Date('2017-10-20T21:39:01+00:00'),
    '/bePatron?c=0000000',
    0,
    0,
    1,
    0,
    null,
    [],
    [],
    [],
  );
  expect(Campaign.parse(input, null)).toEqual<Campaign>(expectedResult);
});