import React from 'react';
import { shallow } from 'enzyme';
import { BeerList } from '../../components/BeerList';
import beerData from '../../../public/json/beer_list.json'

test('should BeerList render with data', () => {
  const wrapper = shallow(<BeerList beers={beerData.map((beer, i) => {
      return { ...beer, _id: i }
    })}
  />);
  expect(wrapper).toMatchSnapshot();
})

test('should BeerList be empty', () => {
  const wrapper = shallow(<BeerList beers={[]}/>);
  expect(wrapper).toMatchSnapshot();
})
