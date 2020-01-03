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
  const expectedResult = new Reward(null, '4017190');
  expectedResult.amount = 500;
  expectedResult.userLimit = null;
  expectedResult.remaining = null;
  expectedResult.description = 'You\'ll receive superpowers!';
  expectedResult.requiresShipping = false;
  expectedResult.createdAt = new Date('2019-09-23T20:21:56.966+00:00');
  expectedResult.url = '/join/mycampaign/checkout?rid=4017190';
  expectedResult.patronCount = 3;
  expectedResult.postCount = 0;
  expectedResult.discordRoleIds = null;
  expectedResult.title = 'Superpatron';
  expectedResult.imageUrl = null;
  expectedResult.editedAt = new Date('2019-09-23T21:16:01.134+00:00');
  expectedResult.published = true;
  expectedResult.publishedAt = new Date('2019-09-23T21:16:01.123+00:00');
  expectedResult.unpublishedAt = null;

  const reward = new Reward(null, '4017190');
  reward.parse(input, null);
  expect(reward).toEqual(expectedResult);
})