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
  var expectedResult: User = {
    type: 'user',
    id: '0000000',
    email: 'corgi@example.com',
    about: 'Corgi is a developer',
    firstName: 'Corgi',
    lastName: 'The Dev',
    vanity: 'corgithedev',
    imageUrl: 'https://c8.patreon.com/2/400/0000000',
    thumbUrl: 'https://c8.patreon.com/2/100/0000000',
    creationTime: new Date('2017-10-20T21:36:23+00:00'),
    url: 'https://www.patreon.com/corgithedev',
    likeCount: 10,
    commentCount: 42,
    socialConnections: {
      facebook: null,
      facebookId: null,
      twitter: 'corgiHandle',
      youtube: 'youtube data',
    }
  }
  expect(User.parse(input)).toEqual<User>(expectedResult);
})
