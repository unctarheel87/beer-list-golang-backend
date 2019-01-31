import React from 'react';
import 
  { sortByBreweryName, 
    sortByBeerName, 
    sortByABV, 
    sortByDraft,
    setTextFilter,
   } from '../actions';
import { connect } from 'react-redux';

const handleChange = props => e => {
  if (e.target.value === "brewery_name") {
    props.sortByBreweryName();
  } else if (e.target.value === "beer_name") {
    props.sortByBeerName();
  } else if (e.target.value === "abv") {
    props.sortByABV();
  } else if (e.target.value === "draft") {
    props.sortByDraft();
  }
};

const onTextChange = props => e => {
  props.setTextFilter(e.target.value)
};

export const SortBeers = props => (
  <form className="uk-width-1-4 uk-margin uk-flex">
    <input
      type="text"
      className="uk-input"
      value={props.filters.text}
      onChange={ onTextChange(props) }
      placeholder="Search"
    />
    <select className="uk-select" value={props.filters.sortBy} onChange={ handleChange(props) }>
      <option value="">filter</option>
      <option value="brewery_name">Brewery Name</option>
      <option value="beer_name">Beer Name</option>
      <option value="abv">ABV</option>
      <option value="draft">Current Draft</option>
    </select>
  </form>
)   

const mapStateToProps = state => {
  return {
    filters: state.filters
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sortByBreweryName: () => dispatch(sortByBreweryName()),
    sortByBeerName: () => dispatch(sortByBeerName()),
    sortByABV: () => dispatch(sortByABV()),
    sortByDraft: () => dispatch(sortByDraft()),
    setTextFilter: (text) => dispatch(setTextFilter(text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortBeers);