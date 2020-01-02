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
  const expectedResult: Campaign = new Campaign();
  expectedResult.api = null;
  expectedResult.id = '0000000';
  expectedResult.summary = 'this is a summary';
  expectedResult.creationName = 'Documentation';
  expectedResult.payPerName = null;
  expectedResult.oneLiner = null;
  expectedResult.mainVideoEmbed = null;
  expectedResult.mainVideoUrl = null;
  expectedResult.imageUrl = null;
  expectedResult.smallImageUrl = null;
  expectedResult.thanksVideoUrl = null;
  expectedResult.thanksEmbed = null;
  expectedResult.thanksMessage = null;
  expectedResult.isMonthly = false;
  expectedResult.isNSFW = false;
  expectedResult.createdAt = new Date('2017-10-20T21:39:01+00:00');
  expectedResult.publishedAt = new Date('2017-10-20T21:39:01+00:00');
  expectedResult.pledgeUrl = '/bePatron?c=0000000';
  expectedResult.pledgeSum = 0;
  expectedResult.patronCount = 0;
  expectedResult.creationCount = 1;
  expectedResult.outstandingPaymentAmountCents = 0;
  expectedResult.creator = null;
  expectedResult.rewards = [];
  expectedResult.goals = [];
  expect(Campaign.parse(input, null)).toEqual<Campaign>(expectedResult);
});