import { Goal } from '../../src/models/goal';

test('parse goal', () => {
  const input = {
    attributes: {
      amount_cents: 10000,
      completed_percentage: 58,
      created_at: '2019-09-24T11:31:04.000+00:00',
      currency: 'USD',
      description: 'We will work harder.',
      reached_at: '2019-10-03T22:25:14.000+00:00',
      title: '💯'
    },
    id: '1554387',
    type: 'goal'
  };
  const expectedResult = new Goal();
  Object.assign(expectedResult, {
    api: null,
    type: 'goal',
    id: '1554387',
    title: '💯',
    description: 'We will work harder.',
    amount: 10000,
    currency: 'USD',
    progress: 58,
    createdAt: new Date('2019-09-24T11:31:04.000+00:00'),
    reachedAt: new Date('2019-10-03T22:25:14.000+00:00')
  });
  expect(Goal.parse(input, null)).toEqual(expectedResult);
});
