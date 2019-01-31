import React from 'react';
import { shallow } from 'enzyme';
import { AddBeer } from '../../components/AddBeer';
import axios from 'axios';
 
jest.mock('../_mocks_/axios');

test('should AddBeer render correctly', () => {
  const wrapper = shallow(<AddBeer />); 
  expect(wrapper).toMatchSnapshot();
})

test('should set "beer_name" on input change', () => {
  const value = 'Rapid Duck';
  const wrapper = shallow(<AddBeer />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('beer_name')).toBe(value);
});

test('should set "beer_name" on input change', () => {
  const value = 'Rapid Duck';
  const wrapper = shallow(<AddBeer />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('beer_name')).toBe(value);
});

test('a post request should be made', () => {
  const beer = {
    "Brewery Name": "Duck Rabbit",
    "Beer Name": "Rapid Duck",
    "Beer Style": "Imperial Stout",
    "ABV": "10",
    "IBU": "n/a"
  }
  const url = '/api/beerlist'
  const wrapper = shallow(<AddBeer/>);
  const postSpy = jest.spyOn(axios, 'post');
  let i = 0
  for(let key in beer) {
    wrapper.find('input').at(i).simulate('change', {
      target: { value: beer[key] }
    });
    i++
  }

  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  }); 
 
  expect(postSpy).toBeCalledWith(url, beer);
});