import { DataStore } from '../src/dataStore';
import { User, Campaign, Pledge, Reward, Goal, Address } from '../src/index';

test('get user', () => {
  const theUser = new User(null, '2');

  const dataStore = new DataStore(null);
  dataStore.users = [new User(null, null), theUser, new User(null, null)];
  
  expect(dataStore.getUser({data: {id: '2'}})).toBe(theUser);
});

test('get campaign', () => {
  const theCampaign = new Campaign(null, '42');

  const dataStore = new DataStore(null);
  dataStore.campaigns = [
    new Campaign(null, null),
    theCampaign,
    new Campaign(null, null)
  ];

  expect(dataStore.getCampaign({data: {id: '42'}})).toBe(theCampaign);
});

test('get pledge', () => {
  const thePledge = new Pledge(null, '1337');

  const dataStore = new DataStore(null);
  dataStore.pledges = [
    new Pledge(null, null),
    thePledge,
    new Pledge(null, null)
  ];

  expect(dataStore.getPledge({data: {id: '1337'}})).toBe(thePledge);
});

test('get reward', () => {
  const theReward = new Reward(null, '2020');

  const dataStore = new DataStore(null);
  dataStore.rewards = [
    new Reward(null, null),
    theReward,
    new Reward(null, null)
  ];

  expect(dataStore.getReward({data: {id: '2020'}})).toBe(theReward);
});

test('get goal', () => {
  const theGoal = new Goal(null, '100');

  const dataStore = new DataStore(null);
  dataStore.goals = [
    new Goal(null, null),
    theGoal,
    new Goal(null, null)
  ];

  expect(dataStore.getGoal({data: {id: '100'}})).toBe(theGoal);
});

test('get address', () => {
  const theAddress = new Address(null, '0');

  const dataStore = new DataStore(null);
  dataStore.addresses = [
    new Address(null, null),
    theAddress,
    new Address(null, null)
  ];
  expect(dataStore.getAddress({data: {id: '0'}})).toBe(theAddress);
})
