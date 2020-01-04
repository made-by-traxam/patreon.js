import { User } from '../../src/models/user';

test('parse user', () => {
  // sample input with structure from https://docs.patreon.com/#user and data
  // from https://docs.patreon.com/#fetching-a-patron-39-s-profile-info
  var input = {
    type: 'user',
    id: '0000000',
    attributes: {
      first_name: 'Corgi',
      last_name: 'The Dev',
      full_name: 'Corgi The Dev',
      vanity: 'corgithedev',
      email: 'corgi@example.com',
      about: 'Corgi is a developer',
      facebook_id: null,
      image_url: 'https://c8.patreon.com/2/400/0000000',
      thumb_url: 'https://c8.patreon.com/2/100/0000000',
      youtube: 'youtube data',
      twitter: 'corgiHandle',
      facebook: null,
      created: '2017-10-20T21:36:23+00:00',
      url: 'https://www.patreon.com/corgithedev',
      like_count: 10,
      comment_count: 42
    },
    relationships: {
      campaign: null
    }
  };
  const expectedResult = new User(null, '0000000');
  expectedResult.email = 'corgi@example.com';
  expectedResult.about = 'Corgi is a developer';
  expectedResult.firstName = 'Corgi';
  expectedResult.lastName = 'The Dev';
  expectedResult.vanity = 'corgithedev';
  expectedResult.imageUrl = 'https://c8.patreon.com/2/400/0000000';
  expectedResult.thumbUrl = 'https://c8.patreon.com/2/100/0000000';
  expectedResult.creationTime = new Date('2017-10-20T21:36:23+00:00');
  expectedResult.url = 'https://www.patreon.com/corgithedev';
  expectedResult.likeCount = 10;
  expectedResult.commentCount = 42;
  expectedResult.socialConnections = {
    facebook: null,
    facebookId: null,
    twitter: 'corgiHandle',
    youtube: 'youtube data',
  };

  const user = new User(null, '0000000');
  user.parse(input, null);
  
  expect(user).toEqual<User>(expectedResult);
})
