import { add_Beer } from '../../actions/';

test('should add beer action object', () => {
  const beerData = {
    "Brewery Name": "Duck Rabbit",
    "Beer Name": "Rapid Duck",
    "Beer Style": "Imperial Stout",
    "ABV": "10",
    "IBU": "n/a",
  }
  const action = add_Beer(beerData);
  expect(action).toEqual({
    type: 'ADD_BEER',
    beer: {
      ...beerData
    }
  })
})