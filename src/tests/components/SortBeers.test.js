import React from 'react';
import { shallow } from 'enzyme';
import { SortBeers } from '../../components/SortBeers';

const filters = {
  text: '',
  sortBy: '',
};

const fakeFilters = {
  text: 'duck',
  sortBy: 'beer_name',
};

let setTextFilter, sortByBeerName, wrapper

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByBeerName = jest.fn();
  wrapper = shallow(
    <SortBeers
      filters={filters}
      setTextFilter={setTextFilter}
      sortByBeerName={sortByBeerName}
    />
  );
});

test('should render SortBeers correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render with fake props', () => {
  wrapper.setProps({
    filters: fakeFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const value = 'duck';
  wrapper.find('input').simulate('change', {
    target: { value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by "beer_name"', () => {
  const value = 'beer_name';
  wrapper.setProps({
    filters: fakeFilters
  });
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByBeerName).toHaveBeenCalled();
});