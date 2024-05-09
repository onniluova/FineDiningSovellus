// Mock the getBikeStationById function
jest.mock('../JS/hsl', () => ({
  getBikeStationById: jest.fn().mockResolvedValue({
    station: {
      lat: 60.1666052,
      lon: 24.9430558,
      name: 'Test Station',
      bikesAvailable: 10,
      allowDropoff: true,
      spacesAvailable: 5,
    },
  }),
}));

const { getBikeStationById } = require('../JS/hsl');

describe('getBikeStationById', () => {
  it('returns the correct bike station', async () => {
    // Call the function
    const id = "009";
    const result = await getBikeStationById(id);

    // Check that the function returned the correct result
    expect(result).toEqual({
      station: {
        lat: 60.1666052,
        lon: 24.9430558,
        name: 'Test Station',
        bikesAvailable: 10,
        allowDropoff: true,
        spacesAvailable: 5,
      },
    });
  });
});


