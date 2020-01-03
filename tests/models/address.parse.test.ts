import { Address } from '../../src/models/address';

test('parse address', () => {
  const input = {
    attributes: {
      addressee: 'Patreon, Inc.',
      city: 'San Francisco',
      country: 'US',
      created_at: '2013-05-01T12:00:00.000+00:00',
      line_1: '600 Townsend Street',
      line_2: 'Suite 500',
      phone_number: '+415 000000000',
      postal_code: '94103',
      state: 'California',
      updated_at: '2013-05-01T12:00:00.000+00:00'
    },
    id: '0000000',
    type: 'address'
  };

  const expectedResult = new Address(null, '0000000');
  expectedResult.addressee = 'Patreon, Inc.';
  expectedResult.line1 = '600 Townsend Street';
  expectedResult.line2 = 'Suite 500';
  expectedResult.postalCode = '94103';
  expectedResult.city = 'San Francisco';
  expectedResult.state = 'California';
  expectedResult.country = 'US';
  expectedResult.phoneNumber = '+415 000000000';
  expectedResult.createdAt = new Date('2013-05-01T12:00:00.000+00:00');

  const address = new Address(null, '0000000');
  address.parse(input, null);
  expect(address).toEqual<Address>(expectedResult);
});
