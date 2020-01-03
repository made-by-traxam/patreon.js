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
    type: 'goal',
    relationships: {}
  };
  const expectedResult = new Goal(null, '1554387');
  expectedResult.title = '💯';
  expectedResult.description = 'We will work harder.';
  expectedResult.amount = 10000;
  expectedResult.currency = 'USD';
  expectedResult.progress = 58;
  expectedResult.createdAt = new Date('2019-09-24T11:31:04.000+00:00');
  expectedResult.reachedAt = new Date('2019-10-03T22:25:14.000+00:00');
  
  const goal = new Goal(null, '1554387');
  goal.parse(input, null);
  expect(goal).toEqual(expectedResult);
});
