import { DataStore } from '../src/dataStore';
import { User, Campaign, Pledge, Reward, Goal } from '../src/index';

test('get user', () => {
  const theUser = new User();
  theUser.id = '2';

  const dataStore = new DataStore();
  dataStore.users = [new User(), theUser, new User()];
  
  expect(dataStore.getUser({data: {id: '2'}})).toBe(theUser);
});

test('get campaign', () => {
  const theCampaign = new Campaign();
  theCampaign.id = '42';

  const dataStore = new DataStore();
  dataStore.campaigns = [new Campaign(), theCampaign, new Campaign()];

  expect(dataStore.getCampaign({data: {id: '42'}}))
});

test('get pledge', () => {
  const thePledge = new Pledge();
  thePledge.id = '1337';

  const dataStore = new DataStore();
  dataStore.pledges = [new Pledge(), thePledge, new Pledge()];

  expect(dataStore.getPledge({data: {id: '1337'}})).toBe(thePledge);
});

test('get reward', () => {
  const theReward = new Reward();
  theReward.id = '2020';

  const dataStore = new DataStore();
  dataStore.rewards = [new Reward(), theReward, new Reward()];

  expect(dataStore.getReward({data: {id: '2020'}})).toBe(theReward);
});

test('get goal', () => {
  const theGoal = new Goal();
  theGoal.id = '100';

  const dataStore = new DataStore();
  dataStore.goals = [new Goal(), theGoal, new Goal()];

  expect(dataStore.getGoal({data: {id: '100'}})).toBe(theGoal);
});
