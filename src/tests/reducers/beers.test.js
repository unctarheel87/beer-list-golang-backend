import beersReducer from '../../reducers/beers';
import beerData from '../../../public/json/beer_list.json';

test('should add a beer', () => {
  const beer = {
    "Brewery Name": "Duck Rabbit",
    "Beer Name": "Rapid Duck",
    "Beer Style": "Imperial Stout",
    "ABV": "10",
    "IBU": "n/a",
  }
  const action = {
    type: 'ADD_BEER',
    beer
  }

  const state = beersReducer(beerData, action);
  expect(state).toEqual([...beerData, beer])
});
