import { Reward } from '../../src/models/reward';

test('parse reward', () => {
  const input = {
    attributes: {
      amount: 500,
      amount_cents: 500,
      created_at: '2019-09-23T20:21:56.966+00:00',
      currency: 'USD',
      description: 'You\'ll receive superpowers!',
      discord_role_ids: null,
      edited_at: '2019-09-23T21:16:01.134+00:00',
      image_url: null,
      patron_count: 3,
      post_count: 0,
      published: true,
      published_at: '2019-09-23T21:16:01.123+00:00',
      remaining: null,
      requires_shipping: false,
      title: 'Superpatron',
      unpublished_at: null,
      url: '/join/mycampaign/checkout?rid=4017190',
      user_limit: null,
      welcome_message: null,
      welcome_message_unsafe: null,
      welcome_video_embed: null,
      welcome_video_url: null
    },
    id: '4017190',
    relationships: {
      campaign: {
        data: {
          id: '2033034',
          type: 'campaign'
        },
        links: {
          related: 'https://www.patreon.com/api/campaigns/2033034'
        }
      }
    },
    type: 'reward'
  };
  const expectedResult = new Reward();
  Object.assign(expectedResult, {
    api: null,
    id: '4017190',
    amount: 500,
    userLimit: null,
    remaining: null,
    description: 'You\'ll receive superpowers!',
    requiresShipping: false,
    createdAt: new Date('2019-09-23T20:21:56.966+00:00'),
    url: '/join/mycampaign/checkout?rid=4017190',
    patronCount: 3,
    postCount: 0,
    discordRoleIds: null,
    title: 'Superpatron',
    imageUrl: null,
    editedAt: new Date('2019-09-23T21:16:01.134+00:00'),
    published: true,
    publishedAt: new Date('2019-09-23T21:16:01.123+00:00'),
    unpublishedAt: null
  });
  expect(Reward.parse(input, null)).toEqual(expectedResult);
})