import sortBeers from '../../selectors/sortBeers';

const beers = [
  {
    "Brewery Name": "Arbor Brewing company Beers",
    "Beer Name": "Treebeard IPA",
    "Beer Style": "Pale Ale",
    "ABV": "6.2%",
    "IBU": "45/OG"
  },
  {
    "Brewery Name": "Arbor Brewing company Beers",
    "Beer Name": "Violin Monster",
    "Beer Style": "Specialty",
    "ABV": "9.5%",
    "IBU": "35/OG 1.090"
  },
  {
    "Brewery Name": "LITTLE Critters Brewing Company",
    "Beer Name": "Blonde Bear",
    "Beer Style": "NA",
    "ABV": "4.2%",
    "IBU": "NA"
  },
]

test('should sort by Beer Name', () => {
  const filters = {
    sortBy: 'beer_name',
    text: ''
  }
  const result = sortBeers(beers, filters)
  expect(result).toEqual([ beers[2], beers[0], beers[1] ])
});